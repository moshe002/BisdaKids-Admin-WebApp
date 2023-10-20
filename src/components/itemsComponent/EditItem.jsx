import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

import SuccessEditModal from '../SuccessEditModal'
import ErrorModal from '../ErrorModal'

function EditItem({ itemId, itemName, itemDesc, itemPrice, setChecker }) {

  const [showEditModal, setShowEditModal] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)

  const handleClick = () => setShowEditModal(true)

  return (
    <>
      { 
        showEditModal 
        && 
        <EditModal 
          setShowEditModal={setShowEditModal}
          itemId={itemId}
          itemName={itemName}
          itemDesc={itemDesc}
          itemPrice={itemPrice}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEditModal setSuccessEdit={setSuccessEdit} setChecker={setChecker} /> }
      <button onClick={handleClick} className='p-3 bg-violet-400 rounded-md mr-1'>
          <p className='text-xl'>
              <AiFillEdit />
          </p>
      </button>
    </>
  )
}

function EditModal({ setShowEditModal, itemId, itemName, itemDesc, itemPrice, setSuccessEdit }) {

  const [newItemName, setNewItemName] = useState(itemName)
  const [newItemDesc, setNewItemDesc] = useState(itemDesc)
  const [newItemPrice, setNewItemPrice] = useState(itemPrice)
  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoadingText(true)
    // console.log(newItemName)
    // console.log(newItemDesc)
    // console.log(newItemPrice)
    const { error } = await supabase
    .from('items')
    .update({ 
        item_name: newItemName, 
        item_desc: newItemDesc, 
        item_price: newItemPrice 
      })
    .eq('item_id', itemId)
    if(error){
      setDisplayError(true)
      console.error(error)
    }
    setLoadingText(false)
    setSuccessEdit(true)
    setShowEditModal(false)
  }

  return(
    <>
    { displayError && <ErrorModal displayError={setDisplayError} errorText={'Error Editing'} /> }
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col relative items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
        <button 
          onClick={() => setShowEditModal(false)} 
          type='button' 
          className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
            <AiOutlineCloseCircle />
        </button>
        <h1 className='text-green-500 font-bold text-2xl'>Edit Item</h1>
        <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
          <div className='flex flex-col'>
            <label htmlFor="itemName" className='text-lg font-semibold text-center'>Item Name:</label>
            <input 
              placeholder={itemName}
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
              id='itemName' type="text" />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="itemDesc" className='text-lg font-semibold text-center'>Item Description:</label>
            <textarea 
              className='rounded-md p-1 text-center outline-none border-2 focus:border-gray-400 duration-150'
              name="itemDesc" 
              id="itemDesc" 
              cols="23" 
              rows="5"
              placeholder={itemDesc}
              value={newItemDesc}
              onChange={e => setNewItemDesc(e.target.value)} >
            </textarea>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="itemPrice" className='text-lg font-semibold text-center'>Item Price:</label>
            <input
              placeholder={itemPrice}
              //value={newCoinQuantity}
              onChange={e => setNewItemPrice(e.target.value)}
              className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
              id='itemPrice' type="number" />
          </div>
          { loadingText && <h1 className='text-red-500 text-lg text-center font-bold animate-bounce'>Loading...</h1> }
          <input
            className='p-1 bg-green-400 text-white font-semibold text-lg rounded-md cursor-pointer hover:bg-green-500 duration-150' 
            type="submit" 
            value='SUBMIT' />
        </form>
      </div>
    </div>
    </>
  )
}

export default EditItem