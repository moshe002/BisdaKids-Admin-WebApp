import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Loading() {
  return (
    <>
      <h1 className='mt-36 text-center text-4xl animate-spin'>
        <AiOutlineLoading3Quarters />
      </h1>
    </>
  )
}

export default Loading