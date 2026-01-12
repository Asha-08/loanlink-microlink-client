import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Shared/Navbar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const Rootlayout = () => {
  return (
    <div className=' mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Rootlayout