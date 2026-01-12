import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle,
} from "lucide-react";

import axios from "axios";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegisration = async (data) => {
    const profileImg = data.photo?.[0];

    if (!profileImg) {
      Swal.fire("Error", "Please select a profile image", "error");
      return;
    }

    try {
      await registerUser(data.email, data.password);

      // upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // save user to DB
      await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
        requestedRole: data.role,
      });

      // update firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT / BRANDING (Large device only) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#0050b2]/10 dark:bg-blue-400/10 text-[#0050b2] dark:text-blue-400 px-4 py-2 rounded-full w-fit text-sm font-semibold">
            <UserPlus className="w-4 h-4" />
            Join LoanLink
          </div>

          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Start your <br />
            <span className="text-[#0050b2] dark:text-blue-400">
              financial journey
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
            Create an account and get access to flexible microloans, instant
            approvals, and a secure financial platform.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "Quick & easy registration",
              "Secure data protection",
              "Instant loan access",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT / FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join LoanLink today
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegisration)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full pl-11 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="w-full mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg
                file:border-0 file:bg-[#0050b2] file:text-white
                hover:file:bg-[#003d8a]
                text-gray-600 dark:text-gray-300"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">Photo is required</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Role
              </label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  {...register("role", { required: true })}
                  defaultValue=""
                  className="w-full pl-11 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="borrower">Borrower</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full pl-11 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0050b2] hover:bg-[#003d8a] text-white font-bold rounded-xl shadow-lg"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                state={location.state}
                className="text-[#0050b2] dark:text-blue-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
