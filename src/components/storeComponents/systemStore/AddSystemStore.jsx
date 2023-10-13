import React, { useState } from 'react'
import { supabase } from '../../../supabase-config'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function AddSystemStore({ setDisplayAdd, setSuccessSubmit }) {

    const [itemId, setItemId] = useState(0)
    const [offerQuantity, setOfferQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    const handleAddSystemStore = async (e) => {
        e.preventDefault()
        const { error } = await supabase
        .from('system_store')
        .insert({ 
          item_id: itemId,
          offer_quantity: offerQuantity,
          price: price
        })
        error && console.error(error)
        setDisplayAdd(false)
        setSuccessSubmit(true)
        setItemId(0)
        setOfferQuantity(0)
        setPrice(0)
    }

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>    
        <div className='flex flex-col w-96 relative items-center gap-3 p-5 bg-white shadow-2xl rounded-md'>  
            <h1 className='text-blue-500 text-2xl font-bold'>Add to Item Store</h1>
            <button 
                onClick={() => setDisplayAdd(false)} 
                type='button' 
                className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'
                >
                    <AiOutlineCloseCircle />
            </button> 
            <form onSubmit={handleAddSystemStore} className='flex flex-col items-center p-3 gap-3'>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="itemId">Item ID:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                        type="number" 
                        name='itemId'
                        id='itemId' 
                        placeholder={itemId}
                        onChange={e => setItemId(e.target.value)}
                        required /> 
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="offerQuantity">Offer Quantity:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                        name="offerQuantity" 
                        id="offerQuantity" 
                        type='number'
                        placeholder={offerQuantity}
                        onChange={e => setOfferQuantity(e.target.value)}
                        required />
                </div>
                <div className='flex flex-col text-center'>
                    <label className='text-lg font-semibold' htmlFor="price">Price:</label>
                    <input 
                        className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                        type="number" 
                        name='price'
                        id='price'
                        placeholder={price}
                        onChange={e => setPrice(e.target.value)} 
                        required />
                </div>
                <input 
                type="submit" 
                value='Submit Item' 
                className='mt-2 cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
            </form>
        </div>    
    </div>
  )
}

export default AddSystemStore