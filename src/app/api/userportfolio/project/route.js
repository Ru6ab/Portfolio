// import { verifyToken } from "@/app/lib/verifyToken";
// import UserPort from "@/app/models/UserPort";
// import { NextResponse } from "next/server";

// // ---------------------
// // POST → Add new project
// // ---------------------
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { title, description, detailedDescription, contributions } = body;

//     const user = await verifyToken(req);
//     if (!user?._id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const cleanedContributions = Array.isArray(contributions)
//       ? contributions.map(c => c.trim()).filter(Boolean)
//       : [];

//     if (!title?.trim() || !description?.trim() || !detailedDescription?.trim() || cleanedContributions.length === 0) {
//       return NextResponse.json({ message: "All project fields are required" }, { status: 400 });
//     }

//     const portfolio = await UserPort.findOne({ userId: user._id });

//     const newProject = {
//       title: title.trim(),
//       description: description.trim(),
//       detailedDescription: detailedDescription.trim(),
//       contributions: cleanedContributions,
//     };

//     if (!portfolio) {
//       await UserPort.create({ userId: user._id, projects: [newProject] });
//     } else {
//       portfolio.project = portfolio.project || [];
//       portfolio.project.push(newProject);
//       await portfolio.save();
//     }

//     return NextResponse.json({ message: "Project saved", data: portfolio || newProject }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: "Catch error occurred", error: error.message }, { status: 500 });
//   }
// }

// // ---------------------
// // GET → Fetch all projects
// // ---------------------
// export async function GET(req) {
//   try {
//     const user = await verifyToken(req);
//     if (!user?._id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const portfolio = await UserPort.findOne({ userId: user._id });
//     const projects = portfolio?.project || [];

//     return NextResponse.json({ message: "Projects fetched", data: projects }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Catch error occurred", error: error.message }, { status: 500 });
//   }
// }

// // ---------------------
// // PUT → Update project array (replace all)
// // ---------------------
// export async function PUT(req) {
//   try {
//     const user = await verifyToken(req);
//     if (!user?._id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const body = await req.json();
//     const { title, description, detailedDescription, contributions } = body;

//     const cleanedContributions = Array.isArray(contributions)
//       ? contributions.map(c => c.trim()).filter(Boolean)
//       : [];

//     if (!title?.trim() || !description?.trim() || !detailedDescription?.trim() || cleanedContributions.length === 0) {
//       return NextResponse.json({ message: "All project fields are required" }, { status: 400 });
//     }

//     const portfolio = await UserPort.findOne({ userId: user._id });
//     if (!portfolio) return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });

//     // Replace all projects with a single new project
//     portfolio.project = [
//       {
//         title: title.trim(),
//         description: description.trim(),
//         detailedDescription: detailedDescription.trim(),
//         contributions: cleanedContributions,
//       },
//     ];

//     await portfolio.save();

//     return NextResponse.json({ message: "Project updated successfully", data: portfolio.project }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
//   }
// }

import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

// ---------------------
// POST → Add a new project
// ---------------------

export async function POST(req) {
  try {
    const user = await verifyToken(req);
    if (!user?._id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { project } = body; // ✅ array

    if (!Array.isArray(project) || project.length === 0) {
      return NextResponse.json(
        { message: "Add at least one project" },
        { status: 400 }
      );
    }

    const cleanedProjects = project
      .map((p) => ({
        title: p.title?.trim() || "",
        description: p.description?.trim() || "",
        detailedDescription: p.detailedDescription?.trim() || "",
        contributions: Array.isArray(p.contributions)
          ? p.contributions.map((c) => c.trim()).filter(Boolean)
          : [],
      }))
      .filter(
        (p) =>
          p.title &&
          p.description &&
          p.detailedDescription &&
          p.contributions.length > 0
      );

    if (cleanedProjects.length === 0) {
      return NextResponse.json(
        { message: "Invalid project data" },
        { status: 400 }
      );
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio) {
      await UserPort.create({
        userId: user._id,
        project: cleanedProjects,
      });
    } else {
      portfolio.project = cleanedProjects;
      await portfolio.save();
    }

    return NextResponse.json(
      { message: "Projects saved", data: cleanedProjects },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}

// ---------------------
// GET → Fetch all projects
// ---------------------
export async function GET(req) {
  try {
    const user = await verifyToken(req);
    if (!user?._id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const portfolio = await UserPort.findOne({ userId: user._id });
    const project = portfolio?.project || [];

    return NextResponse.json(
      { message: "Projects fetched", data: project },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { project } = body; // expect an array from frontend

    if (!Array.isArray(project) || project.length === 0) {
      return NextResponse.json({ message: "Add at least one project" }, { status: 400 });
    }

    // Clean and validate each project
    const cleanedProjects = project
      .map((p) => ({
        title: p.title?.trim() || "",
        description: p.description?.trim() || "",
        detailedDescription: p.detailedDescription?.trim() || "",
        contributions: Array.isArray(p.contributions)
          ? p.contributions.map((c) => c.trim()).filter(Boolean)
          : [],
      }))
      .filter(
        (p) =>
          p.title &&
          p.description &&
          p.detailedDescription &&
          p.contributions.length > 0
      );

    if (cleanedProjects.length === 0) {
      return NextResponse.json({ message: "No valid projects to save" }, { status: 400 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    }

    // Save all projects
    portfolio.project = cleanedProjects;
    await portfolio.save();

    return NextResponse.json({
      message: "Projects updated successfully",
      data: portfolio.project,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Update failed",
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(req) {
  const user = await verifyToken(req);
  if (!user?._id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await UserPort.updateOne(
    { userId: user._id },
    { $unset: { project: [] }}
  );

  return NextResponse.json({ message: "project deleted" });
}
