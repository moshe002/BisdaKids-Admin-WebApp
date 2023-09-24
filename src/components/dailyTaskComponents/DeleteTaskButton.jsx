import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

function DeleteTaskButton() {
  return (
    <>
        <button className='p-3 bg-red-400 rounded-md ml-1'>
            <p className='text-xl'>
                <AiFillDelete />
            </p>
        </button>
    </>
  )
}

export default DeleteTaskButton