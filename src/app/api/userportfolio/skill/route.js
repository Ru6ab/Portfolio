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
                return NextResponse.json({message:"add skills"}, {status:400})
            }
            for (const skill of body){
            if(!skill ){
                 return NextResponse.json({ message: "skill entry required" }, { status: 400 });
            }}
            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, skill: body }
            )}

                else{
                   portfolio.skill =  body
                   await portfolio.save()
                }
                return NextResponse.json({ message: "skill section saved", data: portfolio }, { status: 201 });
            }
    catch(error){
            return NextResponse.json({ message: "catch error occured", error: error.message }, { status: 500 });
    }
    
}

export async function GET(req){
    try{
        const user = await verifyToken(req)
         if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
        const portfolio = await UserPort.findOne({ userId: user._id })
        const getSkill = portfolio.skill
        
        return NextResponse.json({message:"skill section got", data:getSkill}, { status: 200 })
    }catch(error){
          return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
    }
}