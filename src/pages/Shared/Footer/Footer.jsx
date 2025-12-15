import React from "react";
import { Link } from "react-router";
import loanlink from "../../../assets/loanlink.jpg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-200 via-pink-100 to-pink-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 text-black dark:text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={loanlink}
              alt="LoanLink Logo"
              className="w-12 h-12 rounded-lg"
            />
            <span className="text-lg font-semibold">LoanLink</span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A smart microloan tracker helping you manage small loans seamlessly.
            Track, approve, and repay with ease.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Useful Links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-loans"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                All Loans
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-pink-500 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaSquareXTwitter size={20} />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-end text-sm text-gray-500 dark:text-gray-400 mt-6 lg:mt-0">
          <p>© {new Date().getFullYear()} LoanLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
