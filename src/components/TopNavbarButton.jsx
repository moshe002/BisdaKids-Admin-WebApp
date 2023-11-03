import React, { useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'
import { useLocation } from 'react-router-dom'; 

function TopNavbarButton({ text, path }) {

  const { darkMode } = useContext(DarkModeContext)

  const location = useLocation()

  return (
    <>
      <div className={`${darkMode ? 'text-white' : 'text-black'} ${location.pathname === path && 'border-gray-500'} border-b-2 border-gray-300 hover:border-gray-500 duration-150`}>
        <h1 className='font-semibold text-xl'>
          {text}
        </h1>
      </div>
    </>
    
  )
}

export default TopNavbarButton