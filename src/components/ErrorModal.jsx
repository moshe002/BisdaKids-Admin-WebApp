import React, { useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function ErrorModal({ displayError, errorText }) {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-50'>
      <div className={`flex flex-col relative items-center gap-3 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} shadow-2xl rounded-md overflow-y-auto max-h-full`}>
        <h1 className='text-3xl text-red-500 text-center font-semibold'>{errorText}</h1>
        <button onClick={() => displayError(false)} title='suffering is inevitable' type='button'>
          <p className='text-4xl p-1 rounded-full hover:bg-red-500 duration-150'>
            <AiOutlineCloseCircle />
          </p>
        </button>
      </div>
    </div>
  )
}

export default ErrorModal