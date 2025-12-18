import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req){
    try{
    await connectDB()
    const {username,password} = await req.json()
    const user = await User.findOne({username})
    if(!user){
        return  NextResponse.json({
            message:"username not found"
        },
            {status:404}
    )
    }
    const comparePass = await bcrypt.compare(password,user.password)
       if(!comparePass){
        return  NextResponse.json({
            message:"wrong credentials"
        },
            {status:403}
    )
    }
 const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'})
 const res = NextResponse.json({message:"user logged in!",user},{status:200})
 res.cookies.set({name:"token",value:token,httpOnly:true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"})
 return res
}
catch(error){
    return NextResponse.json({message:"failed login attempt",error: error.message},{status:500})
}
}