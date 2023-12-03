import React, { useState, useEffect, useContext, useRef } from 'react'
import { supabase } from '../../supabase-config'
import { DarkModeContext } from '../../context/themeContext'
import { format, parseISO } from 'date-fns'

import Loading from '../Loading'
import DownloadAsFile from '../DownloadAsFile'

function SystemTransac() {

  const tableRef = useRef(null)

  const { darkMode } = useContext(DarkModeContext)

  const [systenTransac, setSystemTransac] = useState([])
  const [username, setUsername] = useState([])
  const [itemName, setItemName] = useState([])
  const [quantity, setQuantity] = useState([])
  const [price, setPrice] = useState([])
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
    await fetchUsername()
    await fetchItemName()
    await fetchQuantity()
    await fetchPrice()
    setLoading(false)
  }

  const fetchUsername = async () => {
    const { data, error } = await supabase
    .from('system_transactions')
    .select(`
      user_id,
      user_account (
        user_name
      )
    `)
    if(data) {
      //console.log(data)
      setUsername(data)
    }
    error && console.error(error)
  }

  const fetchItemName = async () => {
    const { data, error } = await supabase
    .from('system_transactions')
    .select(`
      store_offer_id,
      system_store (
        item_id, 
          items (
            item_name
          )
      )
    `)
    if(data) {
      setItemName(data)
    }
    error && console.error(error)
  }

  const fetchQuantity = async () => {
    const { data, error } = await supabase
    .from('system_transactions')
    .select(`
      store_offer_id,
      system_store (
        offer_quantity
      )
    `)
    if(data) {
      //console.log(data)
      setQuantity(data)
    }
    error && console.error(error)
  }

  const fetchPrice = async () => {
    const { data, error } = await supabase
    .from('system_transactions')
    .select(`
      store_offer_id,
      system_store (
        price
      )
    `)
    if(data) {
      //console.log(data)
      setPrice(data)
    }
    error && console.error(error)
  }

  const totalProfit = () => {
    let totalProfit = 0
    for(let p of price){
      let value = p.system_store.price
      totalProfit += value
    }
    return totalProfit
  }

  return (
    <div className={`flex flex-col gap-5 items-center p-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'} overflow-auto`}>
      <div className='flex justify-center items-center gap-3 mt-8'>
        <h1 className='font-bold text-2xl text-red-500'>System Transactions</h1>
        <DownloadAsFile tableData={tableRef.current} text={'System Transactions'}/>
      </div>
      {
        loading
        ?
        <Loading />
        :
        <table className='table-auto' ref={tableRef}>
          <thead>
            <tr>
              <th className='p-3 border-2'>Transaction ID</th>
              <th className='p-3 border-2'>Username</th>
              <th className='p-3 border-2'>Item Name</th>
              <th className='p-3 border-2'>Quantity</th>
              <th className='p-3 border-2'>Paymongo ID</th>
              <th className='p-3 border-2'>Timestamp</th>
              <th className='p-3 border-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              systenTransac.map((data, index) => {
                const timeStamp = data.timestamp
                const correctedTimestamp = timeStamp.replace(' ', 'T');
                const dataDate = parseISO(correctedTimestamp)
                const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                return (
                  <tr className='text-center' key={index}>
                    <td className='p-3 border-2'>{data.sys_transac_id}</td>
                    <td className='p-3 border-2'>{username[index].user_account.user_name}</td>
                    <td className='p-3 border-2'>{itemName[index].system_store.items.item_name}</td>
                    <td className='p-3 border-2'>{quantity[index].system_store.offer_quantity}</td>
                    <td className='p-3 border-2'>{data.paymongo_id}</td>
                    <td className='p-3 border-2'>{formattedDate}</td>
                    <td className='p-3 border-2'>{price[index].system_store.price}</td>
                  </tr>
                )
              })
            }
            <tr>
              <td className='text-center font-bold p-3 border-2' colSpan={6}>Total Profit:</td>
              <td className='text-center font-bold p-3 border-2'>{totalProfit()}</td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

export default SystemTransac