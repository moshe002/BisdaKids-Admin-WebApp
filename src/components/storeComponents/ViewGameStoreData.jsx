import React, { useEffect, useState} from 'react'
import { supabase } from '../../supabase-config'
import { IoMdAdd } from 'react-icons/io'
import { format, parseISO } from 'date-fns'

import Loading from '../Loading'
import DeleteGameStoreData from './DeleteGameStoreData'
import EditGameStoreData from './EditGameStoreData'
import AddGameStore from './AddGameStore'
import SuccessAddModal from '../SuccessAddModal'

function ViewGameStoreData() {

    const [gameStoreData, setGameStoreData] = useState([])
    const [itemName, setItemName] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [checker, setChecker] = useState(false)
    const [displayAdd, setDisplayAdd] = useState(false)
    const [successSubmit, setSuccessSubmit] = useState(false)

  useEffect(() => {
    getGameStoreData()
  }, [checker])

  const getGameStoreData = async () => {   
    setChecker(false)
    setIsLoading(true) 
    const { data, error } = await supabase
    .from('game_store')
    .select()
    if(data) {
      //console.log(data)
      setGameStoreData(data)
    }
    error && console.log(error)
    await fetchItemName()
    setIsLoading(false)
  }

  const fetchItemName = async () => {
    const { data, error } = await supabase
    .from('game_store')
    .select(`
      item_id,
      items (
        item_name
      )
    `)
    if(data) {
      //console.log(data)
      setItemName(data)
    }
    error && console.error(error)
  }
  //<td className='p-3 border-2'>{itemName[index].items.item_name}</td>

  // need apache from xampp to be opened
  // const fetchFromBackend = () => {
  //   //http://localhost/BisdaKids-Admin/src/backend/api-request.php?command=get_user_inventory&data={%22user_id%22%3A824655} 789512314
  //   const apiUrl = `http://localhost/BisdaKids-Admin/src/backend/api-request.php?command=get_user_inventory&data={"user_id"%3A789512314}`;
  //   fetch(apiUrl)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //         console.log(data)
  //     })
  //     .catch(error => {
  //         console.error('Error:', error);
  //     });
  // }

  return (
    <div className='flex flex-col items-center p-5'>
      {
        isLoading 
        ? 
        <Loading />
        :
        <>
          { successSubmit && <SuccessAddModal setSuccessSubmit={setSuccessSubmit} setChecker={setChecker} /> }
          { displayAdd && <AddGameStore setDisplayAdd={setDisplayAdd} setSuccessSubmit={setSuccessSubmit} /> }
          <div className='flex flex-col gap-5 p-3'>
            <div className='flex justify-center gap-3'>
              <h1 className='text-2xl text-center font-bold text-blue-500'>Game Store</h1>
              <button onClick={() => setDisplayAdd(true)} title='add button' className='hover:bg-green-500 bg-green-400 rounded-full p-1' type='button'>
                <p className='text-2xl'>
                    <IoMdAdd />
                </p>
              </button>
            </div>
            <table className='table-auto'>
                <tbody>
                    <tr className=''>
                        <th className='p-3 border-2'>Bundle ID</th>
                        <th className='p-3 border-2'>Item Name</th>
                        <th className='p-3 border-2'>Bundle Quantity</th>
                        <th className='p-3 border-2'>Coin Price</th>
                        <th className='p-3 border-2'>Added Timestamp</th>
                        <th className='p-3 border-2'>Action</th>
                    </tr>
                    {
                      gameStoreData.map((data, index) => {
                        const dataDate = parseISO(data.added_timestamp)
                        const formattedDate = format(dataDate, 'MMM dd, yyyy HH:mm:ss') 
                        return(
                          <tr className='text-center' key={index}>
                              <td className='p-3 border-2'>{data.bundle_id}</td>
                              <td className='p-3 border-2'>{itemName[index].items.item_name}</td>
                              <td className='p-3 border-2'>{data.bundle_quantity}</td>
                              <td className='p-3 border-2'>{data.price_coin}</td>
                              <td className='p-3 border-2'>{formattedDate}</td>
                              <td className='p-2'>
                                <EditGameStoreData
                                        bundleID={data.bundle_id}
                                        itemName={data.item_id}
                                        bundleQuan={data.bundle_quantity}
                                        priceCoin={data.price_coin}
                                        time={data.added_timestamp} 
                                        setChecker={setChecker} />
                                <DeleteGameStoreData gameStoreID={data.bundle_id} setChecker={setChecker} />
                              </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
            </table>
          </div>
        </>
      }
    </div>
  )
}

export default ViewGameStoreData