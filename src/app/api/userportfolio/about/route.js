// import { NextResponse } from "next/server";
// import { verifyToken } from "@/app/lib/verifyToken";
// import UserPort from "@/app/models/UserPort";
// import path from "path";
// import fs from "fs";

// // Ensure uploads directory exists
// const uploadsDir = path.join(process.cwd(), "public/uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     // Extract fields from frontend
//     const description = formData.get("description");
//     const email = formData.get("email");
//     const birthday = formData.get("birthday"); // frontend sends birthday
//     const cv = formData.get("cv");

//     if (!description || !email || !birthday) {
//       return NextResponse.json(
//         { message: "Add required sections" },
//         { status: 400 }
//       );
//     }

//     // Verify user
//     const user = await verifyToken(req);
//     if (!user || !user._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Handle CV upload
//     let cvPath = null;
//     if (cv && cv.size > 0) {
//       const buffer = Buffer.from(await cv.arrayBuffer());
//       const timestamp = Date.now();
//       const ext = path.extname(cv.name);
//       const filename = `portfolio-${user._id}-${timestamp}${ext}`;
//       cvPath = `/uploads/${filename}`;
//       const filepath = path.join(uploadsDir, filename);
//       fs.writeFileSync(filepath, buffer);
//       console.log("CV saved to:", cvPath);
//     }

//     // Find existing portfolio
//     let portfolio = await UserPort.findOne({ userId: user._id });

//     if (!portfolio) {
//       // Create new portfolio
//       portfolio = await UserPort.create({
//         userId: user._id,
//         about: {
//           description,
//           email,
//           dob: birthday, // map frontend birthday -> db dob
//           cv: cvPath || null,
//         },
//       });
//     } else {
//       // Merge existing about data
//       portfolio.about = {
//         ...portfolio.about,
//         description,
//         email,
//         dob: birthday, // map correctly
//       };
//       if (cvPath) portfolio.about.cv = cvPath; // update CV if uploaded
//       await portfolio.save();
//     }

//     return NextResponse.json(
//       { message: "About section saved", data: portfolio.about },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json(
//       { message: "Error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     // Verify user
//     const user = await verifyToken(req);
//     if (!user || !user._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const portfolio = await UserPort.findOne({ userId: user._id });

//     if (!portfolio || !portfolio.about) {
//       return NextResponse.json(
//         { message: "Section not created yet", data: null },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "About section retrieved", data: portfolio.about },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json(
//       { message: "Error occurred", error: error.message },
//       { status: 500 }
//     );
//   }
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
    const description = formData.get("description")?.trim();
    const email = formData.get("email")?.trim();
    const birthday = formData.get("birthday"); // frontend sends birthday
    const cv = formData.get("cv");

    if (!description || !email || !birthday) {
      return NextResponse.json(
        { message: "Description, email, and birthday are required" },
        { status: 400 }
      );
    }

    // Verify user
    const user = await verifyToken(req);
    if (!user?._id) {
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
          dob: birthday,
          cv: cvPath || null,
        },
      });
    } else {
      // Merge/update existing about section
      portfolio.about = {
        ...portfolio.about,
        description,
        email,
        dob: birthday,
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
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio?.about) {
      return NextResponse.json(
        { message: "About section not created yet", data: null },
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


export async function PUT(req) {
  try {
    const formData = await req.formData();
    const description = formData.get("description")?.trim();
    const email = formData.get("email")?.trim();
    const birthday = formData.get("birthday");
    const cv = formData.get("cv");

    if (!description || !email || !birthday) {
      return NextResponse.json(
        { message: "Description, email, and birthday are required" },
        { status: 400 }
      );
    }

    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found", status: 404 });
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
    }

    // Update only
    portfolio.about = {
      ...portfolio.about,
      description,
      email,
      dob: birthday,
    };
    if (cvPath) portfolio.about.cv = cvPath;

    await portfolio.save();

    return NextResponse.json(
      { message: "About section updated", data: portfolio.about },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Error occurred", error: error.message },
      { status: 500 }
    );
  }
}
