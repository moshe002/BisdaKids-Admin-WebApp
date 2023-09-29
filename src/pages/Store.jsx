import React, { useState } from 'react'
import { supabase } from '../supabase-config'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ViewGameStoreData from '../components/storeComponents/ViewGameStoreData'
import ViewSystemStoreData from '../components/storeComponents/systemStore/ViewSystemStoreData'

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

function Store() {
  const [renderThis, setRenderThis] = useState(true)
  //const [renderAdmins, setRenderAdmins] = useState(false)

  const [itemId, setItemId] = useState(1)
  const [bundleQuan, setBundleQuan] = useState(0)
  const [priceCoin, setPriceCoin] = useState(0)
  const [time, setTime] = useState('')
  const [successModal, setSuccessModal] = useState(false)
  const [checker, setChecker] = useState(false)

  const handleSubmitBundle = async (e) => {
    e.preventDefault()
    setChecker(true)
    const { error } = await supabase
    .from('game_store')
    .insert({ 
      item_id: itemId,
      bundle_quantity: bundleQuan,
      price_coin: priceCoin,
      added_timestamp: time
    })
    error && console.error(error)
    setSuccessModal(true)
    setItemId(0)
    setBundleQuan(0)
    setPriceCoin(0)
    setTime('')
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div className='flex flex-col items-center gap-5'>
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
      { renderThis ? <ViewGameStoreData checker={checker} setChecker={setChecker} /> : <ViewSystemStoreData />}
      <Button onClick={handleOpen} variant='contained'>Add</Button>
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
          <h1 className='text-2xl font-bold text-center text-green-500'>Add Bundle</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className='py-2'>    
            <div>   
              <form onSubmit={handleSubmitBundle} className='flex flex-col items-center p-4 gap-3'>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="itemId">Item Id</label>
                   <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='itemName' 
                    value={itemId}
                    onChange={e => setItemId(e.target.value)}
                   required /> 
                </div>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="bundleQuan">Bundle Quantity</label>
                  <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150'
                    name="bundlQuan" 
                    id="bundleQuan" 
                    value={bundleQuan}
                    onChange={e => setBundleQuan(e.target.value)}
                    required >
                  </input>
                </div>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="coinPrice">Coin Price</label>
                  <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="number" 
                    id='coinPrice'
                    value={priceCoin}
                    onChange={e => setPriceCoin(e.target.value)} 
                    required />
                </div>
                <div className='flex flex-col text-center'>
                  <label className='text-lg font-semibold' htmlFor="time">Added Timestamp</label>
                  <input 
                    className='rounded p-1 text-center outline-none border-2 border-gray-300 focus:border-gray-400 duration-150' 
                    type="datetime-local" 
                    id='time'
                    value={time}
                    onChange={e => setTime(e.target.value)} 
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
      </Modal>
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
  )
}
export default Store