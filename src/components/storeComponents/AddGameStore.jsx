import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function AddGameStore({ setDisplayAdd, setSuccessSubmit }) {

    const [itemId, setItemId] = useState(0)
    const [bundleQuantity, setBundleQuantity] = useState(0)
    const [priceCoin, setPriceCoin] = useState(0)
    const [time, setTime] = useState('')

    const handleSubmitBundle = async (e) => {
        e.preventDefault()
        const { error } = await supabase
        .from('game_store')
        .insert({ 
          item_id: itemId,
          bundle_quantity: bundleQuantity,
          price_coin: priceCoin,
          added_timestamp: time
        })
        error && console.error(error)
        setSuccessSubmit(true)
        setDisplayAdd(false)
        setItemId(0)
        setBundleQuantity(0)
        setPriceCoin(0)
        setTime('')
    }

  return (
    <>
        <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>    
            <div className='flex flex-col relative items-center gap-3 p-5 bg-white shadow-2xl rounded-md'>  
                <h1 className='text-blue-500 text-2xl font-bold'>Add Bundle</h1>
                <button 
                    onClick={() => setDisplayAdd(false)} 
                    type='button' 
                    className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'
                    >
                        <AiOutlineCloseCircle />
                </button> 
                <form onSubmit={handleSubmitBundle} className='flex flex-col items-center p-3 gap-3'>
                    <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="itemId">Item Id:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                        type="number" 
                        id='itemName' 
                        value={itemId}
                        onChange={e => setItemId(e.target.value)}
                        required /> 
                    </div>
                    <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="bundleQuantity">Bundle Quantity:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                        name="bundleQuantity" 
                        id="bundleQuantity" 
                        type='number'
                        value={bundleQuantity}
                        onChange={e => setBundleQuantity(e.target.value)}
                        required />
                    </div>
                    <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="coinPrice">Coin Price:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                        type="number" 
                        id='coinPrice'
                        value={priceCoin}
                        onChange={e => setPriceCoin(e.target.value)} 
                        required />
                    </div>
                    <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="time">Added Timestamp:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                        type="datetime-local" 
                        id='time'
                        value={time}
                        onChange={e => setTime(e.target.value)} 
                        required />
                    </div>
                    <input 
                    type="submit" 
                    value='Submit Item' 
                    className='mt-2 cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
                </form>
            </div>    
        </div>
    </>
  )
}

export default AddGameStore