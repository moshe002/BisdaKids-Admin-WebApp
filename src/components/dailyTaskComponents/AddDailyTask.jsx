import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'


function AddDailyTask({ 
    handleSentTask,
    taskTitle,
    taskDesc,
    coinQuantity,
    setTaskTitle,
    setTaskDesc,
    setCoinQuantity,
    setAddTask
}) {
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col relative items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <button 
                onClick={() => setAddTask(false)} 
                type='button' 
                className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
                <AiOutlineCloseCircle />
            </button> 
            <form onSubmit={handleSentTask} className='flex flex-col items-center p-5 gap-5'>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="taskTitle">Task Title</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="text" 
                    id='taskTitle' 
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="taskDesc">Task Description</label>
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
                    <label className='text-lg font-semibold' htmlFor="coinQuantity">Coin Quantity</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='coinQuantity'
                    value={coinQuantity}
                    onChange={e => setCoinQuantity(e.target.value)} 
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