import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase-config'

import Loading from '../components/Loading'

function SaleTransac() {

  const [saleTransac, setSaleTransac] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSaleTransactions()
  }, [])
  
  const fetchSaleTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('game_transactions')
    .select()
    if(data) {
      setSaleTransac(data)
    }
    error && console.error(error)
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-5 items-center p-3'>
      <h1 className='font-bold text-2xl text-red-500 mt-8'>Sale Transactions</h1>
      <div className='p-5'>
        {
          loading
          ?
          <Loading />
          :
          <table className='table-auto'>
            <tbody>
              <tr>
                <th className='p-3 border-2'>Transaction ID</th>
                <th className='p-3 border-2'>Bundle ID</th>
                <th className='p-3 border-2'>User ID</th>
                <th className='p-3 border-2'>Timestamp</th>
              </tr>
              {
                saleTransac.map((data, index) => {
                  return (
                    <tr className='text-center' key={index}>
                      <td className='p-3 border-2'>{data.transaction_id}</td>
                      <td className='p-3 border-2'>{data.bundle_id}</td>
                      <td className='p-3 border-2'>{data.user_id}</td>
                      <td className='p-3 border-2'>{data.timestamp}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default SaleTransac