import React, { useState } from 'react'
import { AiFillDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

function DeleteInventoryBtn({ userId }) {

  const [validateDelete, setValidateDelete] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  return (
    <>
      { validateDelete && <ValidateDelete userId={userId} setDeleteSuccess={setDeleteSuccess} setValidateDelete={setValidateDelete} /> }
      { deleteSuccess && <SuccessDelete setDeleteSuccess={setDeleteSuccess} /> }
      <button onClick={() => setValidateDelete(true)} className='p-3 bg-red-400 rounded-md ml-1'>
          <p className='text-xl'>
              <AiFillDelete />
          </p>
      </button>
    </>
  )
}

// function ValidateDelete({ userId, setValidateDelete, setDeleteSuccess }) {

//   const deletePost = async () => {
//       const { error } = await supabase
//       .from('user_inventory')
//       .delete()
//       .eq('user_id', userId)
//       error && console.error(error)
//       setDeleteSuccess(true)
//       setValidateDelete(false)
//   }

//   return(
//     <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
//       <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
//           <h1 className='text-3xl font-semibold text-green-500'>Delete Inventory?</h1>
//           <div className='flex flex-row gap-5'>
//               <button onClick={deletePost} title='yes please uwu' type='button'>
//                   <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
//                       <AiOutlineCheckCircle />
//                   </p>
//               </button>
//               <button onClick={() => setValidateDelete(false)} title='no lol' type='button'>
//                   <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
//                       <AiOutlineCloseCircle />
//                   </p>
//               </button>
//           </div>
//       </div>
//     </div>
//   )
// }

// function SuccessDelete({ setDeleteSuccess }) {

//   const handleClick = () => {
//     setDeleteSuccess(false)
//   }

//   return(
//     <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
//           <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
//               <h1 className='text-4xl text-green-500 font-semibold'>Deleted Successfully!</h1>
//               <button onClick={handleClick} title='close me pls' type='button'>
//                   <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
//                       <AiOutlineCloseCircle />
//                   </p>
//               </button>
//           </div>
//       </div>
//   )
// }

export default DeleteInventoryBtn