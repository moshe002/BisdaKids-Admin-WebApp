import React, { useState, useContext } from 'react'
import { supabase } from '../supabase-config'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DarkModeContext } from '../context/themeContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ViewItems from '../components/itemsComponent/ViewItems'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Items() {

  const { darkMode } = useContext(DarkModeContext)

  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemPrice, setItemPrice] = useState(0)
  const [successModal, setSuccessModal] = useState(false)
  const [checker, setChecker] = useState(false)

  const handleSubmitItem = async (e) => {
    e.preventDefault()
    setChecker(true)
    const { error } = await supabase
    .from('items')
    .insert({ 
      item_name: itemName,
      item_desc: itemDesc,
      item_price: itemPrice,
    })
    error && console.error(error)
    setSuccessModal(true)
    setItemName('')
    setItemDesc('')
    setItemPrice(0)
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div className={`flex flex-col h-screen items-center gap-5 ${darkMode ? 'bg-zinc-600 text-white' : 'bg-white text-black'}`}>
      {successModal && <SuccessSubmit setSuccessModal={setSuccessModal} /> }
      <ViewItems checker={checker} setChecker={setChecker} />  
      {/* <Button onClick={handleOpen} variant='contained'>Add Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-rmodal-title" 
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button 
                onClick={() => handleClose(false)} 
                type='button' 
                className='absolute top-4 right-5 text-3xl p-1 rounded-full hover:bg-gray-400 duration-150'>
                  <AiOutlineCloseCircle />
          </button>
          <Typography id="modal-modal-title">
          <h1 className='text-2xl font-bold text-center text-green-500'>Add Item</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='py-2'>    
            <div>   
              <form onSubmit={handleSubmitItem} className='flex flex-col items-center p-4 gap-3'>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="itemName">Item Name</label>
                  <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="text" 
                    id='itemName' 
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    required />
                </div>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="itemDesc">Item Description</label>
                  <textarea 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                    name="itemDesc" 
                    id="itemDesc" 
                    cols="23" 
                    rows="5"
                    value={itemDesc}
                    onChange={e => setItemDesc(e.target.value)}
                    required >
                  </textarea>
                </div>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="itemPrice">Item Price</label>
                  <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='itemPrice'
                    value={itemPrice}
                    onChange={e => setItemPrice(e.target.value)} 
                    required />
                </div>
                <input 
                  type="submit" 
                  value='Submit Item' 
                  className='cursor-pointer text-white font-semibold p-3 bg-green-400 hover:bg-green-500 duration-150 rounded-md' />
              </form>
            </div>    
          </div>
          </Typography>
        </Box>
      </Modal> */}
    </div>
    
    </>
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
  );
}

export default Items;
