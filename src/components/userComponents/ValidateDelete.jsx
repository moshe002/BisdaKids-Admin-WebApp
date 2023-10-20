import React, { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../../supabase-config'

import ErrorModal from '../ErrorModal'

function ValidateDelete({ userId, setDeleteUser, setSuccessDelete, username }) {

    const [loadingText, setLoadingText] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    
    const deletePost = async () => {
        setLoadingText(true)
        const { error } = await supabase
        .from('user_account')
        .delete()
        .eq('user_id', userId)
        if(error){
            setDisplayError(true)
            console.error(error)
        }
        setLoadingText(false)
        setDeleteUser(false)
        setSuccessDelete(true)
    }

  return (
    <>
        { displayError && <ErrorModal displayError={setDisplayError} errorText={'Error Deleting'} /> }
        <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
            <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
                <h1 className='text-3xl font-semibold text-green-500'>Delete {username}?</h1>
                <div className='flex flex-row gap-5'>
                    <button onClick={deletePost} title='yes please uwu' type='button'>
                        <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
                            <AiOutlineCheckCircle />
                        </p>
                    </button>
                    <button onClick={() => setDeleteUser(false)} title='no lol' type='button'>
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

export default ValidateDelete