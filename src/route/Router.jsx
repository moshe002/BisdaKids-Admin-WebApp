import { Route, Routes, useLocation } from 'react-router-dom'; 

// pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import Store from '../pages/Store'
import DailyTasks from '../pages/DailyTasks'
import SaleTransac from '../pages/SaleTransac';
import Items from '../pages/Items';
import ViewPlayerData from '../components/userComponents/ViewPlayerData'
import ViewAdminData from '../components/userComponents/adminComponents/ViewAdminData'

import TopNavbar from '../components/TopNavbar';
//import AdminOrPlayerNav from '../components/AdminOrPlayerNav';

function Router() {
  const location = useLocation();
  const navbarRoutes = [
    '/users', 
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
      {shouldRenderNavbar && <TopNavbar />}
      {/* { shouldRenderUsersNav && <AdminOrPlayerNav /> } */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users/*' element={<Users />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/store' element={<Store />} />
        <Route path='/dailytasks' element={<DailyTasks />} />
        <Route path='/saletransac' element={<SaleTransac />} />
        <Route path='/items' element={<Items />} />
        <Route path='/players' element={<ViewPlayerData />} />
        <Route path='/admins' element={<ViewAdminData />} />
      </Routes>
    </>
  )
}

export default Router