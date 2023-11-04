import React, { useState, useEffect, useContext } from 'react'
import { supabase } from '../../supabase-config'
import { DarkModeContext } from '../../context/themeContext'
import { format, parseISO } from 'date-fns'

import Loading from '../Loading'

function SystemTransac() {

  const { darkMode } = useContext(DarkModeContext)

  const [systenTransac, setSystemTransac] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSystemTransactions()
  }, [])
  
  const fetchSystemTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('system_transactions')
    .select()
    if(data) {
        setSystemTransac(data)
    }
    error && console.error(error)
    setLoading(false)
  }

  return (
    <div className={`flex flex-col gap-5 items-center p-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'} overflow-auto`}>
      <h1 className='font-bold text-2xl text-red-500 mt-8'>System Transactions</h1>
      {
        loading
        ?
        <Loading />
        :
        <table className='table-auto'>
          <tbody>
            <tr>
              <th className='p-3 border-2'>Transaction ID</th>
              <th className='p-3 border-2'>Store Offer ID</th>
              <th className='p-3 border-2'>User ID</th>
              <th className='p-3 border-2'>Timestamp</th>
            </tr>
            {
              systenTransac.map((data, index) => {
                const dataDate = parseISO(data.time_stamp)
                const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                return (
                  <tr className='text-center' key={index}>
                    <td className='p-3 border-2'>{data.sys_transac_id}</td>
                    <td className='p-3 border-2'>{data.store_offer_id}</td>
                    <td className='p-3 border-2'>{data.user_id}</td>
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

export default SystemTransac