import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai' 
//import axios from 'axios'
import { supabase } from '../../../supabase-config'

import SuccessEditModal from '../../SuccessEditModal'

function EditAdmin({ 
  firstname,
  lastname,
  username,
  email,
  contactNo,
  userId,
  setChecker
 }) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)

  return (
    <>
      { 
        showEditModal 
        && 
        <EditModal
          userId={userId}
          firstname={firstname}
          lastname={lastname}
          username={username}
          email={email}
          contactNo={contactNo}
          setShowEditModal={setShowEditModal}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEditModal setSuccessEdit={setSuccessEdit} setChecker={setChecker} /> }
      <button title='edit admin' onClick={() => setShowEditModal(true)} className='p-3 bg-violet-400 rounded-md mr-1'>
        <p className='text-xl'>
          <AiFillEdit />
        </p>
      </button>
    </>
  )
}

function EditModal({ 
  userId,
  firstname, 
  lastname, 
  username, 
  email, 
  contactNo, 
  setSuccessEdit,
  setShowEditModal,
}) {
  
  const [newFirstname, setNewFirstname] = useState(firstname)
  const [newLastname, setNewLastname] = useState(lastname)
  const [newUsername, setNewUsername] = useState(username)
  const [newEmail, setNewEmail] = useState(email)
  const [newContactNo, setNewContactNo] = useState(contactNo)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try{ 
      const { error } = await supabase
      .from('admin_accounts')
      .update({ 
        firstname: newFirstname,
        lastname: newLastname,
        username: newUsername,
        email: newEmail,
        contactNo: newContactNo, 
      })
      .eq('id', userId)
      error && console.error(error)
      // const res = await axios.post(`http://localhost/BisdaKids-Admin/backend/editAdmin.php`, dataEdit)
      // console.log(res.data)
    } catch(error) {
      console.error(error)
    }
    setShowEditModal(false)
    setSuccessEdit(true)
  }
  
  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col relative items-center gap-5 py-5 px-10 bg-white shadow-2xl rounded-md'>
          <button 
            onClick={() => setShowEditModal(false)} 
            type='button' 
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
              <AiOutlineCloseCircle />
          </button>
          <h1 className='font-bold text-2xl'>Edit Admin Account</h1>
          <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="firstname" className='text-lg font-semibold text-center'>Firstname:</label>
              <input 
                placeholder={firstname}
                value={newFirstname}
                onChange={e => setNewFirstname(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='firstname' type="text" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="lastname" className='text-lg font-semibold text-center'>Lastname:</label>
              <input 
                placeholder={lastname}
                value={newLastname}
                onChange={e => setNewLastname(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='lastname' type="text" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="username" className='text-lg font-semibold text-center'>Username:</label>
              <input
                placeholder={username}
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='username' type="text" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email" className='text-lg font-semibold text-center'>Email:</label>
              <input
                placeholder={email}
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='email' type="text" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="contactNo" className='text-lg font-semibold text-center'>Contact No:</label>
              <input
                placeholder={contactNo}
                value={newContactNo}
                onChange={e => setNewContactNo(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='contactNo' type="number" />
            </div>
            <input
              className='p-1 bg-green-400 text-white font-semibold text-lg rounded-md cursor-pointer hover:bg-green-500 duration-150' 
              type="submit" 
              value='SUBMIT' />
          </form>
      </div>
    </div>
  )
}

export default EditAdmin