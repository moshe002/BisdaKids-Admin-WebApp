import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const nav = useNavigate()

    const handleLogout = async () => {
        try {
            // Make an API request to your backend to log the user out
            const response = await axios.post('http://localhost/BisdaKids-Admin/backend/logout-config.php');
      
            if (response.data.status === 1) {
              // Logout successful
              // Clear user-related data and navigate to the login page or perform other actions as needed
              console.log('Logout successful');
              nav('/')
            } else {
              // Logout failed
              console.error('Logout failed');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

  return (
    <>
        <button onClick={handleLogout} className='px-3 py-2 bg-gray-400 rounded-md hover:bg-gray-500 duration-150'>
            <div className='flex justify-center items-center gap-2'>
                <p className='text-base text-black font-semibold'>Logout</p>
                <p className='text-xl'>
                    <AiOutlineLogout />
                </p>
            </div>
        </button>
    </>
  )
}

export default Logout