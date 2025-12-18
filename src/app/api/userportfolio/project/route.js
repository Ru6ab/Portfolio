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

    const { title, description, detailedDescription, contributions } = body

    if (
      !title ||
      !description ||
      !detailedDescription ||
      !Array.isArray(contributions)
    ) {
      return NextResponse.json(
        { message: "All project fields are required" },
        { status: 400 }
      )
    }

    let portfolio = await UserPort.findOne({ userId: user._id })

    if (!portfolio) {
      portfolio = await UserPort.create({
        userId: user._id,
        project: [body], // store as array
      })
    } else {
      portfolio.project.push(body)
      await portfolio.save()
    }

    return NextResponse.json(
      { message: "Project saved", data: portfolio },
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
            const getProject = portfolio.project;
            return NextResponse.json(
              { message: "project section got", data: getProject },
              { status: 200 }
            );
          } catch (error) {
            return NextResponse.json(
              { message: "catch error occured", error: error.message },
              { status: 500 }
            );
          }
        }
