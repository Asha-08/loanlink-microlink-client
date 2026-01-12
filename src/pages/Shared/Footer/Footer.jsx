import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import loanlink from "../../../assets/loanlink.jpg";
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = {
    facebook: "https://www.facebook.com/rongdhonu.satrong.169/",
    instagram: "https://www.instagram.com/amina_aasha/",
    linkedin: "https://www.linkedin.com/in/amina-akther-asha/",
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* Logo + Description */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={loanlink}
                  alt="LoanLink Logo"
                  className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-[#0050b2] transition-all duration-300"
                />
                <div className="absolute inset-0 bg-[#0050b2] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                LoanLink
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A smart microloan tracker helping you manage small loans seamlessly. Track, approve, and repay with ease.
            </p>
            <div className="flex gap-4 mt-2">
              {[
                { icon: FaFacebook, link: socialLinks.facebook, color: "hover:text-blue-600" },
                { icon: FaInstagram, link: socialLinks.instagram, color: "hover:text-pink-600" },
                { icon: FaLinkedin, link: socialLinks.linkedin, color: "hover:text-blue-700" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#0050b2]"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/blogs", label: "Blogs" },
                { to: "/about-us", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#0050b2] dark:hover:text-[#0050b2] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#0050b2] transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

         

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#0050b2]"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="text-[#0050b2] mt-1 flex-shrink-0" size={16} />
                <a 
                  href="mailto:ashaamina91@gmail.com" 
                  className="hover:text-[#0050b2] transition-colors duration-300 break-all"
                >
                  ashaamina91@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaPhone className="text-[#0050b2] mt-1 flex-shrink-0" size={16} />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-[#0050b2] transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-[#0050b2] mt-1 flex-shrink-0" size={16} />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} LoanLink. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#0050b2] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-[#0050b2] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;