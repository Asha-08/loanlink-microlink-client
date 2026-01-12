import React from 'react';
import { motion } from 'framer-motion';
import { BiError } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineReload } from 'react-icons/ai';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function ErrorPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Error icon with animation */}
          <motion.div
            className="inline-block mb-8"
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-red-400 rounded-full filter blur-2xl opacity-40"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <BiError className="text-8xl md:text-9xl text-red-500 relative z-10" />
            </div>
          </motion.div>

          {/* Error code */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-gray-800 mb-4"
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              4
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            >
              0
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              4
            </motion.span>
          </motion.h1>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto px-4">
              The page you're looking for seems to have wandered off. Don't worry, we'll help you get back on track with your financial journey.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoHome}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <AiOutlineHome className="text-xl" />
              Go to Homepage
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(107, 114, 128, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoBack}
              className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              <MdOutlineArrowBack className="text-xl" />
              Go Back
            </motion.button>

            
          </motion.div>

          {/* LoanLink branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12"
          >
            <p className="text-gray-500 text-sm">
              Need assistance? Contact our support team
            </p>
            <motion.p
              className="text-blue-600 font-semibold text-lg mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              LoanLink
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}