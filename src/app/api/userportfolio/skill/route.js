import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort";

import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body =await req.json()
        const {skill} =  body
        const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            if(!Array.isArray(skill) || skill.length===0){
                return NextResponse.json({message:"add skills"}, {status:400})
            }
            for (const s of skill){
            if(!s ){
                 return NextResponse.json({ message: "skill entry required" }, { status: 400 });
            }}
            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, skill }
            )}

                else{
                   portfolio.skill =  skill 
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
        const getSkill = portfolio.skill || []
        
        return NextResponse.json({message:"skill section got", data:getSkill}, { status: 200 })
    }catch(error){
          return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
    }
}

export async function PUT(req){
    try{
        const body =await req.json()
          const {skill} = body
        const user = await verifyToken(req)
         if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
               if (!Array.isArray(skill)) {
  return NextResponse.json(
    { message: "skill must be an array" },
    { status: 400 }
  )
}
const cleanedSkill = skill
  .map(i => i.trim())
  .filter(i => i.length > 0)

if (cleanedSkill.length === 0) {
  return NextResponse.json(
    { message: "Add at least one valid skill" },
    { status: 400 }
  )
}
          let portfolio = await UserPort.findOne({ userId: user._id })
             if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    } 
     portfolio.skill = cleanedSkill
    await portfolio.save()
        return NextResponse.json(
      {
        message: "Skills updated successfully",
        data: portfolio.skill,
      },
      { status: 200 }
    );
    }catch (error) {
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
    { $unset: { skill: [] }}
  );

  return NextResponse.json({ message: "skill deleted" });
}