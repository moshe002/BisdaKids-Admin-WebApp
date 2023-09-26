import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    await axios.get('http://localhost/BisdaKids-Admin/backend/getAdminData.php')
    .then((response) => {
        //console.log(response.data.data)
        setAdminData(response.data.data);
    })
    .catch((error) => {
        console.error('Error fetching user data:', error);
    });
    setLoading(false)
    setChecker(false)
  }

  return (
    <div className='flex flex-col items-center p-5'>
      { loading && <Loading /> }
      <h1 className='text-2xl font-semibold p-3'>All Admin Accounts</h1>
      <div className='p-3'>
        <table className='table-auto'>
          <tbody>
            <tr>
              <th></th>
              <th className='p-3 border-2'>Firstname</th>
              <th className='p-3 border-2'>Lastname</th>
              <th className='p-3 border-2'>Username</th>
              <th className='p-3 border-2'>Email</th>
              <th className='p-3 border-2'>Contact No.</th>
              <th></th>
            </tr>
            {
              adminData.map((data, key) => {
                return(
                  <tr key={key}>
                    <td>
                      <EditAdmin
                        setChecker={setChecker}
                        userId={data.userID}
                        firstname={data.fName}
                        lastname={data.lName}
                        username={data.userName}
                        email={data.userEmail}
                        contactNo={data.contactNo} />
                    </td>
                    <td className='p-3 border-2'>{data.fName}</td>
                    <td className='p-3 border-2'>{data.lName}</td>
                    <td className='p-3 border-2'>{data.userName}</td>
                    <td className='p-3 border-2'>{data.userEmail}</td>
                    <td className='p-3 border-2'>{data.contactNo}</td>
                    <td>
                      <DeleteAdmin userId={data.userID} adminUsername={data.userName} setChecker={setChecker} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewAdminData