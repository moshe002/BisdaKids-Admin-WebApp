import React, { useState } from 'react'

import ViewAdminData from '../components/userComponents/adminComponents/ViewAdminData'
import ViewPlayerData from '../components/userComponents/ViewPlayerData'

function Users() {

  const [renderThis, setRenderThis] = useState(true)

  return (
    <>
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
    </>   
  )
}

export default Users