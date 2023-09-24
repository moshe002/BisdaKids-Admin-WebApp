import React from 'react'

function SuccessSubmit({ setSuccessSubmit, setChecker }) {

  const handleClick = () => {
    setChecker(true)
    setSuccessSubmit(false)
  }
  
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-4xl font-bold text-green-500'>Submitted!</h1>
            <button
              className='p-3 bg-red-400 hover:bg-red-500 text-white text-xl font-semibold rounded-md' 
              type='button'
              onClick={handleClick}>
                CLOSE
            </button>
        </div>
    </div>
  )
}

export default SuccessSubmit