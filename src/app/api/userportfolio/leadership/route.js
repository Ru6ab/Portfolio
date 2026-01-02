import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

// ==========================
// POST → CREATE LEADERSHIP
// ==========================
export async function POST(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { leadership } = body;

    if (!Array.isArray(leadership) || leadership.length === 0) {
      return NextResponse.json(
        { message: "Add at least one leadership entry" },
        { status: 400 }
      );
    }

    for (const l of leadership) {
      if (!l.degree || !l.year || !l.school) {
        return NextResponse.json(
          { message: "All leadership fields are required" },
          { status: 400 }
        );
      }
    }

    const portfolio = await UserPort.create({
      userId: user._id,
      leadership,
    });

    return NextResponse.json(
      { message: "Leadership created", data: portfolio.leadership },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}

// ==========================
// PUT → UPDATE LEADERSHIP
// ==========================
export async function PUT(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { leadership } = body;

    if (!Array.isArray(leadership) || leadership.length === 0) {
      return NextResponse.json(
        { message: "Add at least one leadership entry" },
        { status: 400 }
      );
    }

    for (const l of leadership) {
      if (!l.degree || !l.year || !l.school) {
        return NextResponse.json(
          { message: "All leadership fields are required" },
          { status: 400 }
        );
      }
    }

    const portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }

    portfolio.leadership = leadership;
    await portfolio.save();

    return NextResponse.json(
      { message: "Leadership updated", data: portfolio.leadership },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}

// ==========================
// GET → FETCH LEADERSHIP
// ==========================
export async function GET(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    return NextResponse.json(
      {
        message: "Leadership fetched",
        data: portfolio?.leadership || [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const user = await verifyToken(req);
  if (!user?._id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await UserPort.updateOne(
    { userId: user._id },
    { $unset: { leadership: [] }}
  );

  return NextResponse.json({ message: "leadership deleted" });
}
