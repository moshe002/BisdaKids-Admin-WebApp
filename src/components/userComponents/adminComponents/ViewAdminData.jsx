import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import { supabase } from '../../../supabase-config'

import Loading from '../../Loading'
import DeleteAdmin from './DeleteAdmin'
import EditAdmin from './EditAdmin'

function ViewAdminData() {

  const [adminData, setAdminData] = useState([])
  const [loading, setLoading] = useState(false)
  const [checker, setChecker] = useState(false)

  useEffect(() => {
    fetchAdminData()
  }, [checker])

  const fetchAdminData = async () => {
    setLoading(true)
    const { data, error } = await supabase
    .from('admin_accounts')
    .select()
    if(data){
      setAdminData(data)
    }
    error && console.error(error)
    setLoading(false)
    setChecker(false)
    // setLoading(true)
    // await axios.get('http://localhost/BisdaKids-Admin/backend/getAdminData.php')
    // .then((response) => {
    //     //console.log(response.data.data)
    //     setAdminData(response.data.data);
    // })
    // .catch((error) => {
    //     console.error('Error fetching user data:', error);
    // });
    // setLoading(false)
    // setChecker(false)
  }

  return (
    <div className='flex flex-col h-screen items-center p-5'>
      <h1 className='text-2xl font-semibold p-3'>All Admin Accounts</h1>
      <div className='p-3'>
      { 
          loading 
          ? 
          <Loading />
          :
          <>
            <table className='table-auto'>
              <tbody>
                <tr>
                  <th className='p-3 border-2'>Firstname</th>
                  <th className='p-3 border-2'>Lastname</th>
                  <th className='p-3 border-2'>Username</th>
                  <th className='p-3 border-2'>Email</th>
                  <th className='p-3 border-2'>Contact No.</th>
                  <th className='p-3 border-2'>Action</th>
                </tr>
                {
                  adminData.map((data, key) => {
                    return(
                      <tr key={key}>
                        <td className='p-3 border-2'>{data.firstname}</td>
                        <td className='p-3 border-2'>{data.lastname}</td>
                        <td className='p-3 border-2'>{data.username}</td>
                        <td className='p-3 border-2'>{data.email}</td>
                        <td className='p-3 border-2'>{data.contactNo}</td>
                        <td className='p-2'>                   
                          <EditAdmin
                            setChecker={setChecker}
                            userId={data.id}
                            firstname={data.firstname}
                            lastname={data.lastname}
                            username={data.username}
                            email={data.email}
                            contactNo={data.contactNo} />                   
                          <DeleteAdmin userId={data.id} adminUsername={data.username} setChecker={setChecker} />
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
    </div>
  )
}

export default ViewAdminData