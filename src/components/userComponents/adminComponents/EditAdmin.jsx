import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai' 
import axios from 'axios'

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
          setChecker={setChecker}
          userId={userId}
          firstname={firstname}
          lastname={lastname}
          username={username}
          email={email}
          contactNo={contactNo}
          setShowEditModal={setShowEditModal}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEdit setSuccessEdit={setSuccessEdit} /> }
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
  setChecker
}) {
  
  const [newFirstname, setNewFirstname] = useState(firstname)
  const [newLastname, setNewLastname] = useState(lastname)
  const [newUsername, setNewUsername] = useState(username)
  const [newEmail, setNewEmail] = useState(email)
  const [newContactNo, setNewContactNo] = useState(contactNo)

  const dataEdit = {
    firstname: newFirstname,
    lastname: newLastname,
    username: newUsername,
    email: newEmail,
    contactNo: newContactNo,
    userId: userId
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`http://localhost/BisdaKids-Admin/backend/editAdmin.php`, dataEdit)
      console.log(res.data)
    } catch(error) {
      console.error(error)
    }
    setChecker(true)
    setSuccessEdit(true)
    setShowEditModal(false)
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
                //value={newUsername}
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

function SuccessEdit({ setSuccessEdit }) {

  const handleClick = () => setSuccessEdit(false)

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <h1 className='text-4xl text-green-500 font-semibold'>Edited Successfully!</h1>
          <button onClick={handleClick} title='close me pls' type='button'>
              <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                  <AiOutlineCloseCircle />
              </p>
          </button>
      </div>
    </div>
  )
}

export default EditAdmin