import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase-config'
import { IoMdAdd } from 'react-icons/io'

import Loading from '../Loading'
import DeleteTaskButton from './DeleteTaskButton'
import EditTaskButton from './EditTaskButton'

function TableDailyTask({ checker, setChecker, setAddTask }) {

    const [dailyTask, setDailyTask] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchTasks()
    }, [checker])

    const fetchTasks = async () => {
        setLoading(true)
        const { data, error } = await supabase
        .from('daily_task')
        .select()
        if(data){
            //console.log(data)
            setDailyTask(data)
        } 
        error && console.error(error)
        setChecker(false)
        setLoading(false)
    }

  return (
    <div className='flex flex-col items-center gap-5 mt-3'>
        <div className='flex gap-3'>
            <h1 className='font-bold text-2xl text-orange-400'>Daily Tasks</h1>
            <button onClick={() => setAddTask(true)} title='add button' className='hover:bg-green-500 bg-green-400 rounded-full p-1' type='button'>
                <p className='text-2xl'>
                    <IoMdAdd />
                </p>
            </button>
        </div>
        { 
            loading
            ?
            <Loading />
            :
            <>
                <table className='table-auto'>
                    <tbody>
                    <tr>
                        <th className='p-3 border-2'>Task Title</th>
                        <th className='p-3 border-2'>Task Description</th>
                        <th className='p-3 border-2'>Reward</th>
                        <th className='p-3 border-2'>Reward Quantity</th>
                        <th className='p-3 border-2'>Goal</th>
                        <th className='p-3 border-2'>Action</th>
                    </tr>
                    {
                        dailyTask.map((data, index) => {
                            return(
                                <tr key={index} className='text-center'>
                                    <td className='p-3 border-2'>{data.task_title}</td>
                                    <td className='p-3 border-2'>{data.task_desc}</td>
                                    <td className='p-3 border-2'>{data.reward}</td>
                                    <td className='p-3 border-2 text-center'>{data.reward_quantity}</td>
                                    <td className='p-3 border-2 text-center'>{data.goal}</td>
                                    <td>
                                        <div className='p-2'>
                                            <EditTaskButton 
                                                setChecker={setChecker}
                                                taskId={data.task_id} 
                                                taskTitle={data.task_title}
                                                taskDesc={data.task_desc}
                                                reward={data.reward}
                                                goal={data.goal}
                                                rewardQuantity={data.reward_quantity} />
                                            <DeleteTaskButton 
                                                taskTitle={data.task_title} 
                                                taskId={data.task_id} 
                                                setChecker={setChecker} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </>
        }  
    </div>
  )
}

export default TableDailyTask