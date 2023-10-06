import React, { useEffect, useState} from 'react'
import { supabase } from '../../../supabase-config'

import DeleteSystemStore from './DeleteSystemStore'
import EditSystemStore from './EditSystemStore'
import Loading from '../../Loading'

function ViewSystemStoreData() {

    // add crud to system store (add, edit, delete)

    const [systemStoreData, setSystemStoreData] = useState([])
    const [itemName, setItemName] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [checker, setChecker] = useState(false)

  useEffect(() => {
    getSystemStoreData()
  }, [checker])

  const getSystemStoreData = async () => {   
    setChecker(false)
    setIsLoading(true) 
    const { data, error } = await supabase
    .from('system_store')
    .select()
    if(data) {
      //console.log(data)
      setSystemStoreData(data)
    }
    error && console.log(error)
    await fetchItemName()
    setIsLoading(false)
  }

  const fetchItemName = async () => {
    const { data, error } = await supabase
    .from('system_store')
    .select(`
      item_id,
      items (
        item_name
      )
    `)
    if(data){
      //console.log(data[0].items.item_name)
      setItemName(data)
    }
    error && console.error(error)
  }

  return (
    <div className='flex flex-col items-center p-5'>
      {
        isLoading ? 
        <Loading />
        :
        <>
          <div className='flex flex-col gap-3 p-3'>
            <h1 className='text-2xl text-center font-bold text-blue-500'>System Store</h1>
            <table className='table-auto'>
                <tbody>
                    <tr className=''>
                        <th className='p-3 border-2'>Store Offer ID</th>
                        <th className='p-3 border-2'>Item Name</th>
                        <th className='p-3 border-2'>Offer Quantity</th>
                        <th className='p-3 border-2'>Price</th>
                        <th className='p-3 border-2'>Added Timestamp</th>
                        <th className='p-3 border-2'>Action</th>
                    </tr>
                    {
                        systemStoreData.map((data, index) => {
                          return (
                            <tr className='text-center' key={index}>
                              <td className='p-3 border-2'>{data.store_offer_id}</td>
                              <td className='p-3 border-2'>{itemName[index].items.item_name}</td>
                              <td className='p-3 border-2'>{data.offer_quantity}</td>
                              <td className='p-3 border-2'>{data.price}</td>
                              <td className='p-3 border-2'>{data.added_timestamp}</td>
                              <td>
                                <EditSystemStore 
                                  systemStoreId={data.store_offer_id} 
                                  offerQuantity={data.offer_quantity}
                                  price={data.price}
                                  setChecker={setChecker} />
                                <DeleteSystemStore storeId={data.store_offer_id} setChecker={setChecker} />
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

export default ViewSystemStoreData