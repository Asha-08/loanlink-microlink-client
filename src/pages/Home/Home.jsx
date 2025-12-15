import React from 'react'
import HeroBanner from './HeroBanner'
import AvailableLoans from '../../Component/AvailableLoans/AvailableLoans'
import HowItWorks from '../../Component/HowItWorks/HowItWorks'
import CustomerfeedBack from '../../Component/Customerfeedback/CustomerfeedBack'
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs'
import FAQ from '../../Component/FAQ/FAQ'

const Home = () => {
  return (
    <div>
        
        <HeroBanner></HeroBanner>
        <AvailableLoans></AvailableLoans>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
        <CustomerfeedBack></CustomerfeedBack>
        <FAQ></FAQ>
    </div>
  )
}

export default Home