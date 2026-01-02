import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

// ==========================
// POST → CREATE LANGUAGES
// ==========================
export async function POST(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { language } = body;

    if (!Array.isArray(language) || language.length === 0) {
      return NextResponse.json(
        { message: "No languages provided" },
        { status: 400 }
      );
    }

    for (const lang of language) {
      if (!lang.name || typeof lang.percentage !== "number") {
        return NextResponse.json(
          { message: "Each language must have name and percentage" },
          { status: 400 }
        );
      }
    }

    const portfolio = await UserPort.create({
      userId: user._id,
      language,
    });

    return NextResponse.json(
      { message: "Languages created", data: portfolio.language },
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
// PUT → UPDATE LANGUAGES
// ==========================
export async function PUT(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { language } = body;

    if (!Array.isArray(language) || language.length === 0) {
      return NextResponse.json(
        { message: "No languages provided" },
        { status: 400 }
      );
    }

    for (const lang of language) {
      if (!lang.name || typeof lang.percentage !== "number") {
        return NextResponse.json(
          { message: "Each language must have name and percentage" },
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

    portfolio.language = language;
    await portfolio.save();

    return NextResponse.json(
      { message: "Languages updated", data: portfolio.language },
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
// GET → FETCH LANGUAGES
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
        message: "Languages fetched",
        data: portfolio?.language || [],
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
    { $unset: { language: [] }}
  );

  return NextResponse.json({ message: "language deleted" });
}
