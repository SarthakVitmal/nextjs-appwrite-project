"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user)
      console.log("Signup success",response.data);
      router.push('/login');
    } catch (error:any) {
      console.log("Signup Failed",error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else setButtonDisabled(true);
  },[user])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-1'>
        <h1 className='text-3xl'>{loading?"Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor='username'>Username</label>
        <input className='text-black p-2 rounded-lg focus:outline-none focus:border-gray-600'
          id='username'
          type='text'
          value={user.username}
          placeholder='username'
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor='email'>Email</label>
        <input className='text-black p-2 rounded-lg focus:outline-none focus:border-gray-600'
          id='email'
          type='email'
          value={user.email}
          placeholder='email'
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor='password'>Password</label>
        <input className='text-black p-2 rounded-lg focus:outline-none focus:border-gray-600'
          id='password'
          type='text'
          value={user.password}
          placeholder='password'
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={onSignup} className='bg-white text-black p-2 rounded-lg mt-3'>{buttonDisabled?"No Signup":"Signup"}</button>
        <Link href="/login">If already have an account,Please Login</Link>
      </div>
    </>
  )
}

export default signup