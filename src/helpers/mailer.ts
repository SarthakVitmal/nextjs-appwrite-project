import nodemailer from "nodemailer"
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now() + 3600000},
            )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now() + 3600000},
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.SEND_EMAIL_USER,
              pass: process.env.SEND_EMAIL_PASS
            }
          });
          
        const mailOptions = {
            from:'sarthakvitmal0829@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}">here</a>to ${emailType==='VERIFY'?"verify your email":"reset your password"}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        console.log("Error Sending Email",error.message)
    }
}

