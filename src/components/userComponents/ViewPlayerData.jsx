import React, { useEffect, useState} from 'react'
import { supabase } from '../../supabase-config'

import Loading from '../Loading'
// user
import DeleteUserButton from '../userComponents/DeleteUserButton'
import EditUserButton from '../userComponents/EditUserButton'

function Users() {

    const [userData, setUserData] = useState([])
    const [userInventory, setUserInventory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [checker, setChecker] = useState(false)

  useEffect(() => {
    getUserData()
    //fetchFromBackend()
  }, [checker])

  const getUserData = async () => {   
    setChecker(false)
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
            <h1 className='text-2xl text-center font-bold text-blue-500'>Players</h1>
            <table className='table-auto'>
                <tbody>
                    <tr className=''>
                        <th className='p-3 border-2'>User ID</th>
                        <th className='p-3 border-2'>Username</th>
                        <th className='p-3 border-2'>User Password</th>
                        <th className='p-3 border-2'>Action</th>
                    </tr>
                    {
                        userData.map((data, index) => {
                            return(
                                <tr className='text-center' key={index}>
                                    <td className='p-3 border-2'>{data.user_id}</td>
                                    <td className='p-3 border-2'>{data.user_name}</td>
                                    <td className='p-3 border-2'>{data.user_password}</td>
                                    <td>
                                      <EditUserButton setChecker={setChecker} userId={data.user_id} username={data.user_name} password={data.user_password} />
                                      <DeleteUserButton userId={data.user_id} setChecker={setChecker} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-3 p-3'>
              <h1 className='text-2xl text-center font-bold text-blue-500'>Player Inventory</h1>
              <table className='table-auto'>
                  <tbody>
                      <tr className=''>
                          <th className='p-3 border-2'>User ID</th>
                          <th className='p-3 border-2'>Item ID</th>
                          <th className='p-3 border-2'>Quantity</th>
                      </tr>
                      {
                          userInventory.map((data, index) => {
                              return(
                                  <tr className='text-center' key={index}>
                                      <td className='p-3 border-2'>{data.user_id}</td>
                                      <td className='p-3 border-2'>{data.item_id}</td>
                                      <td className='p-3 border-2'>{data.quantity}</td>
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