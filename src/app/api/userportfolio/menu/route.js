import { NextResponse } from "next/server";
import UserPort from "@/app/models/UserPort";
import { verifyToken } from "@/app/lib/verifyToken";
import { NAV_CONFIG } from "@/app/lib/navConfig";

export async function GET(req) {
  try {
    // 🔐 auth
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 📦 fetch portfolio
    const portfolio = await UserPort.findOne({ userId: user.id }).lean();

    if (!portfolio) {
      return NextResponse.json([]);
    }
console.log("PORTFOLIO:", portfolio);
    // 🧠 build menu from config
    const menu =NAV_CONFIG.filter(section => {
      const data = portfolio[section.key];

      // Always visible sections
      if (section.showWhenEmpty) return true;

      // Array sections (education, projects, etc.)
      if (section.type === "array") {
        return Array.isArray(data) && data.length > 0;
      }

      // Object sections (about, profile, main)
      if (section.type === "object") {
        return Object.values(data || {}).some(value => {
          if (Array.isArray(value)) return value.length > 0;
          return Boolean(value);
        });
      }

      return false;
    }).map(section => ({
      key: section.key,
      label: section.label,
    }));

    return NextResponse.json(menu);

  } catch (error) {
    console.error("MENU ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load menu" },
      { status: 500 }
    );
  }
}
