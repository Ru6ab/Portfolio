import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Get form fields
    const name = formData.get("name");
    const gitHubUrl = formData.get("gitHubUrl") || "";
    const facebookUrl = formData.get("facebookUrl") || "";
    const twitterUrl = formData.get("twitterUrl") || "";
    const linkedInUrl = formData.get("linkedInUrl") || "";

    const imgFile = formData.get("img");
    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    // Verify user
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Handle image upload (unchanged)
    let imgPath = null;
    if (imgFile && imgFile.size > 0) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const timestamp = Date.now();
      const fileExtension = path.extname(imgFile.name);
      const filename = `portfolio-${user._id}-${timestamp}${fileExtension}`;
      imgPath = `/uploads/${filename}`;
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    }

    // Find or create portfolio
    let portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        profile: {
          name,
          img: imgPath,
          gitHubUrl,
          facebookUrl,
          twitterUrl,
          linkedInUrl,
        },
      });
    } else {
      // Update existing portfolio
      portfolio.profile.name = name;
      console.log("name saved",portfolio.profile.name)
      if (imgPath) portfolio.profile.img = imgPath; // only update if new file
      portfolio.profile.gitHubUrl = gitHubUrl;
      portfolio.profile.facebookUrl = facebookUrl;
      portfolio.profile.twitterUrl = twitterUrl;
      portfolio.profile.linkedInUrl = linkedInUrl;
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "Profile updated successfully", data: portfolio },
      { status: 201 }
    );

  } catch (error) {
    console.error("PROFILE POST ERROR:", error);
    return NextResponse.json(
      { message: "Server error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let portfolio = await UserPort.findOne({ userId: user._id }).lean();

    if (!portfolio) {
      return NextResponse.json(
        { message: "No profile found", data: null },
        { status: 200 }
      );
    }

    // return profile directly
    return NextResponse.json(
      { message: "Profile fetched", data: portfolio.profile },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const gitHubUrl = formData.get("gitHubUrl") || "";
    const facebookUrl = formData.get("facebookUrl") || "";
    const twitterUrl = formData.get("twitterUrl") || "";
    const linkedInUrl = formData.get("linkedInUrl") || "";
    const imgFile = formData.get("img");

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    // Verify user
    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find portfolio (must exist for update)
    const portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }
console.log(portfolio)
    // Handle image upload (optional)
    let imgPath = null;
    if (imgFile && imgFile.size > 0) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      const timestamp = Date.now();
      const ext = path.extname(imgFile.name);
      const filename = `portfolio-${user._id}-${timestamp}${ext}`;
      imgPath = `/uploads/${filename}`;
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    }

    // Update fields
    portfolio.profile.name = name;
    portfolio.profile.gitHubUrl = gitHubUrl;
    portfolio.profile.facebookUrl = facebookUrl;
    portfolio.profile.twitterUrl = twitterUrl;
    portfolio.profile.linkedInUrl = linkedInUrl;

    if (imgPath) {
      portfolio.profile.img = imgPath; // only if new image
    }

    await portfolio.save();

    return NextResponse.json(
      { message: "Profile updated successfully", data: portfolio },
      { status: 200 }
    );

  } catch (error) {
    console.error("PROFILE PUT ERROR:", error);
    return NextResponse.json(
      { message: "Server error occurred", error: error.message },
      { status: 500 }
    );
  }
}
