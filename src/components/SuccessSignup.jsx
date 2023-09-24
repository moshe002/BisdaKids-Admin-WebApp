import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessSignup() {

    const nav = useNavigate()

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-4xl font-bold text-green-500'>Signup Success!</h1>
            <button 
                className='p-3 bg-blue-500 text-white font-semibold text-lg rounded-md'
                onClick={() => nav('/')}
                type='button'>
                    Login
            </button>
        </div>
    </div>
  )
}

export default SuccessSignup