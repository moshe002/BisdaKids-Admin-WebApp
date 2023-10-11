import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function AddDailyTask({ setAddTask, setSuccessSubmit }) {

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [reward, setReward] = useState('')
    const [goal, setGoal] = useState(0)
    const [rewardQuantity, setRewardQuantity] = useState(0)

    const handleSentTask = async (e) => {
        e.preventDefault()
        const { error } = await supabase
        .from('daily_task')
        .insert({ 
          task_title: taskTitle,
          task_desc: taskDesc,
          reward: reward,
          goal: goal,
          reward_quantity: rewardQuantity 
        })
        error && console.error(error)
        setSuccessSubmit(true)
        setAddTask(false)
        setTaskTitle('')
        setTaskDesc('')
        setGoal(0)
        setReward('')
        setRewardQuantity(0)
    }

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col w-2/6 relative items-center gap-3 p-5 bg-white shadow-2xl rounded-md overflow-y-auto max-h-full'>
            <h1 className='text-orange-400 font-bold text-2xl'>Add Daily Task</h1>
            <button 
                onClick={() => setAddTask(false)} 
                type='button' 
                className='absolute top-4 right-3 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
                <AiOutlineCloseCircle />
            </button> 
            <form onSubmit={handleSentTask} className='flex flex-col items-center p-5 gap-5'>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="taskTitle">Task Title:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="text" 
                    id='taskTitle' 
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="taskDesc">Task Description:</label>
                    <textarea 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                    name="taskDesc" 
                    id="taskDesc" 
                    cols="23" 
                    rows="5"
                    value={taskDesc}
                    onChange={e => setTaskDesc(e.target.value)}
                    required >
                    </textarea>
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="reward">Reward:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="text" 
                    id='reward'
                    value={reward}
                    onChange={e => setReward(e.target.value)} 
                    required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="goal">Goal:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='goal'
                    value={goal}
                    onChange={e => setGoal(e.target.value)} 
                    required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="rewardQuantity">Reward Quantity:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='rewardQuantity'
                    value={rewardQuantity}
                    onChange={e => setRewardQuantity(e.target.value)} 
                    required />
                </div>
                <input 
                    type="submit" 
                    value='Submit Task' 
                    className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
            </form>
        </div>
    </div>
  )
}

export default AddDailyTask