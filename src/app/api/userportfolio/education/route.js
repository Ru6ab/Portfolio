import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body =await req.json()
        const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            if(!Array.isArray(body) || body.length===0){
                return NextResponse.json({message:"add education sections"}, {status:400})
            }
            for (const edu of body){
            if(!edu.school || !edu.degree || !edu.duration){
                 return NextResponse.json({ message: "education fields required" }, { status: 400 });
            }}
            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, education: body }
            )}

                else{
                   portfolio.education =  body
                   await portfolio.save()
                }
                return NextResponse.json({ message: "education section saved", data: portfolio }, { status: 201 });
            }
    catch(error){
            return NextResponse.json({ message: "catch error occured", error: error.message }, { status: 500 });
    }
    
}

export async function GET(req) {
    try{
          const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }

             let portfolio = await UserPort.findOne({ userId: user._id })

        const getEducation = portfolio.education
                   
                   return NextResponse.json({message:"education section got", data:getEducation}, { status: 200 })
               }catch(error){
                     return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
               }
}