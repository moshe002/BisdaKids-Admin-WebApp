import React, { useState, useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'

import ViewAdminData from '../components/userComponents/adminComponents/ViewAdminData'
import ViewPlayerData from '../components/userComponents/ViewPlayerData'

function Users() {

  const { darkMode } = useContext(DarkModeContext)

  const [renderThis, setRenderThis] = useState(true)

  return (
    <div className={`${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'} flex flex-col items-center gap-3`}>
      <div className='flex justify-center items-center gap-14 mt-10'>
        <button
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${renderThis ? 'opacity-100' : 'opacity-40'}`} 
          onClick={() => setRenderThis(!false) }>
            Players
        </button>
        <button 
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${!renderThis ? 'opacity-100' : 'opacity-40'}`}
          onClick={() => setRenderThis(!true)}>
            Admins
        </button>
      </div>
      {
        renderThis ? <ViewPlayerData /> : <ViewAdminData />
      }
    </div>   
  )
}

export default Users