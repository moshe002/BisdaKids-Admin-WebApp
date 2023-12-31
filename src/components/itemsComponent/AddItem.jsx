import React, { useState, useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'
import { DarkModeContext } from '../../context/themeContext'

import ErrorModal from '../ErrorModal'

function AddItem({ setDisplayAdd, setSuccessSubmit }) {

  const { darkMode } = useContext(DarkModeContext)

  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemImage, setItemImage] = useState(null)
  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setItemImage(file)
  }

  const handleSubmitItem = async (e) => {
    e.preventDefault()
    setLoadingText(true)

    try {
      let itemImageURL = ''

      if (itemImage) {
        // Upload the image to the storage bucket with the correct content type
        const { data, error } = await supabase.storage
          .from('item_pics/items')
          .upload(itemImage.name, itemImage, {
            contentType: itemImage.type, // Set content type to image type
          })

        if (error) {
          throw error
        }

        // Get the URL of the uploaded image
        itemImageURL = `https://nsnoztviefjxvptztmnj.supabase.co/storage/v1/object/public/item_pics/items/${itemImage.name}`
      }

      // Insert the item data into the database
      const { error: insertError } = await supabase.from('items').insert([
        {
          item_name: itemName,
          item_desc: itemDesc,
          item_image_url: itemImageURL,
        },
      ])

      if (insertError) {
        throw insertError;
      }

      setSuccessSubmit(true)
      setDisplayAdd(false)
      setItemName('')
      setItemDesc('')
      setItemImage(null); // Clear the image state
    } catch (error) {
      setDisplayError(true)
      console.error(error)
    } finally {
      setLoadingText(false)
    }
  }
  return (
    <>
      {displayError && <ErrorModal displayError={setDisplayError} errorText={'Error Adding'} />}
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className={`flex flex-col relative items-center gap-3 p-5 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-white text-black'} drop-shadow-2xl rounded-md overflow-y-auto max-h-full`}>
          <h1 className='text-2xl font-bold text-center text-green-500'>Add Item</h1>
          <button
            onClick={() => setDisplayAdd(false)}
            type='button'
            className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
            <AiOutlineCloseCircle />
          </button>
          <form onSubmit={handleSubmitItem} className='flex flex-col items-center px-10 py-4 gap-3'>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="itemName">Item Name:</label>
              <input
                className='rounded p-1 text-center text-black outline-none border-2 border-gray-300 focus-border-gray-400 duration-150'
                type="text"
                id='itemName'
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                required />
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="itemDesc">Item Description:</label>
              <textarea
                className='rounded p-1 text-center text-black outline-none border-2 border-gray-300 focus-border-gray-400 duration-150'
                name="itemDesc"
                id="itemDesc"
                cols="23"
                rows="3"
                value={itemDesc}
                onChange={e => setItemDesc(e.target.value)}
                required >
              </textarea>
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-lg font-semibold' htmlFor="itemImage">Item Image:</label>
              <input
                className='w-60 rounded p-1 text-center outline-none border-2 border-gray-300 focus-border-gray-400 duration-150'
                type="file"
                accept='image/*'
                id='itemImage'
                required
                onChange={handleFileChange} // Update the image state on change
              />
            </div>
            {loadingText && <h1 className='text-red-500 text-lg text-center font-bold animate-bounce'>Loading...</h1>}
            <input
              type="submit"
              value='Submit Item'
              className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover-bg-green-500 duration-150 rounded-md' />
          </form>
        </div>
      </div>
    </>
  )
}

export default AddItem;
