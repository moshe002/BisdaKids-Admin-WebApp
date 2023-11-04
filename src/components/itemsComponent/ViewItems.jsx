import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabase-config'
import { IoMdAdd } from 'react-icons/io'

import Loading from '../Loading'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import AddItem from './AddItem'
import SuccessAddModal from '../SuccessAddModal'

function ViewItems({ checker, setChecker }) {

    const [loading, setLoading] = useState(false)
    const [itemsData, setItemsData] = useState([])
    const [displayAdd, setDisplayAdd] = useState(false)
    const [successSubmit, setSuccessSubmit] = useState(false)

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
        { successSubmit && <SuccessAddModal setSuccessSubmit={setSuccessSubmit} setChecker={setChecker} /> }
        { displayAdd && <AddItem setDisplayAdd={setDisplayAdd} setSuccessSubmit={setSuccessSubmit} /> }
        <div className='flex flex-col items-center gap-5 mt-10'>
            <div className='flex gap-3'>
                <h1 className='font-bold text-2xl text-green-500'>Items</h1>
                <button onClick={() => setDisplayAdd(true)} title='add button' className='hover:bg-green-500 bg-green-400 rounded-full p-1' type='button'>
                    <p className='text-2xl'>
                        <IoMdAdd />
                    </p>
                </button>   
            </div>
            { 
                loading
                ?
                    <Loading />
                :
                <>
                    <table className='table-auto'>
                        <tbody>
                        <tr>
                            <th className='p-3 border-2'>Item ID</th>
                            <th className='p-3 border-2'>Item Name</th>
                            <th className='p-3 border-2'>Item Description</th>
                            <th className='p-3 border-2'>Item Image Name</th>
                            <th className='p-3 border-2'>Action</th>
                        </tr>
                        {
                            itemsData.map((data, index) => {
                                const urlParts = `${data.item_image_url}`.split('/')
                                const shortenedUrl = urlParts[urlParts.length - 1];
                                
                                return(
                                    <tr key={index}>
                                        <td className='p-3 border-2'>{data.item_id}</td>
                                        <td className='p-3 border-2'>{data.item_name}</td>
                                        <td className='p-3 border-2'>{data.item_desc}</td>
                                        <td className='p-3 border-2'>{shortenedUrl}</td>
                                        <td className='p-2'>
                                            <EditItem 
                                                itemId={data.item_id}
                                                itemImage={data.item_image_url}
                                                itemName={data.item_name}
                                                itemDesc={data.item_desc}
                                                setChecker={setChecker} />
                                            <DeleteItem imageUrl={data.item_image_url} itemId={data.item_id} setChecker={setChecker} />
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