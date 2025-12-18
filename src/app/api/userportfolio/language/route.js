import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    console.log('Received body:', body)

    const user = await verifyToken(req)
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const {name , percentage  } = body
console.log(body)

if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { message: "No languages provided" },
        { status: 400 }
      )
    }
     for (const lang of body) {
      if (!lang.name || typeof lang.percentage !== "number") {
        return NextResponse.json(
          { message: "All language fields are required" },
          { status: 400 }
        )
      }
    }

    let portfolio = await UserPort.findOne({ userId: user._id })

    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        language: body, 
      })
    } else {
      portfolio.language= body
      await portfolio.save()
    }

    return NextResponse.json(
      { message: "language saved", data: portfolio },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Catch error occurred", error: error.message },
      { status: 500 }
    )
  }
}



export async function GET(req){
  try{
      const user = await verifyToken(req);
    if (!user || !user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
      let portfolio = await UserPort.findOne({ userId: user._id });
        const getLanguage = portfolio.language;
        return NextResponse.json(
          { message: "language section got", data: getLanguage },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "catch error occured", error: error.message },
          { status: 500 }
        );
      }
    }