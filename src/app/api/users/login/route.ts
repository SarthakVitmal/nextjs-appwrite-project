import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs"
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody)

        //Check if user exists
        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:500})
        }
        //Check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }

        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        // create token
        const token = jwt.sign(tokenData,process.env.JWT_TOKEN_SECRET!, { expiresIn: "1hr" })
        
        const response = NextResponse.json({message:"Login Successful",success:true})
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}