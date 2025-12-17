import React from 'react'
import { NavLink } from 'react-router';

const floatingCoins = ["🪙", "💸", "💵", "💶", "💰"];

const ErrorPage = () => {
  return (
     <div className="relative w-full min-h-screen flex flex-col items-center justify-center
      bg-linear-to-br from-pink-50 via-violet-50 to-white dark:from-[#0f0f1a] dark:via-[#140b2d] dark:to-black overflow-hidden">

      {/* 🔹 Floating coins */}
      {floatingCoins.map((coin, idx) => (
        <div
          key={idx}
          className="absolute text-3xl sm:text-2xl opacity-70 animate-bounce"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {coin}
        </div>
      ))}

      {/* 🔹 Main glassy content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-12
        backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/40 rounded-3xl shadow-2xl">

        <h1 className="text-6xl sm:text-5xl md:text-7xl font-extrabold
          bg-linear-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent animate-pulse">
          Oops! 💸
        </h1>

        <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-700 dark:text-gray-400 mt-2 mb-6 max-w-md">
          Looks like this transaction failed or the page is lost in the system…
          let's bring you back safely!
        </p>

        <NavLink
          to="/"
          className="px-6 py-3 text-white font-semibold rounded-full
            bg-linear-to-r from-pink-500 to-violet-600
            hover:from-violet-600 hover:to-pink-500
            transition-all duration-300 shadow-lg"
        >
          Go Back Home
        </NavLink>
      </div>

      {/* 🔹 Optional fintech background glow */}
      <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full
        bg-pink-300/20 dark:bg-violet-500/20 opacity-30 blur-3xl -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full
        bg-violet-300/20 dark:bg-pink-500/20 opacity-25 blur-2xl animate-pulse"></div>
    </div>
  )
}

export default ErrorPage