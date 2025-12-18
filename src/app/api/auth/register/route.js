// import { connectDB } from "@/app/lib/mongodb";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";


// export async function POST(req){
//     try{
//     await connectDB()
//     const {username,password,img} =await req.json();
//     if(!username || !password) {
//         return NextResponse.json(           
//             {message:"username and password required"},
//              {status:400}
//         )
//         }
//         const usernameTrimmed = username.trim();
//          const exsistingUser = await User.findOne({username:usernameTrimmed})
//          if(exsistingUser){
//             return NextResponse.json({message:'username already exists'},{status:409})
//          }
//     const hashedPassword =await bcrypt.hash(password,10)
//     const newUser = await User.create({username,password:hashedPassword,img:img || ""})
//     return NextResponse.json({user:newUser,message:"user created successfully"},{status:200})
//     }
//     catch(error){
//         return NextResponse.json(
//           {message:"can't register ", error:error.message},
//           {status:500},
//         )
//     }
// }

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req) {
  try {
    await connectDB();
    const { username, password, img } = await req.json();
   


    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password required" },
        { status: 400 }
      );
    }

    const usernameClean = username.trim().toLowerCase();

    const existingUser = await User.findOne({ username: usernameClean });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: usernameClean,
      password: hashedPassword,
      img: img || "",
    });
    
   const token = jwt.sign({id:newUser._id},JWT_SECRET,{expiresIn:'1h'})
   const res = NextResponse.json({user:newUser,message:"user created and  logged in!"},{status:201})
   res.cookies.set("token",token,{httpOnly:true,path:"/"})
   return res
  
  } catch (error) {
    console.error(error); // log the real error
    return NextResponse.json(
      { message: "Can't register", error: error.message },
      { status: 500 }
    );
  }
}
