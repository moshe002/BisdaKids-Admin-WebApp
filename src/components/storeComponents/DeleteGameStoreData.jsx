import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

function DeleteGameStoreData({ gameStoreID, setChecker }) {

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const openDeleteModal = () => setDeleteModal(true)

  return (
    <>
      { 
        deleteModal 
        && 
        <DeleteModal 
          gameStoreID={gameStoreID}
          setDeleteModal={setDeleteModal}
          setDeleteSuccess={setDeleteSuccess} /> 
      }
      { deleteSuccess && <SuccessDelete setDeleteSuccess={setDeleteSuccess} setChecker={setChecker} /> }
      <button onClick={openDeleteModal} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'>
              <AiFillDelete />
          </p>
      </button>
    </>
  )
}

function DeleteModal({ gameStoreID, setDeleteModal, setDeleteSuccess }) {

  const deletePost = async () => {
      setDeleteModal(false)
      setDeleteSuccess(true)
      const { error } = await supabase
      .from('game_store')
      .delete()
      .eq('bundle_id',gameStoreID)
      error && console.error(error)
  }

return (
    <>
      <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-3xl font-semibold text-green-500'>Delete Bundle ID {gameStoreID}?</h1>
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
        </div>
      </div>
    </>
  )
}

const SuccessDelete = ({ setDeleteSuccess, setChecker }) => {

  const handleClick = () => {
    setDeleteSuccess(false)
    setChecker(true)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <h1 className='text-4xl text-green-500 font-semibold'>Deleted Successfully!</h1>
          <button onClick={handleClick} title='close me pls' type='button'>
              <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                  <AiOutlineCloseCircle />
              </p>
          </button>
      </div>
    </div>
  )
}

export default DeleteGameStoreData