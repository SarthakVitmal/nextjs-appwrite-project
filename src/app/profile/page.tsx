"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState("Null");
  const logout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("You are logout");
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  const userDetails = async() => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-1'>
        <h1>Profile</h1>
        <hr/>
        <p>Profile Page</p>
        <h2 className='bg-green-500 p-2 rounded-lg max-w-fit'>{data === "NULL"?"NULL":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button className='bg-purple-900 text-white p-2 rounded-lg' onClick={userDetails}>Get User Details</button>
        <button className='bg-white text-black p-2 rounded-lg mt-3' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage