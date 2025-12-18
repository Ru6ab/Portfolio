import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body =await req.json()
        console.log(body)
        const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
            if(!Array.isArray(body) || body.length===0){
                return NextResponse.json({message:"add experience sections"}, {status:400})
            }
            for (const exp of body){
                const { designation, duration, organization, topic  } = exp;

            if(!exp.designation || !exp.duration || !exp.organization || (!Array.isArray(topic))){
                           
                 return NextResponse.json({ message: " all experience fields required" }, { status: 400 });
                    
            }}
            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, experience: body }
            )}

                else{
                   portfolio.experience =  body
                   await portfolio.save()
                }
                return NextResponse.json({ message: "experience section saved", data: portfolio }, { status: 201 });
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
            let portfolio = await UserPort.findOne({ userId: user._id })
             const getExperience= portfolio.experience                  
                   return NextResponse.json({message:"experience section got", data:getExperience}, { status: 200 })
    }catch(error){
              return NextResponse.json({message:"error in catch", error: error.message}, { status: 500 })
    }
}