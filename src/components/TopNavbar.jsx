import React from 'react'
import { Link } from 'react-router-dom'

import TopNavbarButton from './TopNavbarButton'
import Logo from '../assets/logo.png'
import Logout from './Logout'

function TopNavbar() {
  return (
    <div className='flex flex-row items-center justify-between p-3 shadow-xl'>
        <img className='w-38 h-16' src={Logo} alt="logo_image" />
        <div className='flex gap-10 p-3'>
          <Link to='/users'>
            <TopNavbarButton text={'Users'} />
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
        <Logout />
    </div>
  )
}

export default TopNavbar