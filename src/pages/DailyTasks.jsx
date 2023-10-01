import React, { useState } from 'react'
import { supabase } from '../supabase-config'
import { GrAddCircle } from 'react-icons/gr'

import AddDailyTask from '../components/dailyTaskComponents/AddDailyTask'
import SuccessSubmit from '../components/dailyTaskComponents/SuccessSubmit'
import ViewDailyTask from '../components/dailyTaskComponents/TableDailyTask'

function DailyTasks() {

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [coinQuantity, setCoinQuantity] = useState(0)
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [checker, setChecker] = useState(false)
  const [addTask, setAddTask] = useState(false)

  const handleAddTask = () => {
    setAddTask(true)
  }

  const handleSentTask = (e) => {
    e.preventDefault()
    setAddTask(false)
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
      { successSubmit && <SuccessSubmit setAddTask={setAddTask} setSuccessSubmit={setSuccessSubmit} setChecker={setChecker} /> }
      <div className='flex flex-row items-center gap-3'>
        <h1 className='text-2xl text-center font-bold text-orange-400'>Add Daily Tasks</h1>
        <button onClick={handleAddTask} title='Add task' className='bg-green-300 hover:bg-green-500 p-1 rounded-full duration-150'>
          <p className='text-2xl'>
            <GrAddCircle />
          </p>
        </button>
      </div>
      {
        addTask
        &&
        <AddDailyTask 
          setTaskTitle={setTaskTitle}
          setTaskDesc={setTaskDesc}
          setCoinQuantity={setCoinQuantity}
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          coinQuantity={coinQuantity}
          handleSentTask={handleSentTask}
          setAddTask={setAddTask} />
      }
      <ViewDailyTask checker={checker} setChecker={setChecker} />
    </div>
  )
}

export default DailyTasks