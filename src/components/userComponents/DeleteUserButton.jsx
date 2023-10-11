import React, { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'

import ValidateDelete from './ValidateDelete'
import SuccessDeleteModal from '../SuccessDeleteModal'

function DeleteUserButton({ userId, setChecker, username }) {

  const [deleteUser, setDeleteUser] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)

  const handleDelete = async () => {
    //console.log(userId)
    setDeleteUser(true)
  }

  return (
    <>
      { deleteUser && <ValidateDelete username={username} userId={userId} setSuccessDelete={setSuccessDelete} setDeleteUser={setDeleteUser} /> }
      { successDelete && <SuccessDeleteModal setSuccessDelete={setSuccessDelete} setChecker={setChecker} /> }
      <button onClick={handleDelete} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'>
              <AiFillDelete />
          </p>
      </button>
    </>
  )
}

export default DeleteUserButton