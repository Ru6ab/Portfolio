

import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const badgesRaw = formData.get("badges");
    const imgFile = formData.get("img");

    console.log({ name, badgesRaw, imgFile });
    const badges = badgesRaw ? JSON.parse(badgesRaw) : [];

    // Validate input
    if (!Array.isArray(badges) || badges.length === 0 || !name) {
      return NextResponse.json(
        { message: "add required sections" },
        { status: 400 }
      );
    }

    // Verify user
    const user = await verifyToken(req);
    console.log('verifyToken result:', user);
    if (!user || !user._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // HANDLE IMAGE UPLOAD
    let imgPath = null;
    if (imgFile && imgFile.size > 0) {
      const bytes = await imgFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = path.extname(imgFile.name);
      const filename = `portfolio-${user._id}-${timestamp}${fileExtension}`;
      imgPath = `/uploads/${filename}`;

      // Save to public/uploads (accessible via http://localhost:3000/uploads/filename.jpg)
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, buffer);
      console.log('Image saved to:', imgPath);
    }

    let portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio) {
      // CREATE portfolio first time
      portfolio = await UserPort.create({
        userId: user._id,
        main: {
          img: imgPath,  // ✅ Now saves actual image path!
          name,
          badges,
        },
      });
    } else {
      // UPDATE existing portfolio
      portfolio.main.badges = badges;
      portfolio.main.name = name;
      if (imgPath) portfolio.main.img = imgPath;  // ✅ Update image if new file uploaded
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "Main section saved with image!", data: portfolio },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req){
  try{
   const user = await verifyToken(req);
       if (!user || !user._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
      let portfolio = await UserPort.findOne({ userId: user._id });
         const getMain = portfolio.main
              
              return NextResponse.json({message:"main section got", data:getMain}, { status: 200 })
          }catch(error){
                return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
          }
      
        }
