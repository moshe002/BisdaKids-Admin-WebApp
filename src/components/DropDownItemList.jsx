import React from 'react'

function DropDownItemList({ setItemName }) {

  return (
    <select
      onChange={(e) => setItemName(e.target.value)} 
      className='outline-none text-center cursor-pointer rounded border-2 p-2 w-full text-black border-gray-300 focus-within:border-gray-400' 
      name="itemList" 
      id="itemList"
      required>
        <option value="hint">Hint</option>
        <option value="time freeze">Time Freeze</option>
        <option value="energy">Energy</option>
    </select>
  )
}

export default DropDownItemList