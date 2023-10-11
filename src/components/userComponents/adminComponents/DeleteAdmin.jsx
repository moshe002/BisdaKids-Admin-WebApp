import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
//import axios from 'axios'
import { supabase } from '../../../supabase-config'

import SuccessDeleteModal from '../../SuccessDeleteModal'

function DeleteAdmin({ adminUsername, userId, setChecker }) {

  const [showModal, setShowModal] = useState(false)
  const [doneDelete, setDoneDelete] = useState(false)

  return (
    <>
      { 
        showModal 
        && 
        <DeleteAdminModal 
          userId={userId}
          adminUsername={adminUsername} 
          setShowModal={setShowModal}
          setDoneDelete={setDoneDelete} /> 
      }
      { doneDelete && <SuccessDeleteModal setChecker={setChecker} setDoneDelete={setDoneDelete} /> }
      <button title='delete admin' onClick={() => setShowModal(true)} className='p-3 bg-red-400 rounded-md ml-1'>
        <p className='text-xl'>
          <AiFillDelete />
        </p>
      </button>
    </>
  )
}

function DeleteAdminModal({ userId, adminUsername, setShowModal, setDoneDelete }) {

  const handleDelete = async () => {
    try {
      // const response = await axios.post(`http://localhost/BisdaKids-Admin/backend/deleteAdmin.php`, userId)
      // console.log(response.data)
      const { error } = await supabase
      .from('admin_accounts')
      .delete()
      .eq('id', userId)
      error && console.error(error)
    } catch(error) {
      console.error(error)
    }
    setDoneDelete(true)
    setShowModal(false)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
        <h1 className='text-3xl font-semibold text-green-500'>Delete {adminUsername}?</h1>
        <div className='flex flex-row gap-5'>
          <button onClick={handleDelete} type='button'>
            <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
              <AiOutlineCheckCircle />
            </p>
          </button>
          <button onClick={() => setShowModal(false)} type='button'>
            <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
              <AiOutlineCloseCircle/>
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAdmin