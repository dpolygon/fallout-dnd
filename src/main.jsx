import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import './index.css'
import Navbar from './components/navbar.jsx'
import Home from './routes/Home.jsx'
import Armor from './routes/armor/Armor.jsx'
import ArmorDetail from './routes/armor/ArmorDetail.jsx'
import ArmorUpgrade from './routes/armor/ArmorUpgrade.jsx'
import Weapons from './routes/weapons/Weapons.jsx'

const Applayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Applayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/armor',
        element: <Armor/>
      }, 
      {
        path: '/armor/:armorId',
        element: <ArmorDetail/>
      },
      {
        path: '/power_armor/:armorId',
        element: <ArmorDetail/>
      }, 
      {
        path: '/armor/upgrade/:upgradeId',
        element: <ArmorUpgrade/>
      }, 
      {
        path: '/power_armor/upgrade/:upgradeId',
        element: <ArmorUpgrade/>
      }, 
      {
        path: '/weapons',
        element: <Weapons/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)