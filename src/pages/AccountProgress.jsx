import React, { useState, useEffect, useContext, useRef } from 'react'
import { supabase } from '../supabase-config'
import { DarkModeContext } from '../context/themeContext'
import { format, parseISO } from 'date-fns'

import Loading from '../components/Loading'
import DownloadAsFile from '../components/DownloadAsFile'

function AccountProgress() {

    const tableRef = useRef(null)

    const { darkMode } = useContext(DarkModeContext)

    const [dataAccountProgress, setDataAccountProgress] = useState([])
    const [userAccount, setUserAccount] = useState([])
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
        await fetchUsername()
        setLoading(false)
    }

    const fetchUsername = async () => {
        const { data, error } = await supabase
        .from('account_progress')
        .select(`
            user_id,
            user_account (
                user_name
            )
        `)
        if(data) {
            //console.log(data)
            setUserAccount(data)
        }
        error && console.error(error)
    }

  return (
    <div className={`flex flex-col h-full items-center p-3 gap-5 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'} overflow-auto`}>
        <div className='flex justify-center items-center gap-3 mt-8'>
            <h1 className='text-2xl text-center font-bold text-green-500'>Account Progress</h1>
            <DownloadAsFile tableData={tableRef.current} text={'Account Progress'}/>
        </div>
        {
            loading
            ?
            <Loading />
            :
            <table className='table-auto' ref={tableRef}>
                <tbody>
                    <tr>
                        <th className='p-3 border-2'>Username</th>
                        <th className='p-3 border-2'>Level ID</th>
                        <th className='p-3 border-2'>Highscore (5000)</th>
                        <th className='p-3 border-2'>Timestamp</th>
                    </tr>
                    {
                        // map here the data from account_progress table
                        dataAccountProgress.map((data, index) => {
                            const dataDate = parseISO(data.timestamp)
                            const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                            return (
                                <tr className='text-center' key={index}>
                                    <td className='p-3 border-2'>{userAccount[index].user_account.user_name}</td>
                                    <td className='p-3 border-2'>Level {data.level_id}</td>
                                    <td className='p-3 border-2'>{data.highscore}</td>
                                    <td className='p-3 border-2'>{formattedDate}</td>
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