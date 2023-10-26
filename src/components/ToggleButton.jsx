import React, { useState, useContext } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'
import { DarkModeContext } from '../context/themeContext'

function ToggleButton() {

    const { toggleDarkMode } = useContext(DarkModeContext)

    const [colorTheme, setColorTheme] = useState(true)

    const toggleTheme = () => {
        setColorTheme(!colorTheme)
        //console.log(colorTheme)
        toggleDarkMode()
    }

  return (
    <>
        <div className={`flex relative w-20 items-center ${colorTheme ? 'bg-slate-300' : 'bg-slate-800'} rounded-full`}>
            <button 
                onClick={toggleTheme} 
                className={`${colorTheme ? 'left-0 bg-yellow-300' : 'left-9 bg-neutral-400' } absolute text-center p-3 border-2 rounded-full duration-150`}
                >
                {
                    colorTheme ? <BsSun /> : <BsMoon />
                }
            </button>
        </div>
    </>
  )
}

export default ToggleButton