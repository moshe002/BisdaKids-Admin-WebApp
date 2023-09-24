import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

function EditTaskButton() {
  return (
    <>
        <button className='p-3 bg-violet-400 rounded-md mr-1'>
            <p className='text-xl'>
                <AiFillEdit />
            </p>
        </button>
    </>
  )
}

export default EditTaskButton