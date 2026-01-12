import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Mail, Lock, User, Shield, Briefcase, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials
  const demoCredentials = {
    user: {
      email: "rahim123@gmail.com",
      password: "Rahim123@",
      role: "borrower",
      icon: User,
      color: "bg-blue-500",
    },
    admin: {
      email: "asha123@gmail.com",
      password: "Asha123@",
      role: "admin",
      icon: Shield,
      color: "bg-red-500",
    },
    manager: {
      email: "alisha123@gmail.com",
      password: "Alisha123@",
      role: "manager",
      icon: Briefcase,
      color: "bg-green-500",
    },
  };

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password!",
        });
      });
  };

  const handleDemoLogin = (role) => {
    const credentials = demoCredentials[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
    
    // Optional: Auto-submit after filling
    setTimeout(() => {
      handleSubmit(handleLogin)();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="login-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#0050b2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-pattern)" />
        </svg>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0050b2]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Welcome to <span className="text-[#0050b2] dark:text-blue-400">LoanLink</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Your trusted partner for microloans and financial growth. Login to manage your account and explore opportunities.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Fast Approval</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get approved in minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Secure & Trusted</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bank-level security</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">24/7 Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Please login to continue</p>
            </div>

            {/* Demo Credentials Section */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Quick Login (Demo Credentials)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(demoCredentials).map(([key, cred]) => {
                  const Icon = cred.icon;
                  return (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDemoLogin(key)}
                      className={`${cred.color} text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-1.5`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold">{cred.role}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true, minLength: 6 })}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be 6 characters or longer
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-[#0050b2] dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 bg-[#0050b2] hover:bg-[#003d8a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login
              </motion.button>

              {/* Register Link */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                New to LoanLink?{" "}
                <Link
                  state={location.state}
                  className="text-[#0050b2] dark:text-blue-400 font-semibold hover:underline"
                  to="/register"
                >
                  Create an account
                </Link>
              </p>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <SocialLogin />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;