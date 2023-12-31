import React, { useState, useContext } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'
import { DarkModeContext } from '../../context/themeContext'

import SuccessEditModal from '../SuccessEditModal'
import ErrorModal from '../ErrorModal'

function EditUserButton({ userId, username, password, setChecker }) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)

  const handleClick = () => setShowEditModal(true)
    //console.log(userId)

  return (
    <>
      { 
        showEditModal 
        && 
        <EditModal 
          setShowEditModal={setShowEditModal} 
          userId={userId}
          username={username}
          password={password}
          setSuccessEdit={setSuccessEdit}
        /> 
      }
      { successEdit && <SuccessEditModal setSuccessEdit={setSuccessEdit} setChecker={setChecker} /> }
      <button onClick={handleClick} className='p-3 bg-violet-400 rounded-md mr-1'>
          <p className='text-xl'>
              <AiFillEdit />
          </p>
      </button>
    </>
  )
}

function EditModal({ setShowEditModal, userId, username, password, setSuccessEdit }) {

  const { darkMode } = useContext(DarkModeContext)
  
  const [newUsername, setNewUsername] = useState(username)
  const [newPassword, setNewPassword] = useState(password)
  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoadingText(true)
    const { error } = await supabase
    .from('user_account')
    .update({ user_password: newPassword, user_name: newUsername })
    .eq('user_id', userId)
    if(error){
      setDisplayError(true)
      console.error(error)
    } 
    setLoadingText(false)
    setSuccessEdit(true)
    setShowEditModal(false)
  }

  return(
    <>
      { displayError && <ErrorModal displayError={setDisplayError} errorText={'Error Editing'} /> }
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className={`flex flex-col relative items-center gap-5 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} shadow-2xl rounded-md`}>
            <button 
              onClick={() => setShowEditModal(false)} 
              type='button' 
              className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
                <AiOutlineCloseCircle />
            </button>
            <h1 className='text-blue-500 font-bold text-2xl'>Edit Player</h1>
            <form className='flex flex-col gap-3 p-3' onSubmit={handleEditSubmit}>
              <div className='flex flex-col'>
                <label htmlFor="username" className='text-lg font-semibold'>Username:</label>
                <input 
                  placeholder={username}
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  className='outline-none border-2 focus:border-gray-400 rounded-md text-center text-black p-1' 
                  id='username' type="text" />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='text-lg font-semibold'>Password:</label>
                <input
                  placeholder={password}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className='outline-none border-2 focus:border-gray-400 rounded-md text-center text-black p-1' 
                  id='password' type="text" />
              </div>
              { loadingText && <h1 className='text-red-500 text-lg text-center font-bold animate-bounce'>Loading...</h1> }
              <input
                className='p-1 bg-green-400 text-white font-semibold text-lg rounded-md cursor-pointer hover:bg-green-500 duration-150' 
                type="submit" 
                value='SUBMIT' />
            </form>
        </div>
      </div>
    </>
  )
}

export default EditUserButton