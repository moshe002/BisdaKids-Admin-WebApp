import React, { useState, useContext } from 'react'
import { DarkModeContext } from '../context/themeContext'
//import Button from '@mui/material/Button';

import AddDailyTask from '../components/dailyTaskComponents/AddDailyTask'
import ViewDailyTask from '../components/dailyTaskComponents/TableDailyTask'
import SuccessAddModal from '../components/SuccessAddModal'

function DailyTasks() {

  const { darkMode } = useContext(DarkModeContext)

  const [successSubmit, setSuccessSubmit] = useState(false)
  const [checker, setChecker] = useState(false)
  const [addTask, setAddTask] = useState(false)

  return (
    <div className={`flex flex-col h-screen items-center py-5 gap-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'}`}>
      { successSubmit && <SuccessAddModal setAddTask={setAddTask} setSuccessSubmit={setSuccessSubmit} setChecker={setChecker} /> }
      {
        addTask
        &&
        <AddDailyTask
          setSuccessSubmit={setSuccessSubmit} 
          setAddTask={setAddTask} />
      }
      <ViewDailyTask checker={checker} setChecker={setChecker} setAddTask={setAddTask} />
      {
        /*
        <div className='flex flex-row items-center gap-3 border-2'>
          <Button onClick={handleAddTask} title='Add task' variant='contained'>Add Daily Task</Button>
        </div>
        */
      }
    </div>
  )
}

export default DailyTasks