import React from 'react'
import { Outlet } from 'react-router'
import authImage from '../assets/loan5.jpg';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

const AuthLayout = () => {
  return (
    <div className=" mx-auto">
      <Navbar></Navbar>
      <div className='flex items-center'>
        <div className='flex-1 my-8'>
          <Outlet></Outlet>
        </div>
        {/* <div className="flex-1">
          <img src={authImage} alt="" />
        </div> */}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AuthLayout