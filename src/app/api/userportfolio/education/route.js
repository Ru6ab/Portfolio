import { verifyToken } from "@/app/lib/verifyToken"
import UserPort from "@/app/models/UserPort";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body =await req.json()
        const {education} =  body
        const user = await verifyToken(req)
          if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
           if (
  !Array.isArray(education) ||
  education.length === 0 ||
  education.every(
    e =>
      !e.school?.trim() &&
      !e.degree?.trim() &&
      !e.year?.trim()
  )
) {
  return NextResponse.json(
    { message: "Add at least one valid education" },
    { status: 400 }
  );
}

            let portfolio = await UserPort.findOne({ userId: user._id })
            if(!portfolio){
               portfolio =await  UserPort.create({ userId: user._id, education}
            )}

                else{
                   portfolio.education =  education
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


export async function PUT(req){
    try{
        const body =await req.json()
          const {education} = body
        const user = await verifyToken(req)
         if (!user || !user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
               if (!Array.isArray(education)) {
  return NextResponse.json(
    { message: "education must be an array" },
    { status: 400 }
  )
}
for (const e of education){
   if( !e.year || !e.degree || !e.school){
    return NextResponse.json({ message: "enter all fields for education section" }, { status: 401 });
   }
}
const cleanedEducation = education
  .map(i => ({
    school: i.school?.trim() || "",
    degree: i.degree?.trim() || "",
    year: i.year?.trim() || ""
  }))
  .filter(i => i.school || i.degree || i.year); // remove completely empty objects


if (cleanedEducation.length === 0) {
  return NextResponse.json(
    { message: "Add at least one valid education" },
    { status: 400 }
  )
}
          let portfolio = await UserPort.findOne({ userId: user._id })
             if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    } 
     portfolio.education = cleanedEducation
     console.log(portfolio.education)
    await portfolio.save()
        return NextResponse.json(
      {
        message: "educations updated successfully",
        data: portfolio.education,
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
    { $unset: { education: [] }}
  );

  return NextResponse.json({ message: "Education deleted" });
}
