import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function AddItem({ setDisplayAdd, setSuccessSubmit }) {

    const [itemName, setItemName] = useState('')
    const [itemDesc, setItemDesc] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const [loadingText, setLoadingText] = useState(false)

    const handleSubmitItem = async (e) => {
        e.preventDefault()
        setLoadingText(true)
        const { error } = await supabase
        .from('items')
        .insert({ 
          item_name: itemName,
          item_desc: itemDesc,
          item_price: itemPrice,
        })
        error && console.error(error)
        setLoadingText(false)
        setSuccessSubmit(true)
        setDisplayAdd(false)
        setItemName('')
        setItemDesc('')
        setItemPrice(0)
    }

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>    
        <div className='flex flex-col relative items-center gap-3 p-5 bg-white shadow-2xl rounded-md'>  
            <h1 className='text-2xl font-bold text-center text-green-500'>Add Item</h1> 
            <button 
                onClick={() => setDisplayAdd(false)} 
                type='button' 
                className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
                <AiOutlineCloseCircle />
            </button>
            <form onSubmit={handleSubmitItem} className='flex flex-col items-center p-4 gap-3'>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="itemName">Item Name:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="text" 
                    id='itemName' 
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="itemDesc">Item Description:</label>
                    <textarea 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                    name="itemDesc" 
                    id="itemDesc" 
                    cols="23" 
                    rows="5"
                    value={itemDesc}
                    onChange={e => setItemDesc(e.target.value)}
                    required >
                    </textarea>
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="itemPrice">Item Price:</label>
                    <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='itemPrice'
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)} 
                    required />
                </div>
                { loadingText && <h1 className='text-red-500 text-lg font-bold animate-bounce'>Loading...</h1> }
                <input 
                    type="submit" 
                    value='Submit Item' 
                    className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
            </form>
        </div>    
    </div>
  )
}

export default AddItem