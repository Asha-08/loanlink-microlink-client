import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import {
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";

// 🎨 Same palette style as Admin dashboard
const COLORS = [
  "#2563eb", // Blue → Pending
  "#16a34a", // Green → Approved
  "#dc2626", // Red → Rejected
  "#f59e0b", // Amber → Fee Not Paid
];

// 🔹 Reusable Stat Card (Admin style)
const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
    rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between"
  >
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        {value}
      </h3>
    </div>

    <div
      className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>
  </motion.div>
);

const UserDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔹 Fetch user loans
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["user-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans?email=${user.email}`);
      return res.data;
    },
  });

  // 🔹 Loan status count
  const statusCount = loans.reduce((acc, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Pending", value: statusCount.pending || 0 },
    { name: "Approved", value: statusCount.approved || 0 },
    { name: "Rejected", value: statusCount.rejected || 0 },
    { name: "Fee Not Paid", value: statusCount["fee-not-paid"] || 0 },
  ];

  // 🔹 Total amount requested
  const totalAmount = loans.reduce(
    (sum, loan) => sum + Number(loan.loanAmount || 0),
    0
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-14 h-14 border-4 border-[#0050b2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 🔷 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#0050b2] to-blue-600 rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-extrabold text-white">User Dashboard</h1>
        <p className="text-blue-100 mt-2">
          Track your loans, payments, and application status
        </p>
      </motion.div>

      {/* 🔷 STATS */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Loan Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Loans"
            value={loans.length}
            icon={Wallet}
            color="bg-gradient-to-br from-[#0050b2] to-blue-600"
            delay={0.1}
          />
          <StatCard
            title="Approved"
            value={statusCount.approved || 0}
            icon={CheckCircle}
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            delay={0.15}
          />
          <StatCard
            title="Pending"
            value={statusCount.pending || 0}
            icon={Clock}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            delay={0.2}
          />
          <StatCard
            title="Total Amount"
            value={`$${totalAmount}`}
            icon={DollarSign}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
            delay={0.25}
          />
        </div>
      </div>

      {/* 🔷 PIE CHART */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
        rounded-3xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Loan Status Breakdown
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Visual overview of your loan applications
        </p>

        <div className="w-full h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={130}
                paddingAngle={4}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashBoardHome;
