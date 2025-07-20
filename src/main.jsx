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
import Armor from './routes/Armor.jsx'

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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)