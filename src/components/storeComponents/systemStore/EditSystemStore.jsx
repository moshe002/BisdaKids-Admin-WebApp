import React, { useState, useContext } from 'react'
import { supabase } from '../../../supabase-config'
import { AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { DarkModeContext } from '../../../context/themeContext'

import SuccessEditModal from '../../SuccessEditModal'
import ErrorModal from '../../ErrorModal'

function EditSystemStore({ systemStoreId, offerQuantity, price, setChecker }) {

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
          setSuccessEdit={setSuccessEdit} 
          systemStoreId={systemStoreId}
          offerQuantity={offerQuantity}
          price={price} /> 
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

function EditModal({ 
  setShowEditModal, 
  setSuccessEdit, 
  systemStoreId,
  offerQuantity,
  price
}) {

  const { darkMode } = useContext(DarkModeContext)

  const [newOfferQuantity, setNewOfferQuantity] = useState(offerQuantity)
  const [newPrice, setNewPrice] = useState(price)
  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoadingText(true)
    // console.log(newItemName)
    // console.log(newItemDesc)
    // console.log(newItemPrice)
    const { error } = await supabase
    .from('system_store')
    .update({ 
        offer_quantity: newOfferQuantity, 
        price: newPrice 
      })
    .eq('store_offer_id', systemStoreId)
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
      <div className={`flex flex-col relative items-center gap-5 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} shadow-2xl rounded-md`}>
          <button 
            onClick={() => setShowEditModal(false)} 
            type='button' 
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
              <AiOutlineCloseCircle />
          </button>
          <h1 className='text-green-500 font-bold text-2xl'>Edit Store Offer {systemStoreId}</h1>
          <form className='flex flex-col gap-3 py-3 px-14' onSubmit={handleEditSubmit}>
            <div className='flex flex-col'>
              <label htmlFor="offerQuan" className='text-lg font-semibold text-center'>Offer Quantity:</label>
              <input 
                placeholder={offerQuantity}
                value={newOfferQuantity}
                onChange={e => setNewOfferQuantity(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center text-black p-1' 
                id='offerQuan' type="number" />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="price" className='text-lg font-semibold text-center'>Price:</label>
              <input 
                placeholder={price}
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className='outline-none border-2 focus:border-gray-400 rounded-md text-center text-black p-1' 
                id='price' type="number" />
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

export default EditSystemStore