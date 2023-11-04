import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase-config'

function DropDownItemList({ setItemName }) {

  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const { data, error } = await supabase
    .from('items')
    .select()
    if(data){
        //console.log(data)
        setItems(data)
    } 
    error && console.error(error)
  }

  return (
    <select
      onChange={(e) => setItemName(e.target.value)} 
      className='outline-none text-center cursor-pointer rounded border-2 p-2 w-full text-black border-gray-300 focus-within:border-gray-400' 
      name="itemList" 
      id="itemList"
      required>
      {
        items.map((data, index) => {
          return(
            <option key={index} value={data.item_id}>{data.item_name}</option>
          )
        })
      }
    </select>
  )
}

export default DropDownItemList