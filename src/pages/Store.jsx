import React from 'react'

function Store() {
  return (
    <div className='flex flex-col items-center py-5'>
      <div className='mt-5 p-3'>
        <h1 className='text-2xl font-bold text-center text-green-500'>Add Item</h1>
        <form className='flex flex-col items-center p-5 gap-5'>
          <div className='flex flex-col text-center'>
            <label className='text-lg font-semibold' htmlFor="itemName">Item Name</label>
            <input 
              className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
              type="text" 
              id='itemName' 
              
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
              required />
          </div>
          <input 
            type="submit" 
            value='Submit Item' 
            className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
        </form>
      </div>
    </div>
  )
}

export default Store