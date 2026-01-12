import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, DollarSign } from "lucide-react";

const AvailableLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addloans/home");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explore Available{" "}
            <span className="text-[#0050b2] dark:text-blue-400">Loans</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare loan types, interest rates, and apply easily to get the funding you need.
          </p>
        </motion.div>

        {/* Loans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {loans.map((loan, index) => (
            <motion.div
              key={loan._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 right-3 bg-[#0050b2] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Featured
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {loan.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {loan.shortDescription || loan.description?.slice(0, 100)}...
                </p>

                <div className="flex justify-between items-center mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">Max Loan</span>
                  <span className="text-lg font-bold text-[#0050b2] dark:text-blue-400 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {loan.maxLoanLimit.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/loans/${loan._id}`)}
                  className="w-full py-3 bg-[#0050b2] hover:bg-[#003d8a] text-white rounded-xl font-bold flex justify-center items-center gap-2"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          to="/all-loans"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#0050b2] hover:bg-[#003d8a] text-white rounded-xl font-bold shadow-lg"
        >
          View All Loans <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default AvailableLoans;
