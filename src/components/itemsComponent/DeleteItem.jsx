import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

import SuccessDeleteModal from '../SuccessDeleteModal'
import ErrorModal from '../ErrorModal'

function DeleteItem({ imageUrl, itemId, setChecker }) {

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const openDeleteModal = () => setDeleteModal(true)

  return (
    <>
      { 
        deleteModal 
        && 
        <DeleteModal 
          imageUrl={imageUrl}
          itemId={itemId}
          setDeleteModal={setDeleteModal}
          setDeleteSuccess={setDeleteSuccess} /> 
      }
      { deleteSuccess && <SuccessDeleteModal setDeleteSuccess={setDeleteSuccess} setChecker={setChecker} /> }
      <button onClick={openDeleteModal} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'>
              <AiFillDelete />
          </p>
      </button>
    </>
  )
}

function DeleteModal({ imageUrl, itemId, setDeleteModal, setDeleteSuccess }) {

  const [loadingText, setLoadingText] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  //console.log(imageUrl)
  // const urlParts = `${imageUrl}`.split('/')
  // const shortenedUrl = urlParts.slice(-2).join('/')
  // console.log(shortenedUrl)

  const deletePost = async () => {
    setLoadingText(true)
    if(itemId){
      const { error } = await supabase
      .from('items')
      .delete()
      .eq('item_id', itemId)
      if(error){
        setDisplayError(true)
        console.error(error)
      }

      const urlParts = `${imageUrl}`.split('/')
      const shortenedUrl = urlParts.slice(-2).join('/')
      //console.log(shortenedUrl)

      const { data, error:bucketError } = await supabase
      .storage
      .from('item_pics')
      .remove([`${shortenedUrl}`])
      data && console.log('deleted') //console.log(data)
      bucketError && console.error(bucketError)
    }
    setLoadingText(false)
    setDeleteModal(false)
    setDeleteSuccess(true)
  }

return (
    <>
      { displayError && <ErrorModal displayError={setDisplayError} errorText={'Error Deleting'} /> }
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-3xl font-semibold text-green-500'>Delete Item ID {itemId}?</h1>
            <div className='flex flex-row gap-5'>
              <button onClick={deletePost} title='yes please uwu' type='button'>
                  <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
                      <AiOutlineCheckCircle />
                  </p>
              </button>
              <button onClick={() => setDeleteModal(false)} title='no lol' type='button'>
                  <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                      <AiOutlineCloseCircle />
                  </p>
              </button>
            </div>
            { loadingText && <h1 className='text-red-500 text-lg text-center font-bold animate-bounce'>Loading...</h1> }
        </div>
      </div>
    </>
  )
}

export default DeleteItem