import React, { useEffect, useState} from 'react'
import { supabase } from '../supabase-config'

import Loading from '../components/Loading'
// user
import DeleteUserButton from '../components/userComponents/DeleteUserButton'
import EditUserButton from '../components/userComponents/EditUserButton'
// inventory
import DeleteInventoryBtn from '../components/userComponents/DeleteInventoryBtn'
import EditInventoryBtn from '../components/userComponents/EditInventoryBtn'

function Users() {

    const [userData, setUserData] = useState([])
    const [userInventory, setUserInventory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserData()
    //fetchFromBackend()
  }, [])

  const getUserData = async () => {   
    setIsLoading(true) 
    const { data, error } = await supabase
    .from('user_account')
    .select()
    if(data) {
      //console.log(data)
      setUserData(data)
    }
    await getUserInventory()
    error && console.log(error)
    setIsLoading(false)
  }

  const getUserInventory = async () => {
    const { data, error } = await supabase
    .from('user_inventory')
    .select()
    if(data) {
      //console.log(data)
      setUserInventory(data)
    }
    error && console.log(error)
  }

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
    <div className='flex flex-col h-screen items-center p-5'>
      {
        isLoading ? 
        <Loading />
        :
        <>
          <div className='flex flex-col gap-3 p-3'>
            <h1 className='text-2xl text-center font-bold'>Users/Players</h1>
            <table className='table-auto'>
                <tbody>
                    <tr className=''>
                        <th></th>
                        <th className='p-3 border-2'>User ID</th>
                        <th className='p-3 border-2'>Username</th>
                        <th className='p-3 border-2'>User Password</th>
                        <th></th>
                    </tr>
                    {
                        userData.map((data, index) => {
                            return(
                                <tr className='text-center' key={index}>
                                    <td>
                                      <EditUserButton />
                                    </td>
                                    <td className='p-3 border-2'>{data.user_id}</td>
                                    <td className='p-3 border-2'>{data.user_name}</td>
                                    <td className='p-3 border-2'>{data.user_password}</td>
                                    <td>
                                      <DeleteUserButton />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-3 p-3'>
              <h1 className='text-2xl text-center font-bold'>User Inventory</h1>
              <table className='table-auto'>
                  <tbody>
                      <tr className=''>
                          <th></th>
                          <th className='p-3 border-2'>Item ID</th>
                          <th className='p-3 border-2'>Quantity</th>
                          <th></th>
                      </tr>
                      {
                          userInventory.map((data, index) => {
                              return(
                                  <tr className='text-center' key={index}>
                                      <td>
                                        <EditInventoryBtn />
                                      </td>
                                      <td className='p-3 border-2'>{data.item_id}</td>
                                      <td className='p-3 border-2'>{data.quantity}</td>
                                      <td>
                                        <DeleteInventoryBtn />
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

export default Users