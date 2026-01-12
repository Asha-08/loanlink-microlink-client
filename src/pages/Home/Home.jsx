import React from 'react'
import { motion } from "framer-motion";
import HeroBanner from './HeroBanner'
import AvailableLoans from '../../Component/AvailableLoans/AvailableLoans'
import HowItWorks from '../../Component/HowItWorks/HowItWorks'
import CustomerfeedBack from '../../Component/Customerfeedback/CustomerfeedBack'
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs'
import FAQ from '../../Component/FAQ/FAQ'
import OurMission from '../../Component/OurMission/OurMission';
import Newsletter from '../../Component/Newslatter/Newsletter';
import ImpactShowcase from '../../Component/ImpactShowcase/ImpactShowcase';
import LoanCalculator from '../../Component/LoanCalculator/LoanCalculator';

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Home = () => {
 return (
    <div className="overflow-hidden  bg-gray-50 dark:bg-[#0b1120]
        text-gray-900 dark:text-gray-100
        transition-colors duration-300">
      {/* Hero (load animation) */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroBanner />
      </motion.div>

      {/* Available Loans */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AvailableLoans />
      </motion.div>

      {/* our mission */}

      <OurMission></OurMission>

      {/* impact shoecase */}

      <ImpactShowcase></ImpactShowcase>

      {/* How It Works */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      {/* calculator */}

      <LoanCalculator></LoanCalculator>

      {/* Why Choose Us */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Customer Feedback */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <CustomerfeedBack />
      </motion.div>

      {/* FAQ */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FAQ />
      </motion.div>

      <Newsletter></Newsletter>
    </div>
  );
}

export default Home
