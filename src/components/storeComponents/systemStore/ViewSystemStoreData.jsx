import React, { useEffect, useState} from 'react'
import { supabase } from '../../../supabase-config'

import Loading from '../../Loading'

function ViewSystemStoreData() {

    const [systemStoreData, setSystemStoreData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [checker, setChecker] = useState(false)

  useEffect(() => {
    getSystemStoreData()
    //fetchFromBackend()
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
    setIsLoading(false)
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
                        <th className='p-3 border-2'>Item ID</th>
                        <th className='p-3 border-2'>Offer Quantity</th>
                        <th className='p-3 border-2'>Price</th>
                        <th className='p-3 border-2'>Added Timestamp</th>
                    </tr>
                    {
                        systemStoreData.map((data, index) => {
                            return(
                                <tr className='text-center' key={index}>
                                    <td className='p-3 border-2'>{data.store_offer_id}</td>
                                    <td className='p-3 border-2'>{data.item_id}</td>
                                    <td className='p-3 border-2'>{data.offer_quantity}</td>
                                    <td className='p-3 border-2'>{data.price}</td>
                                    <td className='p-3 border-2'>{data.added_timestamp}</td>
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