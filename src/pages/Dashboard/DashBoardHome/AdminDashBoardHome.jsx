import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// 🎨 Pink & Violet theme
const COLORS = ["#ec4899", "#8b5cf6", "#f472b6", "#a78bfa"];

// 🔹 Reusable glassy stat card (with aura)
const StatCard = ({ title, value }) => (
  <div
    className="
      relative overflow-hidden
      backdrop-blur-xl
      bg-white/40 dark:bg-slate-900/40
      border border-white/40 dark:border-white/10
      rounded-2xl shadow-lg p-5 text-center
    "
  >
    {/* Pink glow */}
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-400/30 blur-2xl rounded-full" />
    {/* Violet glow */}
    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-violet-400/30 blur-2xl rounded-full" />

    <h3 className="relative text-sm text-gray-600 dark:text-gray-300">
      {title}
    </h3>
    <p className="relative text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">
      {value}
    </p>
  </div>
);

const AdminDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch loans
  const { data: loans = [] } = useQuery({
    queryKey: ["admin-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // 🔹 Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // 🔹 Loan status count
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

  // 🔹 User role count
  const roleCount = users.reduce(
    (acc, user) => {
      acc.total += 1;
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="space-y-10">

      {/*  DASHBOARD HEADER  */}
      <div
        className="
          relative overflow-hidden
          backdrop-blur-xl
          bg-white/30 dark:bg-slate-900/40
          border border-white/40 dark:border-white/10
          rounded-3xl p-6 shadow-xl
        "
      >
        {/* Aura */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/30 blur-3xl rounded-full" />

        <h1 className="relative text-3xl font-bold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="relative text-gray-600 dark:text-gray-300 mt-1">
          Monitor users, loan applications, and overall system performance
        </p>
      </div>

      {/* 👤 USER MANAGEMENT */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            User Management Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Role-based distribution of platform users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={roleCount.total || 0} />
          <StatCard title="Admins" value={roleCount.admin || 0} />
          <StatCard title="Managers" value={roleCount.manager || 0} />
          <StatCard title="Users" value={roleCount.user || 0} />
          <StatCard title="Borrower" value={roleCount.borrower || 0} />
        </div>
      </div>

      {/* 💰 LOAN STATUS */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Loan Application Status
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Current progress and approval flow of loan applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Pending Loans" value={loanStatusCount.pending || 0} />
          <StatCard title="Approved Loans" value={loanStatusCount.approved || 0} />
          <StatCard title="Rejected Loans" value={loanStatusCount.rejected || 0} />
          <StatCard
            title="Fee Not Paid"
            value={loanStatusCount["fee-not-paid"] || 0}
          />
        </div>
      </div>

      {/* 📊 PIE CHART (Glassy + Aura) */}
      <div
        className="
          relative overflow-hidden
          backdrop-blur-xl
          bg-white/40 dark:bg-slate-900/40
          border border-white/50 dark:border-white/10
          p-6 rounded-3xl shadow-xl
          w-full md:w-[440px]
        "
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-400/30 blur-3xl rounded-full" />

        <h2 className="relative text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Loan Status Overview
        </h2>
        <p className="relative text-sm text-gray-500 dark:text-gray-300 mb-4">
          Visual breakdown of loan application statuses
        </p>

        <PieChart width={380} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashBoardHome;
