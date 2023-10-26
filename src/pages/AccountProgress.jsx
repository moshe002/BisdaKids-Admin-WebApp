import React, { useState, useEffect, useContext } from 'react'
import { supabase } from '../supabase-config'
import { DarkModeContext } from '../context/themeContext'

import Loading from '../components/Loading'

function AccountProgress() {

    const { darkMode } = useContext(DarkModeContext)

    const [dataAccountProgress, setDataAccountProgress] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAccountProgress()
    }, [])

    const fetchAccountProgress = async () => {
        setLoading(true)
        const { data, error } = await supabase
        .from('account_progress')
        .select()
        if(data) {
            //console.log(data)
            setDataAccountProgress(data)
        }
        error && console.error(error)
        setLoading(false)
    }

  return (
    <div className={`flex flex-col h-screen items-center p-3 gap-5 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'}`}>
        <h1 className='text-2xl text-center font-bold text-green-500 mt-8'>Account Progress</h1>
        {
            loading
            ?
            <Loading />
            :
            <table className='table-auto'>
                <tbody>
                    <tr>
                        <th className='p-3 border-2'>User ID</th>
                        <th className='p-3 border-2'>Level ID</th>
                        <th className='p-3 border-2'>Highscore</th>
                        <th className='p-3 border-2'>Timestamp</th>
                    </tr>
                    {
                        // map here the data from account_progress table
                        dataAccountProgress.map((data, index) => {
                            return (
                                <tr className='text-center' key={index}>
                                    <td className='p-3 border-2'>{data.user_id}</td>
                                    <td className='p-3 border-2'>{data.level_id}</td>
                                    <td className='p-3 border-2'>{data.highscore}</td>
                                    <td className='p-3 border-2'>{data.timestamp}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        }
    </div>
  )
}

export default AccountProgress