import React, { useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'

function TopNavbarButton({ text }) {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <>
      <div className={`${darkMode ? 'text-white' : ''} border-b-2 border-gray-300 hover:border-gray-500 duration-150`}>
        <h1 className='font-semibold text-xl'>
          {text}
        </h1>
      </div>
    </>
    
  )
}

export default TopNavbarButton