import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function EditTaskButton({ taskId, taskTitle, taskDesc, coinQuantity, setChecker }) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)

  const handleClick = () => setShowEditModal(true)

  return (
    <>
      { 
        showEditModal 
        && 
        <EditModal 
          setShowEditModal={setShowEditModal}
          taskId={taskId}
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          coinQuantity={coinQuantity}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEdit setSuccessEdit={setSuccessEdit} setChecker={setChecker} /> }
      <button onClick={handleClick} className='p-3 bg-violet-400 rounded-md mr-1'>
          <p className='text-xl'>
              <AiFillEdit />
          </p>
      </button>
    </>
  )
}

function EditModal({ setShowEditModal, taskId, taskTitle, taskDesc, coinQuantity, setSuccessEdit }) {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [newCoinQuantity, setNewCointQuantity] = useState(0)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    // console.log(newTaskTitle)
    // console.log(newTaskDesc)
    // console.log(newCoinQuantity)
    const { error } = await supabase
    .from('daily_task')
    .update({ task_title: newTaskTitle, task_desc: newTaskDesc, coin_quantity: newCoinQuantity })
    .eq('task_id', taskId)
    error && console.error(error)
    setSuccessEdit(true)
    setShowEditModal(false)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col relative items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <button 
            onClick={() => setShowEditModal(false)} 
            type='button' 
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
              <AiOutlineCloseCircle />
          </button>
          <h1 className='text-violet-400 font-bold text-2xl'>Edit Daily Tasks</h1>
          <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="taskTitle" className='text-lg font-semibold text-center'>Task Title:</label>
              <input 
                placeholder={taskTitle}
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='taskTitle' type="text" required />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="taskDesc" className='text-lg font-semibold text-center'>Task Description:</label>
              <textarea 
                className='rounded-md p-1 text-center outline-none border-2 focus:border-gray-400 duration-150'
                name="taskDesc" 
                id="taskDesc" 
                cols="23" 
                rows="5"
                placeholder={taskDesc}
                value={newTaskDesc}
                onChange={e =>setNewTaskDesc(e.target.value)}
                required >
              </textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="coinQuantity" className='text-lg font-semibold text-center'>Coin Quantity:</label>
              <input
                placeholder={coinQuantity}
                //value={newCoinQuantity}
                onChange={e => setNewCointQuantity(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='coinQuantity' type="number" required />
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

function SuccessEdit({ setSuccessEdit, setChecker }) {

  const handleClick = () => {
    setSuccessEdit(false)
    setChecker(true)
  }

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

export default EditTaskButton