import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

function DeleteUserButton() {
  return (
    <button className='p-3 bg-red-400 rounded-md ml-1'>
        <p className='text-xl'>
            <AiFillDelete />
        </p>
    </button>
  )
}

export default DeleteUserButton