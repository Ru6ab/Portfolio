

// import { NextResponse } from "next/server";
// import { verifyToken } from "@/app/lib/verifyToken";
// import UserPort from "@/app/models/UserPort";
// import path from "path";
// import fs from "fs";

// const uploadsDir = path.join(process.cwd(), "public/uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }


// export async function POST(req) {
//   try {
//    const formData = await req.formData();
 
//      const name = formData.get("name");
//         const cv= formData.get("cv");
//         const description  = formData.get("description")
//           const email  = formData.get("email")
//        const birthday =  formData.get("birthday")
 
//      console.log({ cv, description,email ,birthday});
     
//      // Validate input
//      if (!cv || !description || !email || !birthday  ) {
//        return NextResponse.json(
//          { message: "add required sections" },
//          { status: 400 }
//        );
//      }
 
//      // Verify user
//      const user = await verifyToken(req);
//      console.log('verifyToken result:', user);
//      if (!user || !user._id) {
//        return NextResponse.json(
//          { message: "Unauthorized" },
//          { status: 401 }
//        );
//      }

//    let cvPath = null;
//       if (cv && cv.size > 0) {
//         const bytes = await cv.arrayBuffer();
//         const buffer = Buffer.from(bytes);
  
//         // Generate unique filename
//         const timestamp = Date.now();
//         const fileExtension = path.extname(cv.name);
//         const filename = `portfolio-${user._id}-${timestamp}${fileExtension}`;
//         cvPath = `/uploads/${filename}`;
  
//         // Save to public/uploads (accessible via http://localhost:3000/uploads/filename.jpg)
//         const filepath = path.join(uploadsDir, filename);
//         fs.writeFileSync(filepath, buffer);
//         console.log('Image saved to:', cvPath);
//       }

//     // Try to find existing portfolio
//     let portfolio = await UserPort.findOne({ userId: user._id });

//     if (!portfolio) {
//       // First time, create document
//       portfolio = await UserPort.create({
//         userId: user._id,
//         about: { description, birthday, email, cv:cvPath },
//       });
//     } else {
//       // Already exists, just update about
//       portfolio.about = { description, birthday, email};
//       if (cvPath) portfolio.profile.cv = cvPath;
//       await portfolio.save();
//     }

//     return NextResponse.json({ message: "About section saved", data: portfolio }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "catch error occured", error: error.message }, { status: 500 });
//   }
// }

// export async function GET(req){
//   try{
//          // Verify user
//      const user = await verifyToken(req);
//      console.log('verifyToken result:', user);
//      if (!user || !user._id) {
//        return NextResponse.json(
//          { message: "Unauthorized" },
//          { status: 401 }
//        );
//      }
//      let portfolio = await UserPort.findOne({ userId: user._id });
//      const getAbout= portfolio.about
                   
//                    return NextResponse.json({message:"about section got", data:getAbout}, { status: 200 })
//                }catch(error){
//                      return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
//                }
  
// }

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

    // Extract fields from frontend
    const description = formData.get("description");
    const email = formData.get("email");
    const birthday = formData.get("birthday"); // frontend sends birthday
    const cv = formData.get("cv");

    if (!description || !email || !birthday) {
      return NextResponse.json(
        { message: "Add required sections" },
        { status: 400 }
      );
    }

    // Verify user
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Handle CV upload
    let cvPath = null;
    if (cv && cv.size > 0) {
      const buffer = Buffer.from(await cv.arrayBuffer());
      const timestamp = Date.now();
      const ext = path.extname(cv.name);
      const filename = `portfolio-${user._id}-${timestamp}${ext}`;
      cvPath = `/uploads/${filename}`;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, buffer);
      console.log("CV saved to:", cvPath);
    }

    // Find existing portfolio
    let portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio) {
      // Create new portfolio
      portfolio = await UserPort.create({
        userId: user._id,
        about: {
          description,
          email,
          dob: birthday, // map frontend birthday -> db dob
          cv: cvPath || null,
        },
      });
    } else {
      // Merge existing about data
      portfolio.about = {
        ...portfolio.about,
        description,
        email,
        dob: birthday, // map correctly
      };
      if (cvPath) portfolio.about.cv = cvPath; // update CV if uploaded
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "About section saved", data: portfolio.about },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Error occurred", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // Verify user
    const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio || !portfolio.about) {
      return NextResponse.json(
        { message: "Section not created yet", data: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "About section retrieved", data: portfolio.about },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Error occurred", error: error.message },
      { status: 500 }
    );
  }
}
