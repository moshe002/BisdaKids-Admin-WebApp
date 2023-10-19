import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

import SuccessDeleteModal from '../SuccessDeleteModal'

function DeleteTaskButton({ taskId, setChecker, taskTitle }) {

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteSuccess, setSuccessDelete] = useState(false)

  const openDeleteModal = () => setDeleteModal(true)

  return (
    <>
      { 
        deleteModal 
        && 
        <DeleteModal 
          taskId={taskId}
          taskTitle={taskTitle}
          setDeleteModal={setDeleteModal}
          setSuccessDelete={setSuccessDelete} /> 
      }
      { deleteSuccess && <SuccessDeleteModal setDeleteSuccess={setSuccessDelete} setChecker={setChecker} /> }
      <button onClick={openDeleteModal} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'> 
            <AiFillDelete />
          </p>
      </button>
    </>
  )
}

function DeleteModal({ taskId, setDeleteModal, setSuccessDelete, taskTitle }) {

  const [loadingText, setLoadingText] = useState(false)

  const deletePost = async () => {
      setLoadingText(true)
      const { error } = await supabase
      .from('daily_task')
      .delete()
      .eq('task_id', taskId)
      error && console.error(error)
      setLoadingText(false)
      setDeleteModal(false)
      setSuccessDelete(true)
  }

return (
    <>
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <h1 className='text-3xl font-semibold text-green-500'>Delete {taskTitle}?</h1>
          <div className='flex flex-row gap-5'>
            <button onClick={deletePost} title='yes please uwu' type='button'>
              <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
                  <AiOutlineCheckCircle />
              </p>
            </button>
            <button onClick={() => setDeleteModal(false)} title='no lol' type='button'>
              <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                  <AiOutlineCloseCircle />
              </p>
            </button>
          </div>
          { loadingText && <h1 className='text-red-500 text-lg font-bold animate-bounce'>Loading...</h1> }
        </div>
      </div>
    </>
  )
}

export default DeleteTaskButton