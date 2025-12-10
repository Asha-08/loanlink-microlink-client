import React from 'react'
import bannerImg from "../../assets/herobanner.png";
import { Link } from 'react-router';
const HeroBanner = () => {
  return (
    <div className="relative w-full">
      {/* Responsive Image Wrapper */}
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <img
          src={bannerImg}
          alt="Loan Banner"
          className="w-full h-full  rounded-lg  "
        />
      </div>

      {/* Positioned Button */}
      <Link
        to="/apply-loan"
        className="
          btn
          absolute
          bg-pink-500
          text-white 
          bottom-4 right-4
          sm:bottom-6 sm:right-6
        "
      >
        Apply for Loan
      </Link>
    </div>
  )
}

export default HeroBanner