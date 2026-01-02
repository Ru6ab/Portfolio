import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

/* ========================= POST ========================= */
export async function POST(req) {
  try {
    const body = await req.json();
    const { experience } = body;

    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(experience) || experience.length === 0) {
      return NextResponse.json(
        { message: "Add experience sections" },
        { status: 400 }
      );
    }

    // ✅ validate according to schema
    for (const exp of experience) {
      if (
        !exp.designation ||
        !exp.organization ||
        !exp.duration ||
        !Array.isArray(exp.topics)
      ) {
        return NextResponse.json(
          { message: "All experience fields are required" },
          { status: 400 }
        );
      }
    }

    const cleanedExperience = experience.map((exp) => ({
      designation: exp.designation.trim(),
      organization: exp.organization.trim(),
      duration: exp.duration.trim(),
      topics: exp.topics.map((t) => t.trim()).filter(Boolean),
    }));

    let portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        experience: cleanedExperience,
      });
    } else {
      portfolio.experience = cleanedExperience;
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "Experience section saved", data: portfolio.experience },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}

/* ========================= GET ========================= */
export async function GET(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    return NextResponse.json(
      {
        message: "Experience section fetched",
        data: portfolio?.experience || [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error in catch", error: error.message },
      { status: 500 }
    );
  }
}

/* ========================= PUT ========================= */
export async function PUT(req) {
  try {
    const body = await req.json();
    const { experience } = body;

    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(experience)) {
      return NextResponse.json(
        { message: "Experience must be an array" },
        { status: 400 }
      );
    }

    // ✅ validate fields
    for (const e of experience) {
      if (
        !e.designation ||
        !e.organization ||
        !e.duration ||
        !Array.isArray(e.topics)
      ) {
        return NextResponse.json(
          { message: "Enter all fields for experience section" },
          { status: 400 }
        );
      }
    }

    // ✅ clean data
    const cleanedExperience = experience
      .map((e) => ({
        designation: e.designation.trim(),
        organization: e.organization.trim(),
        duration: e.duration.trim(),
        topics: e.topics.map((t) => t.trim()).filter(Boolean),
      }))
      .filter(
        (e) => e.designation || e.organization || e.duration || e.topics.length
      );

    if (cleanedExperience.length === 0) {
      return NextResponse.json(
        { message: "Add at least one valid experience" },
        { status: 400 }
      );
    }

    const portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }

    portfolio.experience = cleanedExperience;
    await portfolio.save();

    return NextResponse.json(
      {
        message: "Experiences updated successfully",
        data: portfolio.experience,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
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
    { $unset: { experience: [] }}
  );

  return NextResponse.json({ message: "experience deleted" });
}
