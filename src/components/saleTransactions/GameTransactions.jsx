import React, { useState, useEffect, useContext, useRef } from 'react'
import { supabase } from '../../supabase-config'
import { DarkModeContext } from '../../context/themeContext'
import { format, parseISO } from 'date-fns'

import Loading from '../Loading'
import DownloadAsFile from '../DownloadAsFile'

function GameTransac() {

  const tableRef = useRef(null)

  const { darkMode } = useContext(DarkModeContext)

  const [gameTransac, setGameTransac] = useState([])
  const [loading, setLoading] = useState(false)
  const [bundleId, setBundleId] = useState([])

  useEffect(() => {
    fetchGameTransactions()
  }, [])
  
  const fetchGameTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('game_transactions')
    .select()
    if(data) {
        setGameTransac(data)
        data.forEach(element => fetchCoinPrice(element.bundle_id))
    }
    error && console.error(error)
    setLoading(false)
  }

  const fetchCoinPrice = async (bundle_id) => {
    const { data, error } = await supabase
    .from('game_store')
    .select('price_coin')
    .eq('bundle_id', bundle_id)
    if(data){
      //console.log(data)
      setBundleId(data.map(el => el.price_coin))
    }
    error && console.error(error)
  }

  return (
    <div className={`flex flex-col gap-5 items-center p-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'} overflow-auto`}>
      <div className='flex justify-center items-center gap-3 mt-8'>
        <h1 className='font-bold text-2xl text-red-500'>Game Transactions</h1>
        <DownloadAsFile tableData={tableRef.current} text={'Game Transactions'} />
      </div>
      {
        loading
        ?
        <Loading />
        :
        <table className='table-auto' ref={tableRef}>
          <tbody>
            <tr>
              <th className='p-3 border-2'>Transaction ID</th>
              <th className='p-3 border-2'>Bundle ID</th>
              <th className='p-3 border-2'>User ID</th>
              <th className='p-3 border-2'>Coin Price</th>
              <th className='p-3 border-2'>Timestamp</th>
            </tr>
            {
              gameTransac.map((data, index) => {
                const dataDate = parseISO(data.timestamp)
                const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                return (
                  <tr className='text-center' key={index}>
                    <td className='p-3 border-2'>{data.transaction_id}</td>
                    <td className='p-3 border-2'>{data.bundle_id}</td>
                    <td className='p-3 border-2'>{data.user_id}</td>
                    <td className='p-3 border-2'>{bundleId}</td>
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

export default GameTransac