"use client"; 

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const [buttonDisabled, setButtonDisabled] = useState(true);  
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ email: "" });

    // Update button state based on email input
    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user.email]);  

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email: user.email });
            console.log(response.data);
            toast.success("Reset password link sent to your email.");
        } catch (error: any) {
            console.error("Error resetting password:", error);
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
            <h1 className="text-3xl">{loading ? "Processing..." : "Forgot Password"}</h1>
            <label htmlFor='email'>Email</label>
            <input
                className="text-black p-2 rounded-lg focus:outline-none focus:border-gray-600"
                id='email'
                type='email'
                value={user.email}
                placeholder='Enter your email'
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button
                onClick={onForgotPassword}
                className="p-2 bg-white rounded-lg text-black mt-2 transition-all hover:scale-105 duration-500"
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Enter Email" : "Submit"}
            </button>
        </div>
    );
}
