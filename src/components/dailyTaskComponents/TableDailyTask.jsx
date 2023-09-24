import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase-config'

import Loading from '../Loading'
import DeleteTaskButton from './DeleteTaskButton'
import EditTaskButton from './EditTaskButton'

function TableDailyTask({ checker, setChecker }) {

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
        <h1 className='font-bold text-2xl text-orange-400'>Daily Tasks</h1>
        { 
            loading
            ?
            <Loading />
            :
                <>
                    <table className='table-auto'>
                        <tbody>
                        <tr>
                            <th></th>
                            <th className='p-3 border-2'>Task Title</th>
                            <th className='p-3 border-2'>Task Description</th>
                            <th className='p-3 border-2'>Coin Quantity</th>
                            <th></th>
                        </tr>
                        {
                            dailyTask.map((data, index) => {
                                return(
                                    <tr key={index}>
                                        <td>
                                            <EditTaskButton 
                                                setChecker={setChecker}
                                                taskId={data.task_id} 
                                                taskTitle={data.task_title}
                                                taskDesc={data.task_desc}
                                                coinQuantity={data.coin_quantity} />
                                        </td>
                                        <td className='p-3 border-2'>{data.task_title}</td>
                                        <td className='p-3 border-2'>{data.task_desc}</td>
                                        <td className='p-3 border-2'>{data.coin_quantity}</td>
                                        <td>
                                            <DeleteTaskButton taskId={data.task_id} setChecker={setChecker} />
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