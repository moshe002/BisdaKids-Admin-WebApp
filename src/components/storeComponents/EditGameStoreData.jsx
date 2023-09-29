import React, { useState } from 'react'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function EditItem({ bundleID, itemId, bundleQuan, priceCoin, time, setChecker }) {

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
          bundleID={bundleID}
          itemId={itemId}
          bundleQuan={bundleQuan}
          priceCoin={priceCoin}
          time={time}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEdit setSuccessEdit={setSuccessEdit} setChecker={setChecker} /> }
      <button onClick={handleClick} className='p-3 bg-violet-400 rounded-md mr-1'>
          <p className='text-xl'>
              <AiFillEdit />
          </p>
      </button>
    </>
  )
}

function EditModal({ setShowEditModal, bundleID, itemId, bundleQuan, priceCoin, time, setSuccessEdit }) {

  const [newItemId, setNewItemId] = useState(itemId) 
  const [newBundleQuan, setNewBundleQuan] = useState(bundleQuan)
  const [newPriceCoin, setNewPriceCoin] = useState(priceCoin)
  const [newTime, setNewTime] = useState(time)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    // console.log(newItemName)
    // console.log(newItemDesc)
    // console.log(newItemPrice)
    const { error } = await supabase
    .from('game_store')
    .update({ 
        item_id: newItemId,
        bundle_quantity: newBundleQuan, 
        price_coin: newPriceCoin, 
        added_timestamp: newTime 
      })
    .eq('bundle_id', bundleID)
    error && console.error(error)
    setSuccessEdit(true)
    setShowEditModal(false)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col relative items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <button 
            onClick={() => setShowEditModal(false)} 
            type='button' 
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
              <AiOutlineCloseCircle />
          </button>
          <h1 className='text-green-500 font-bold text-2xl'>Edit Bundle ID {bundleID}</h1>
          <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="itemID" className='text-lg font-semibold text-center'>Item ID:</label>
              <input 
                placeholder={itemId}
                value={newItemId}
                onChange={e => setNewItemId(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='itemId' type="number" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="bundleQuan" className='text-lg font-semibold text-center'>Bundle Quantity:</label>
              <input 
                placeholder={bundleQuan}
                value={newBundleQuan}
                onChange={e => setNewBundleQuan(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='bundleQuan' type="number" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="coin_price" className='text-lg font-semibold text-center'>Coin Price:</label>
              <input
                className='rounded-md p-1 text-center outline-none border-2 focus:border-gray-400 duration-150'
                id="coin price" type='number'
                placeholder={priceCoin}
                value={newPriceCoin}
                onChange={e => setNewPriceCoin(e.target.value)} >
              </input>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="time" className='text-lg font-semibold text-center'>Added Timestamp:</label>
              <input
                placeholder={time}
                //value={newCoinQuantity}
                onChange={e => setNewTime(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center p-1' 
                id='time' type="datetime-local" />
            </div>
            <input
              className='p-1 bg-green-400 text-white font-semibold text-lg rounded-md cursor-pointer hover:bg-green-500 duration-150' 
              type="submit" 
              value='SUBMIT' />
          </form>
      </div>
    </div>
  )
}

function SuccessEdit({ setSuccessEdit, setChecker }) {

  const handleClick = () => {
    setSuccessEdit(false)
    setChecker(true)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <h1 className='text-4xl text-green-500 font-semibold'>Edited Successfully!</h1>
          <button onClick={handleClick} title='close me pls' type='button'>
              <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                  <AiOutlineCloseCircle />
              </p>
          </button>
      </div>
    </div>
  )
}

export default EditItem