import React from 'react'

function UserProfile({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-1'>
        <h1>Profile</h1>
        <hr/>
        <p className='text-3xl'>Profile Page <span className='bg-orange-500 text-black p-2 rounded'>{params.id}</span></p>
        
    </div>
  )
}

export default UserProfile