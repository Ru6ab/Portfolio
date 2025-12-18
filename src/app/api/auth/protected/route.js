import { verifyToken } from "@/app/lib/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
    const user =await verifyToken(req)
      console.log("cookies:", req.cookies.get("token"));
    console.log("user from protected route:",user)
    return NextResponse.json({message:"this is protected route",user},{status:200})
}catch(error){
 return  NextResponse.json(({ message: error.message,user }, { status: 401 }))
}
}