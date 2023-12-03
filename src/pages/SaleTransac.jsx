import React, { useState, useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'

import GameTransactions from '../components/saleTransactions/GameTransactions'
import SystemTransactions from '../components/saleTransactions/SystemTransactions'

function Users() {

  const { darkMode } = useContext(DarkModeContext)

  const [renderThis, setRenderThis] = useState(true)

  return (
    <div className={`flex flex-col items-center h-screen gap-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'}`}>
      <div className='flex justify-center items-center gap-14 mt-10'>
        <button
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${renderThis ? 'opacity-100' : 'opacity-40'}`} 
          onClick={() => setRenderThis(!false) }>
            Game
        </button>
        <button 
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${!renderThis ? 'opacity-100' : 'opacity-40'}`}
          onClick={() => setRenderThis(!true)}>
            System
        </button>
      </div>
      {
        renderThis ? <GameTransactions /> : <SystemTransactions />
      }
    </div>   
  )
}

export default Users