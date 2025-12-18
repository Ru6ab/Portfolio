import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import User from "../models/User"
const JWT_SECRET = process.env.JWT_SECRET
export async function verifyToken(req){
    try{
const token = req.cookies.get('token')?.value
if(!token){
    throw new Error("Unauthorized")
}
console.log(token)
const decoded = jwt.verify(token,JWT_SECRET)
console.log("decoded:",decoded)
const user  = await User.findById(decoded.id).select('-password')
   if (!user) {
         throw new Error("User not found");
            }
          console.log("user decoded",user)
return user;
    }
    catch(error){
        throw new Error("Unauthorized")
    }
}