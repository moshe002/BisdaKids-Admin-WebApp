import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabase-config'

import Loading from '../Loading'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'

function ViewItems({ checker, setChecker }) {

    const [loading, setLoading] = useState(false)
    const [itemsData, setItemsData] = useState([])

    useEffect(() => {
        fetchItems()
    }, [checker])

    const fetchItems = async () => {
        setLoading(true)
        const { data, error } = await supabase
        .from('items')
        .select()
        if(data){
            //console.log(data)
            setItemsData(data)
        } 
        error && console.error(error)
        setChecker(false)
        setLoading(false)
    }

  return (
    <>
        <div className='flex flex-col items-center gap-5 mt-3'>
            <h1 className='font-bold text-2xl text-green-500'>Items</h1>
            { 
                loading
                ?
                <Loading />
                :
                <>
                    <table className='table-auto'>
                        <tbody>
                        <tr>
                            <th></th>
                            <th className='p-3 border-2'>Item ID</th>
                            <th className='p-3 border-2'>Item Name</th>
                            <th className='p-3 border-2'>Item Description</th>
                            <th className='p-3 border-2'>Item Price</th>
                            <th></th>
                        </tr>
                        {
                            itemsData.map((data, index) => {
                                return(
                                    <tr key={index}>
                                        <td>
                                            <EditItem 
                                                itemId={data.item_id}
                                                itemName={data.item_name}
                                                itemDesc={data.item_desc}
                                                itemPrice={data.item_price} 
                                                setChecker={setChecker} />
                                        </td>
                                        <td className='p-3 border-2'>{data.item_id}</td>
                                        <td className='p-3 border-2'>{data.item_name}</td>
                                        <td className='p-3 border-2'>{data.item_desc}</td>
                                        <td className='p-3 border-2'>{data.item_price}</td>
                                        <td>
                                            <DeleteItem itemId={data.item_id} setChecker={setChecker} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </>
            }  
        </div>
    </>
  )
}

export default ViewItems