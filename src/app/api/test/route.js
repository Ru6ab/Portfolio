import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "MongoDB Connected Successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "MongoDB Connection Failed", error: error.message },
      { status: 500 }
    );
  }
}
