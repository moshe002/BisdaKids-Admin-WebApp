import React, { useState, useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DarkModeContext } from '../context/themeContext'

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import ViewGameStoreData from '../components/storeComponents/ViewGameStoreData'
import ViewSystemStoreData from '../components/storeComponents/systemStore/ViewSystemStoreData'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

function Store() {

  const { darkMode } = useContext(DarkModeContext)

  const [renderThis, setRenderThis] = useState(true)
  const [successModal, setSuccessModal] = useState(false)
  const [checker, setChecker] = useState(false)

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div className={`flex flex-col h-screen items-center gap-3 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'}`}>
      {successModal && <SuccessSubmit setSuccessModal={setSuccessModal} /> }
      <div className='flex justify-center items-center gap-14 mt-10'>
        <button
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${renderThis ? 'opacity-100' : 'opacity-40'}`} 
          onClick={() => setRenderThis(!false) }>
            Game Store
        </button>
        <button 
          className={`border-b-2 border-blue-400 text-2xl font-semibold ${!renderThis ? 'opacity-100' : 'opacity-40'}`}
          onClick={() => setRenderThis(!true)}>
            System Store
        </button>
      </div>
      { 
        renderThis 
        ? 
          <ViewGameStoreData checker={checker} setChecker={setChecker} /> 
        : 
          <ViewSystemStoreData  checker={checker} setChecker={setChecker} />
      }
    </div>
  )
}

function SuccessSubmit({ setSuccessModal }) {

  const handleClose = () => setSuccessModal(false)
  
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='text-4xl font-bold text-green-500'>Submitted!</h1>
            <button
              className='p-1 hover:bg-red-500 rounded-full duration-150' 
              type='button'
              onClick={handleClose}>
                <p className='text-4xl'>
                  <AiOutlineCloseCircle />
                </p>
            </button>
        </div>
    </div>
  )
}
export default Store