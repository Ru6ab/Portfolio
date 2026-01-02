// import { verifyToken } from "@/app/lib/verifyToken";
// import UserPort from "@/app/models/UserPort";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     // 1. Token validation
//     const user = await verifyToken(req);
//     if (!user || !user._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Must be an array
//     if (!Array.isArray(body) || body.length === 0) {
//       return NextResponse.json(
//         { message: "add publication section" },
//         { status: 400 }
//       );
//     }

//     // 3. Validate each award entry (simple null/empty check)
//     for (const publication of body) {
//       if (
//         !publication.title ||
//         !publication.status ||
//         !publication.description
//       ) {
//         return NextResponse.json(
//           { message: "all publication fields required" },
//           { status: 400 }
//         );
//       }
//     }

//     // 4. Find existing portfolio
//     let portfolio = await UserPort.findOne({ userId: user._id });

//     // 5. Create if not existing
//     if (!portfolio) {
//       portfolio = await UserPort.create({
//         userId: user._id,
//         publication: body,
//       });
//     } else {
//       portfolio.publication = body;
//       await portfolio.save();
//     }

//     return NextResponse.json(
//       { message: "publication section saved", data: portfolio },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "catch error occured", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     // 1. Token validation
//     const user = await verifyToken(req);
//     if (!user || !user._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     let portfolio = await UserPort.findOne({ userId: user._id });
//     const getPublication = portfolio.publication;
//     return NextResponse.json(
//       { message: "publication section got", data: getPublication },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "catch error occured", error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { verifyToken } from "@/app/lib/verifyToken";
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

// ---------------------
// POST → Save / Update Publications
// ---------------------
export async function POST(req) {
  try {
    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { publication } = body; // ✅ correct

    // Must be array
    if (!Array.isArray(publication) || publication.length === 0) {
      return NextResponse.json(
        { message: "Add at least one publication" },
        { status: 400 }
      );
    }

    // Clean + validate
    const cleanedPublications = publication
      .map((p) => ({
        title: p.title?.trim() || "",
        status: p.status?.trim() || "",
        description: p.description?.trim() || "",
      }))
      .filter(
        (p) => p.title && p.status && p.description
      );

    if (cleanedPublications.length === 0) {
      return NextResponse.json(
        { message: "All publication fields are required" },
        { status: 400 }
      );
    }

    // Find portfolio
    let portfolio = await UserPort.findOne({ userId: user._id });

    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        publication: cleanedPublications,
      });
    } else {
      portfolio.publication = cleanedPublications;
      await portfolio.save();
    }

    return NextResponse.json(
      {
        message: "Publication section saved",
        data: portfolio.publication,
      },
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
// GET → Fetch Publications
// ---------------------
export async function GET(req) {
  try {
    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await UserPort.findOne({ userId: user._id });

    return NextResponse.json(
      {
        message: "Publication section fetched",
        data: portfolio?.publication || [], // ✅ safe
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
export async function PUT(req) {
  try {
    // 1️⃣ Token validation
    const user = await verifyToken(req);
    if (!user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Read body correctly
    const body = await req.json();
    const { publication } = body;

    // 3️⃣ Must be non-empty array
    if (!Array.isArray(publication) || publication.length === 0) {
      return NextResponse.json(
        { message: "Add at least one publication" },
        { status: 400 }
      );
    }

    // 4️⃣ Clean + validate (no empty / spaces-only allowed)
    const cleanedPublications = publication
      .map((p) => ({
        title: p.title?.trim() || "",
        status: p.status?.trim() || "",
        description: p.description?.trim() || "",
      }))
      .filter(
        (p) => p.title && p.status && p.description
      );

    if (cleanedPublications.length === 0) {
      return NextResponse.json(
        { message: "All publication fields are required" },
        { status: 400 }
      );
    }

    // 5️⃣ Portfolio must exist for update
    const portfolio = await UserPort.findOne({ userId: user._id });
    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      );
    }

    // 6️⃣ Update publications
    portfolio.publication = cleanedPublications;
    await portfolio.save();

    return NextResponse.json(
      {
        message: "Publication section updated",
        data: portfolio.publication,
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
    { $unset: { publication: [] }}
  );

  return NextResponse.json({ message: "publication deleted" });
}


