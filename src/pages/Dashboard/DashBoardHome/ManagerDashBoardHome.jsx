import React from 'react'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const COLORS = ["#ec4899", "#8b5cf6", "#f472b6", "#a78bfa"];

// 🔹 Reusable glassy stat card (loans summary)
const StatCard = ({ title, value }) => (
  <div className="
    relative overflow-hidden
    backdrop-blur-xl
    bg-white/40 dark:bg-slate-900/40
    border border-white/40 dark:border-white/10
    rounded-2xl shadow-lg p-5 text-center
  ">
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-400/30 blur-2xl rounded-full" />
    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-violet-400/30 blur-2xl rounded-full" />

    <h3 className="relative text-sm text-gray-600 dark:text-gray-300">{title}</h3>
    <p className="relative text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{value}</p>
  </div>
);

const ManagerDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch loans
  const { data: loans = [] } = useQuery({
    queryKey: ["manager-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // 🔹 Loan status count
  const loanStatusCount = loans.reduce((acc, loan) => {
    acc[loan.status] = (acc[loan.status] || 0) + 1;
    return acc;
  }, {});

  // 🔹 Loan amount per title (for bar chart)
  const barData = loans.map(loan => ({
    title: loan.loanTitle || "Unknown",
    amount: loan.loanAmount || 0,
    status: loan.status
  }));

 
  return (
    <div className="space-y-10">

      {/* 🌟 DASHBOARD HEADER */}
      <div className="
        relative overflow-hidden
        backdrop-blur-xl
        bg-white/30 dark:bg-slate-900/40
        border border-white/40 dark:border-white/10
        rounded-3xl p-6 shadow-xl
      ">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/30 blur-3xl rounded-full" />

        <h1 className="relative text-3xl font-bold text-gray-800 dark:text-gray-100">
          Manager Dashboard
        </h1>
        <p className="relative text-gray-600 dark:text-gray-300 mt-1">
          Overview of loan applications and key metrics
        </p>
      </div>

      {/* 💳 LOAN SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Pending Loans" value={loanStatusCount.pending || 0} />
        <StatCard title="Approved Loans" value={loanStatusCount.approved || 0} />
        <StatCard title="Rejected Loans" value={loanStatusCount.rejected || 0} />
        <StatCard title="Fee Not Paid" value={loanStatusCount["fee-not-paid"] || 0} />
      </div>

      {/* 📊 LOAN AMOUNT BAR CHART */}
      <div className="
        relative overflow-hidden
        backdrop-blur-xl
        bg-white/40 dark:bg-slate-900/40
        border border-white/50 dark:border-white/10
        p-6 rounded-3xl shadow-xl
        w-full
      ">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-400/30 blur-3xl rounded-full" />

        <h2 className="relative text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Loan Amount Overview
        </h2>
        <p className="relative text-sm text-gray-500 dark:text-gray-300 mb-4">
          Total loan amount per loan type
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ManagerDashBoardHome