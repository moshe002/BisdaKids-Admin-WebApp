import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../context/themeContext'

import TopNavbarButton from './TopNavbarButton'
import Logo from '../assets/logo.png'
import Logout from './Logout'
import ToggleButton from './ToggleButton'

function TopNavbar({ setIsLoggedIn }) {

  const { darkMode } = useContext(DarkModeContext)
 
  return (
    <div className={`flex flex-row items-center justify-between ${darkMode ? 'bg-zinc-700' : 'bg-white'} p-3 drop-shadow-xl`}>
      <img className='w-38 h-16' src={Logo} alt="logo_image" />
      <div className='flex gap-10 p-3'>
        <Link to='/users'>
          <TopNavbarButton text={'Users'} />
        </Link>
        <Link to='/accountprogress'>
          <TopNavbarButton text={'Account Progress'} />
        </Link>
        <Link to='/dailytasks'>
          <TopNavbarButton text={'Daily Tasks'} />
        </Link>
        <Link to='/store'>
          <TopNavbarButton text={'Store'} />
        </Link>
        <Link to='/items'>
          <TopNavbarButton text={'Items'} />
        </Link>
        <Link to='/saletransac'>
          <TopNavbarButton text={'Sale'} />
        </Link>
      </div>
      <div className='flex gap-10'>
        <ToggleButton />
        <Logout setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  )
}

export default TopNavbar
