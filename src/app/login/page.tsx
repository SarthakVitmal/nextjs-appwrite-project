"use client";
import React, { useState,useEffect} from 'react'
import Link from 'next/link';
import { useRouter} from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


function login() {
  const router = useRouter();
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  })

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log("Login Successfully",response.data);
      toast.success("Login Successful");
      router.push('/profile');
    } catch (error:any) {
      console.log("Login Failed",error.message);
      toast.error(error.message); 
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-1'>
        <h1 className='text-3xl'>{loading?"Processing":"Login"}</h1>
        <hr />
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
        <button onClick={onlogin} className='bg-white text-black p-2 rounded-lg mt-3'>{buttonDisabled?"No Login":"Login"}</button>
        <Link href="/signup">If you not have an account,Please Signup</Link>
      </div>
    </>
  )
}

export default login