import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai'

import ValidateDelete from './ValidateDelete'

function DeleteUserButton({ userId, setChecker }) {

  const [deleteUser, setDeleteUser] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)

  const handleDelete = async () => {
    //console.log(userId)
    setDeleteUser(true)
  }

  return (
    <>
      { deleteUser && <ValidateDelete userId={userId} setSuccessDelete={setSuccessDelete} setDeleteUser={setDeleteUser} /> }
      { successDelete && <SuccessDelete setSuccessDelete={setSuccessDelete} setChecker={setChecker} /> }
      <button onClick={handleDelete} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'>
              <AiFillDelete />
          </p>
      </button>
    </>
  )
}

const SuccessDelete = ({ setSuccessDelete, setChecker }) => {

  const handleClick = () => {
    setSuccessDelete(false)
    setChecker(true)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
          <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
              <h1 className='text-4xl text-green-500 font-semibold'>Deleted Successfully!</h1>
              <button onClick={handleClick} title='close me pls' type='button'>
                  <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                      <AiOutlineCloseCircle />
                  </p>
              </button>
          </div>
      </div>
  )
}


export default DeleteUserButton