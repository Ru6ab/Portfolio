import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Token validation
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Must be an array
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { message: "add publication section" },
        { status: 400 }
      );
    }

    // 3. Validate each award entry (simple null/empty check)
    for (const publication of body) {
      if (
        !publication.title ||
        !publication.status ||
        !publication.description
      ) {
        return NextResponse.json(
          { message: "all publication fields required" },
          { status: 400 }
        );
      }
    }

    // 4. Find existing portfolio
    let portfolio = await UserPort.findOne({ userId: user._id });

    // 5. Create if not existing
    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        publication: body,
      });
    } else {
      portfolio.publication = body;
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "publication section saved", data: portfolio },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "catch error occured", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // 1. Token validation
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    let portfolio = await UserPort.findOne({ userId: user._id });
    const getPublication = portfolio.publication;
    return NextResponse.json(
      { message: "publication section got", data: getPublication },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "catch error occured", error: error.message },
      { status: 500 }
    );
  }
}
