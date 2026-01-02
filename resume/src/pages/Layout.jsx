import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'
import {useSelector} from "react-redux"
import Loader from '../components/Loader'
import LoginPage from './Login'

const Layout = () => {

  const {user , loading} = useSelector((state)=>state.auth)

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      {
        user ? (<div className='min-h-screen bg-gray-50'>
          <Navbar/>
            <Outlet/>
        </div>) : (<LoginPage/>)
      }

    </div>
  )
}

export default Layout