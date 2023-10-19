import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

import SuccessEditModal from '../SuccessEditModal'
import ErrorEdit from '../ErrorEdit'

function EditTaskButton({ 
  taskId, 
  taskTitle, 
  taskDesc, 
  reward,
  goal,
  rewardQuantity, 
  setChecker 
}) {

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
          reward={reward}
          goal={goal}
          rewardQuantity={rewardQuantity}
          setSuccessEdit={setSuccessEdit} /> 
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

function EditModal({ 
  setShowEditModal, 
  taskId, 
  taskTitle, 
  taskDesc, 
  reward,
  goal,
  rewardQuantity, 
  setSuccessEdit }) {

  const [newTaskTitle, setNewTaskTitle] = useState(taskTitle)
  const [newTaskDesc, setNewTaskDesc] = useState(taskDesc)
  const [newReward, setNewReward] = useState(reward)
  const [newGoal, setNewGoal] = useState(goal)
  const [newRewardQuantity, setNewRewardQuantity] = useState(rewardQuantity)
  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoadingText(true)
    // console.log(newTaskTitle)
    // console.log(newTaskDesc)
    // console.log(newCoinQuantity)
    const { error } = await supabase
    .from('daily_task')
    .update({ 
      task_title: newTaskTitle, 
      task_desc: newTaskDesc, 
      reward: newReward,
      goal: newGoal,
      reward_quantity: newRewardQuantity 
    })
    .eq('task_id', taskId)
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
    { displayError && <ErrorEdit displayError={setDisplayError} /> }
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col relative items-center gap-5 p-5 bg-white shadow-2xl rounded-md overflow-y-auto overflow-x-hidden max-h-full'>
          <button 
            onClick={() => setShowEditModal(false)} 
            type='button' 
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
              <AiOutlineCloseCircle />
          </button>
          <h1 className='text-orange-400 font-bold text-2xl'>Edit Daily Tasks</h1>
          <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="taskTitle" className='text-lg font-semibold text-center'>Task Title:</label>
              <input 
                placeholder={taskTitle}
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='taskTitle' type="text" />
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
                onChange={e =>setNewTaskDesc(e.target.value)} >
              </textarea>
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="reward">Reward:</label>
              <input 
                className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                type="text" 
                id='reward'
                placeholder={reward}
                value={newReward}
                onChange={e => setNewReward(e.target.value)} />
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="goal">Goal:</label>
              <input 
                className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                type="number" 
                id='goal'
                placeholder={goal}
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)} />
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="rewardQuantity">Reward Quantity:</label>
              <input 
                className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                type="number" 
                id='rewardQuantity'
                placeholder={rewardQuantity}
                value={newRewardQuantity}
                onChange={e => setNewRewardQuantity(e.target.value)} />
            </div>
            { loadingText && <h1 className='text-red-500 text-lg font-bold animate-bounce'>Loading...</h1> }
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

export default EditTaskButton