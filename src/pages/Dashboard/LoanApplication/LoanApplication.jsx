import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanDetailsModal from "../MyLoans/LoanDetailsModal";
import { FaEye, FaFilter } from "react-icons/fa";

const LoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  const [openLoanModal, setOpenLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const {
    data: loans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loans", filter],
    queryFn: async () => {
      const url =
        filter === "all" ? "/loans" : `/loans?status=${filter.toLowerCase()}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // view loan details modal
  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setOpenLoanModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0050b2]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading loan applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Loan Applications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and review all loan applications
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaFilter className="text-[#0050b2]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter by Status
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                  filter === f
                    ? "bg-[#0050b2] text-white shadow-lg scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table Head */}
              <thead className="bg-[#0050b2]">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Loan Category
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loans.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          No loan applications found
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                          Try changing the filter or check back later
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  loans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {loan._id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {loan.firstName} {loan.lastName}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {loan.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-100">
                        {loan.loanTitle}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${loan.loanAmount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            loan.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : loan.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <button
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0050b2] hover:bg-[#003d8a] text-white rounded-md transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md"
                          onClick={() => handleViewLoan(loan)}
                          title="View Loan Details"
                        >
                          <FaEye />
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer - Shows total count */}
          {loans.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{loans.length}</span> loan application{loans.length !== 1 ? 's' : ''}
                {filter !== 'all' && (
                  <span> with status: <span className="font-semibold text-[#0050b2]">{filter}</span></span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* loan details modal render */}
      {openLoanModal && (
        <LoanDetailsModal
          loan={selectedLoan}
          onClose={() => setOpenLoanModal(false)}
        />
      )}
    </div>
  );
};

export default LoanApplication;