import React, { useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function SuccessAddModal({ setSuccessSubmit, setChecker }) {

  const { darkMode } = useContext(DarkModeContext)

  const handleClose = () => {
    setChecker(true)
    setSuccessSubmit(false)
  }
  
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className={`flex flex-col items-center gap-5 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} drop-shadow-2xl rounded-md`}>
            <h1 className='text-4xl font-bold text-green-500'>Submitted!</h1>
            <button
              className='p-1 hover:bg-red-500 rounded-full duration-150' 
              type='button'
              onClick={handleClose}>
                <p className='text-4xl'>
                  <AiOutlineCloseCircle />
                </p>
            </button>
        </div>
    </div>
  )
}

export default SuccessAddModal