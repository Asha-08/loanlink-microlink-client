import React from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, AlertCircle, BarChart3, Shield } from "lucide-react";

// Project theme colors
const COLORS = ["#0050b2", "#3b82f6", "#60a5fa", "#93c5fd"];

// Reusable stat card with icon
const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0050b2]/5 to-blue-600/5 dark:from-[#0050b2]/10 dark:to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="relative flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {value}
        </h3>
      </div>
      
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
    </div>

    {/* Bottom accent line */}
    <div className={`absolute bottom-0 left-0 right-0 h-1 ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
  </motion.div>
);

const ManagerDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch loans
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["manager-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Loan status count
  const loanStatusCount = loans.reduce((acc, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  // Loan amount per title (for bar chart)
  const barData = loans.map(loan => ({
    title: loan.loanTitle || "Unknown",
    amount: loan.loanAmount || 0,
    status: loan.status
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0050b2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="manager-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#manager-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#0050b2] to-blue-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Manager Dashboard
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Overview of loan applications and key metrics
            </p>
          </div>
        </motion.div>

        {/* Loan Summary Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#0050b2] dark:text-blue-400" />
              Loan Application Status
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Current progress and approval flow of loan applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard 
              title="Pending Loans" 
              value={loanStatusCount.pending || 0} 
              icon={Clock}
              color="bg-gradient-to-br from-yellow-500 to-orange-500"
              delay={0.1}
            />
            <StatCard 
              title="Approved Loans" 
              value={loanStatusCount.approved || 0} 
              icon={CheckCircle}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              delay={0.15}
            />
            <StatCard 
              title="Rejected Loans" 
              value={loanStatusCount.rejected || 0} 
              icon={XCircle}
              color="bg-gradient-to-br from-red-500 to-red-600"
              delay={0.2}
            />
            <StatCard 
              title="Fee Not Paid" 
              value={loanStatusCount["fee-not-paid"] || 0} 
              icon={AlertCircle}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
              delay={0.25}
            />
          </div>
        </div>

        {/* Bar Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Loan Amount Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Total loan amount per loan type
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <ResponsiveContainer width="100%" height={450}>
                <BarChart 
                  data={barData} 
                  margin={{ top: 20, right: 30, left: 60, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                  <XAxis 
                    dataKey="title" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    stroke="#9ca3af"
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    cursor={{ fill: 'rgba(0, 80, 178, 0.1)' }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#0050b2" 
                    radius={[8, 8, 0, 0]}
                    name="Loan Amount ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats Below Chart */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-[#0050b2]/10 to-blue-600/10 dark:from-[#0050b2]/20 dark:to-blue-600/20 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Loans</p>
              <p className="text-xl sm:text-2xl font-bold text-[#0050b2] dark:text-blue-400">
                {loans.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 dark:from-green-500/20 dark:to-emerald-600/20 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Total Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white break-words">
                ${loans.reduce((sum, loan) => sum + (loan.loanAmount || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/20 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Avg Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white break-words">
                ${loans.length > 0 ? Math.round(loans.reduce((sum, loan) => sum + (loan.loanAmount || 0), 0) / loans.length).toLocaleString() : 0}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 dark:from-green-500/20 dark:to-emerald-600/20 rounded-xl p-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Approval Rate</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">
                {loans.length > 0 ? Math.round(((loanStatusCount.approved || 0) / loans.length) * 100) : 0}%
              </p>
            </div>
          </div> */}
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Success Rate</h3>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-extrabold">
              {loans.length > 0 ? Math.round(((loanStatusCount.approved || 0) / loans.length) * 100) : 0}%
            </p>
            <p className="text-sm text-green-100 mt-2">Approved applications</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Review</h3>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-extrabold">{loanStatusCount.pending || 0}</p>
            <p className="text-sm text-yellow-100 mt-2">Awaiting approval</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-[#0050b2] to-blue-600 rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Loans</h3>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-extrabold">{loanStatusCount.approved || 0}</p>
            <p className="text-sm text-blue-100 mt-2">Currently active</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashBoardHome;