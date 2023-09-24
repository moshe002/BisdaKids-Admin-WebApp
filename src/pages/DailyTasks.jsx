import React, { useState } from 'react'
import { supabase } from '../supabase-config'

import SuccessSubmit from '../components/dailyTaskComponents/SuccessSubmit'
import ViewDailyTask from '../components/dailyTaskComponents/TableDailyTask'

function DailyTasks() {

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [coinQuantity, setCoinQuantity] = useState(0)
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [checker, setChecker] = useState(false)

  const handleSentTask = (e) => {
    e.preventDefault()
    insertDailyTask()
  }

  const insertDailyTask = async () => {    
    const { error } = await supabase
    .from('daily_task')
    .insert({ 
      task_title: taskTitle,
      task_desc: taskDesc,
      coin_quantity: coinQuantity,
    })
    error && console.error(error)
    setSuccessSubmit(true)
    setTaskTitle('')
    setTaskDesc('')
    setCoinQuantity(0)
  }

  return (
    <div className='flex flex-col items-center py-5'>
      { successSubmit && <SuccessSubmit setSuccessSubmit={setSuccessSubmit} setChecker={setChecker} /> }
      <div className='flex flex-col gap-5 p-3'>
        <h1 className='text-2xl text-center font-bold text-orange-400'>Add Daily Tasks</h1>
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
      <ViewDailyTask checker={checker} setChecker={setChecker} />
    </div>
  )
}

export default DailyTasks