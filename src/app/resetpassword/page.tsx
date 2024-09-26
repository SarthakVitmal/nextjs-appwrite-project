"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
    import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function forgotpassword() {
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);
    const[password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if(password.length < 0 || confirmPassword.length < 0){
            setButtonDisabled(true);
        }else setButtonDisabled(false)
    })
    const handleSubmit = async() => {
        if(password !== confirmPassword){
            return toast.error("Password do not match");
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword",{
                password,confirmPassword,token
            });
            toast.success("Password Reset Successfully" || response.data.message);
            router.push('/login');
        } catch (error : any) {
            toast.error("Something went wrong!" || error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
            <h1 className="text-3xl">{loading?"Processing":"Reset Password"}</h1>
            <label htmlFor='email'>Password</label>
            <input className='text-black p-2 rounded-lg focus:outline-none focus:border-gray-600'
                id='password'
                type='password'
                placeholder='New Password'
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <input className='text-black p-2 rounded-lg focus:outline-none focus:border-gray-600'
                id='confirmpassword'
                type='password'
                placeholder='Confirm Password'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSubmit} className="p-2 bg-white rounded-lg text-black mt-2 transition-all hover:scale-105 duration-500">{buttonDisabled?"Enter New Password":"Submit"}</button>
        </div>
    )
}