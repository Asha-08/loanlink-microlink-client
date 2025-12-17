import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAuth from "../../../hooks/useAuth";

// 🎨 Pink & Violet theme
const COLORS = ["#ec4899", "#8b5cf6", "#f472b6", "#a78bfa"];

// 🔹 Reusable glassy stat card WITH glow
const StatCard = ({ title, value }) => (
  <div className="relative overflow-hidden rounded-2xl">
    {/* glow layer */}
    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-violet-500/30 blur-2xl" />

    {/* card */}
    <div className="relative backdrop-blur-xl bg-white/40 border border-white/40 
    rounded-2xl shadow-lg p-5 text-center">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

const UserDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔹 Fetch user loans only
  const { data: loans = [] } = useQuery({
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

  return (
    <div className="space-y-10">

      {/* 🌟 HEADER WITH GLOW */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r 
        from-pink-400/30 to-violet-500/30 blur-2xl" />

        <div className="relative backdrop-blur-xl bg-white/30 
        border border-white/40 rounded-3xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">
            User Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Track your loans, payments, and application status in one place
          </p>
        </div>
      </div>

      {/* 📊 STATS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Loan Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Loans" value={loans.length} />
          <StatCard title="Approved Loans" value={statusCount.approved || 0} />
          <StatCard title="Pending Loans" value={statusCount.pending || 0} />
          <StatCard title="Total Amount" value={`$${totalAmount}`} />
        </div>
      </div>

      {/* 🥧 PIE CHART WITH GLOW */}
      <div className="relative overflow-hidden rounded-3xl w-full md:w-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br 
        from-pink-400/30 to-violet-500/30 blur-2xl" />

        <div className="relative backdrop-blur-xl bg-white/40 
        border border-white/50 p-6 rounded-3xl shadow-xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Loan Status Breakdown
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Visual overview of your loan applications
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

    </div>
  );
};

export default UserDashBoardHome;
