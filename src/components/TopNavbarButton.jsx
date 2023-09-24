import React from 'react'

function TopNavbarButton({ text }) {
  return (
    <>
      <div className='border-b-2 border-gray-300 hover:border-gray-500 duration-150'>
        <h1 className='font-semibold text-xl'>
          {text}
        </h1>
      </div>
    </>
    
  )
}

export default TopNavbarButton