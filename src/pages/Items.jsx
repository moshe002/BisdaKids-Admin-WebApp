import React, { useState } from 'react'
import { supabase } from '../supabase-config'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import ViewItems from '../components/itemsComponent/ViewItems'

function Items() {

  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [successModal, setSuccessModal] = useState(false)
  const [checker, setChecker] = useState(false)

  const handleSubmitItem = async (e) => {
    e.preventDefault()
    setChecker(true)
    const { error } = await supabase
    .from('items')
    .insert({ 
      item_name: itemName,
      item_desc: itemDesc,
      item_price: itemPrice,
    })
    error && console.error(error)
    setSuccessModal(true)
    setItemName('')
    setItemDesc('')
    setItemPrice(0)
  }

  return (
    <div className='flex flex-col items-center py-5'>
      {successModal && <SuccessSubmit setSuccessModal={setSuccessModal} /> }
      <div className='mt-5 p-3'>
        <h1 className='text-2xl font-bold text-center text-green-500'>Add Item</h1>
        <form onSubmit={handleSubmitItem} className='flex flex-col items-center p-5 gap-5'>
          <div className='flex flex-col text-center'>
            <label className='text-lg font-semibold' htmlFor="itemName">Item Name</label>
            <input 
              className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
              type="text" 
              id='itemName' 
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              required />
          </div>
          <div className='flex flex-col text-center'>
            <label className='text-lg font-semibold' htmlFor="itemDesc">Item Description</label>
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
            <label className='text-lg font-semibold' htmlFor="itemPrice">Item Price</label>
            <input 
              className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
              type="number" 
              id='itemPrice'
              value={itemPrice}
              onChange={e => setItemPrice(e.target.value)} 
              required />
          </div>
          <input 
            type="submit" 
            value='Submit Item' 
            className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
        </form>
      </div>
      <ViewItems checker={checker} setChecker={setChecker} />
    </div>
  )
}

function SuccessSubmit({ setSuccessModal }) {

  const handleClose = () => setSuccessModal(false)
  
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-4xl font-bold text-green-500'>Submitted!</h1>
            <button
              className='p-1 hover:bg-red-500 rounded-full duration-150' 
              type='button'
              onClick={handleClose}>
                <p className='text-4xl'>
                  <AiOutlineCloseCircle />
                </p>
            </button>
        </div>
    </div>
  )
}

export default Items