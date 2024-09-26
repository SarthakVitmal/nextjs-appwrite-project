import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, token } = reqBody;

        console.log("Request Body:", reqBody);  // Log incoming data

        // Validate input
        if (!password || !token) {
            return NextResponse.json({ message: "Missing password or token" }, { status: 400 });
        }

        const user = await User.findOne({
            forgotpasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        console.log("User found:", user);  // Log if user is found

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update the user's password
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        // Save the updated user
        await user.save();
        console.log("Password reset successfully");

        return NextResponse.json({ message: "Password Reset Successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error resetting password:", error);  // Log the error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
