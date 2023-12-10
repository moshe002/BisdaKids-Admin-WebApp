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
  const [gameUsername, setGameUsername] = useState([])
  const [gameItemName, setGameItemName] = useState([])
  const [coinPrice, setCoinPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    fetchGameTransactions()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

    return () => clearInterval(intervalId);
  }, [])
  
  const fetchGameTransactions = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('game_transactions')
    .select()
    if(data) {
        setGameTransac(data)
        //data.forEach(element => fetchCoinPrice(element.bundle_id))
    }
    error && console.error(error)
    await fetchUsername()
    await fetchItemName()
    await fetchCoinPrice()
    await fetchQuantity()
    setLoading(false)
  }

  const fetchUsername = async () => {
    const { data, error } = await supabase
    .from('game_transactions')
    .select(`
      user_id,
      user_account (
        user_name
      )
    `)
    if(data){
      //console.log(data)
      setGameUsername(data)
    }
    error && console.error(error)
  }

  const fetchItemName = async () => {
    const { data, error } = await supabase
    .from('game_transactions')
    .select(`
      bundle_id,
      game_store (
        item_id, 
          items (
            item_name
          )
      )
    `)
    if(data){
      //console.log(data)
      setGameItemName(data)
    }
    error && console.error(error)
  }
  
  const fetchCoinPrice = async () => {
    const { data, error } = await supabase
    .from('game_transactions')
    .select(`
      bundle_id,
      game_store (
        price_coin
      )
    `)
    if(data){
      //console.log(data)
      setCoinPrice(data)
    }
    error && console.error(error)
  }

  const fetchQuantity = async () => {
    const { data, error } = await supabase
    .from('game_transactions')
    .select(`
      bundle_id,
      game_store (
        bundle_quantity
      )
    `)
    if(data){
      //console.log(data)
      setQuantity(data)
    }
    error && console.error(error)
  }

  const totalProfit = () => {
    let totalProfit = 0
    for(let price of coinPrice){
      let value = price.game_store.price_coin
      totalProfit += value
    }
    return totalProfit
  }

  const formattedDateTime = currentDateTime.toLocaleString();

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
        <div ref={tableRef}>
        <h2 className='hidden text-center'>Game Transactions</h2>
        <h4 className='hidden text-center'>Date and Time on export: {formattedDateTime}</h4>
        <table className='table-auto text-center'>
          <thead>
            <tr>
              <th className='p-3 border-2'>Transaction ID</th>
              <th className='p-3 border-2'>Username</th>
              <th className='p-3 border-2'>Item Name</th>
              <th className='p-3 border-2'>Quantity</th>
              <th className='p-3 border-2'>Timestamp</th>
              <th className='p-3 border-2'>Coin Price</th>
            </tr>
          </thead>
          <tbody>
            {
              gameTransac.map((data, index) => {
                const dataDate = parseISO(data.timestamp)
                const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                return (
                  <tr className='text-center' key={index}>
                    <td className='p-3 border-2'>{data.transaction_id}</td>
                    <td className='p-3 border-2'>{gameUsername[index].user_account.user_name}</td>
                    <td className='p-3 border-2'>{gameItemName[index].game_store.items.item_name}</td>
                    <td className='p-3 border-2'>{quantity[index].game_store.bundle_quantity}</td>
                    <td className='p-3 border-2'>{formattedDate}</td>
                    <td className='p-3 border-2'>{coinPrice[index].game_store.price_coin}</td>
                  </tr>
                )
              })
            }
            <tr>
              <td className='text-center font-bold p-3 border-2' colSpan={5}>Total Profit:</td>
              <td className='text-center font-bold p-3 border-2'>{totalProfit()}</td>
            </tr>
          </tbody>
        </table>
        </div>
      }
    </div>
  )
}

export default GameTransac