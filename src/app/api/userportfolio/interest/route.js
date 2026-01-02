import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body =await req.json()
        const {interest} =  body
        const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            if(!Array.isArray(interest) || interest.length===0){
                return NextResponse.json({message:"add interest"}, {status:400})
            }
            for (const i of interest){
            if(!interest ){
                 return NextResponse.json({ message: "interest entry required" }, { status: 400 });
            }}
            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, interest }
            )}

                else{
                   portfolio.interest =  interest
                   await portfolio.save()
                }
                return NextResponse.json({ message: "interest section saved", data: portfolio }, { status: 201 });
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
        const getInterest = portfolio.interest
        
        return NextResponse.json({message:"interest section got", data:getInterest}, { status: 200 })
    }catch(error){
          return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
    }
}


export async function PUT(req){
    try{
        const body =await req.json()
          const {interest} = body
        const user = await verifyToken(req)
         if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
       if (!Array.isArray(interest)) {
  return NextResponse.json(
    { message: "Interest must be an array" },
    { status: 400 }
  )
}

const cleanedInterest = interest
  .map(i => i.trim())
  .filter(i => i.length > 0)

if (cleanedInterest.length === 0) {
  return NextResponse.json(
    { message: "Add at least one valid interest" },
    { status: 400 }
  )
}


          let portfolio = await UserPort.findOne({ userId: user._id })
             if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    } 
  portfolio.interest = cleanedInterest
    console.log(portfolio.interest)
    await portfolio.save()
        return NextResponse.json(
      {
        message: "interests updated successfully",
        data: portfolio.interest,
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
    { $unset: { interest: [] }}
  );

  return NextResponse.json({ message: "interest deleted" });
}