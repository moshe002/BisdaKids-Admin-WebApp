import React, { useState } from 'react'

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import ViewItems from '../components/itemsComponent/ViewItems'

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

function Items() {

  const [checker, setChecker] = useState(false)

  return (
    <div className='flex flex-col items-center gap-5 p-3'>
      <ViewItems checker={checker} setChecker={setChecker} />  
    </div>
  )
}

export default Items