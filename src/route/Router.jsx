import { Route, Routes, useLocation } from 'react-router-dom'; 
import { useState, useEffect } from 'react'
// pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import AccountProgress from '../pages/AccountProgress';
import Store from '../pages/Store'
import DailyTasks from '../pages/DailyTasks'
import SaleTransac from '../pages/SaleTransac';
import Items from '../pages/Items';
import ViewPlayerData from '../components/userComponents/ViewPlayerData'
import ViewAdminData from '../components/userComponents/adminComponents/ViewAdminData'

import TopNavbar from '../components/TopNavbar';
//import AdminOrPlayerNav from '../components/AdminOrPlayerNav';

function Router() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const location = useLocation();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const navbarRoutes = [
    '/users', 
    '/accountprogress',
    '/store', 
    '/dailytasks', 
    '/saletransac', 
    '/items',
    '/players',
    '/admins'
  ]

  // const userNavRoutes = [
  //   '/players',
  //   '/admins'
  // ]
  
  const shouldRenderNavbar = navbarRoutes.includes(location.pathname);
  //const shouldRenderUsersNav = userNavRoutes.includes(location.pathname)

  return (
    <>
      {shouldRenderNavbar && <TopNavbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>  
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<Signup />} />
        {
          isLoggedIn 
          &&
          <>
            <Route path='/users' element={<Users />} />
            <Route path='/accountprogress' element={<AccountProgress />} />
            <Route path='/store' element={<Store />} />
            <Route path='/dailytasks' element={<DailyTasks />} />
            <Route path='/saletransac' element={<SaleTransac />} />
            <Route path='/items' element={<Items />} />
            <Route path='/players' element={<ViewPlayerData />} />
            <Route path='/admins' element={<ViewAdminData />} />
          </>
        }
      </Routes>
    </>
  )
}

export default Router