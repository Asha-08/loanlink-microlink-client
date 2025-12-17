import React from 'react'
import { motion } from "framer-motion";
import HeroBanner from './HeroBanner'
import AvailableLoans from '../../Component/AvailableLoans/AvailableLoans'
import HowItWorks from '../../Component/HowItWorks/HowItWorks'
import CustomerfeedBack from '../../Component/Customerfeedback/CustomerfeedBack'
import WhyChooseUs from '../../Component/WhyChooseUs/WhyChooseUs'
import FAQ from '../../Component/FAQ/FAQ'

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
    <div className="overflow-hidden">
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

      {/* How It Works */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

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
    </div>
  );
}

export default Home