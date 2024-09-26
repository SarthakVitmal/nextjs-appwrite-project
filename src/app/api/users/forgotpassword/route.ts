import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email:email})
        if(!user){
            return NextResponse.json({message:"User not found",status:404});
        }

        const tokenData = ({
            id:user._id,
            username:user.username,
            email:user.email,
        })

        const token = jwt.sign(tokenData,process.env.JWT_TOKEN_SECRET!,{expiresIn:"1hr"});
        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000;   
        const savedUser = await user.save();
        const resetUrl = `${process.env.domain}/forgotpassword?token=${token}}`
        await sendEmail({email:user.email,emailType:"RESET",userId:savedUser._id})

        return NextResponse.json({
            message: "Password reset email sent successfully",
            status: 200,
        });      
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}