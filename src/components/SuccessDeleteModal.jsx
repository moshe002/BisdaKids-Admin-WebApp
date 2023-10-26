import React, { useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const SuccessDeleteModal = ({ setDeleteSuccess, setChecker }) => {

    const { darkMode } = useContext(DarkModeContext)

    const handleClick = () => {
        setDeleteSuccess(false)
        setChecker(true)
    }
  
    return(
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
            <div className={`flex flex-col items-center gap-5 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} drop-shadow-2xl rounded-md`}>
                <h1 className='text-4xl text-green-500 font-semibold'>Deleted Successfully!</h1>
                <button onClick={handleClick} title='close me pls' type='button'>
                    <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                        <AiOutlineCloseCircle />
                    </p>
                </button>
            </div>
        </div>
    )
  }

  export default SuccessDeleteModal