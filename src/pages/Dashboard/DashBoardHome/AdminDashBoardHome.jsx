import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, User, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from "lucide-react";

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

const AdminDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch loans
  const { data: loans = [], isLoading: loansLoading } = useQuery({
    queryKey: ["admin-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Loan status count
  const loanStatusCount = loans.reduce((acc, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Pending", value: loanStatusCount.pending || 0 },
    { name: "Approved", value: loanStatusCount.approved || 0 },
    { name: "Rejected", value: loanStatusCount.rejected || 0 },
    { name: "Fee Not Paid", value: loanStatusCount["fee-not-paid"] || 0 },
  ];

  // User role count
  const roleCount = users.reduce(
    (acc, user) => {
      acc.total += 1;
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  if (loansLoading || usersLoading) {
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
            <pattern id="dashboard-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-pattern)" />
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
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Monitor users, loan applications, and overall system performance
            </p>
          </div>
        </motion.div>

        {/* User Management Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#0050b2] dark:text-blue-400" />
              User Management Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Role-based distribution of platform users
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            <StatCard 
              title="Total Users" 
              value={roleCount.total || 0} 
              icon={Users}
              color="bg-gradient-to-br from-[#0050b2] to-blue-600"
              delay={0.1}
            />
            <StatCard 
              title="Admins" 
              value={roleCount.admin || 0} 
              icon={UserCheck}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              delay={0.15}
            />
            <StatCard 
              title="Managers" 
              value={roleCount.manager || 0} 
              icon={Briefcase}
              color="bg-gradient-to-br from-green-500 to-green-600"
              delay={0.2}
            />
            <StatCard 
              title="Users" 
              value={roleCount.user || 0} 
              icon={User}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              delay={0.25}
            />
            <StatCard 
              title="Borrowers" 
              value={roleCount.borrower || 0} 
              icon={User}
              color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              delay={0.3}
            />
          </div>
        </div>

        {/* Loan Status Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#0050b2] dark:text-blue-400" />
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
              delay={0.2}
            />
            <StatCard 
              title="Approved Loans" 
              value={loanStatusCount.approved || 0} 
              icon={CheckCircle}
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              delay={0.25}
            />
            <StatCard 
              title="Rejected Loans" 
              value={loanStatusCount.rejected || 0} 
              icon={XCircle}
              color="bg-gradient-to-br from-red-500 to-red-600"
              delay={0.3}
            />
            <StatCard 
              title="Fee Not Paid" 
              value={loanStatusCount["fee-not-paid"] || 0} 
              icon={AlertCircle}
              color="bg-gradient-to-br from-orange-500 to-orange-600"
              delay={0.35}
            />
          </div>
        </div>

        {/* Pie Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Loan Status Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Visual breakdown of loan application statuses
            </p>
          </div>

          <div className="w-full h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats Below Chart */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                {loanStatusCount.pending || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                {loanStatusCount.approved || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-500">
                {loanStatusCount.rejected || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fee Not Paid</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                {loanStatusCount["fee-not-paid"] || 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashBoardHome;