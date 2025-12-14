import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanDetailsModal from "../MyLoans/LoanDetailsModal";

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

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  // view loan details modal

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setOpenLoanModal(true);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Loans Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-pink-100 text-pink-700">
          <tr>
            <th className="border px-4 py-2">Loan ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Loan Category</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td className="border px-4 py-2">{loan._id}</td>
              <td className="border px-4 py-2">
                {loan.firstName} {loan.lastName} <br />
                <span className="text-gray-600">{loan.email}</span>
              </td>
              <td className="border px-4 py-2">{loan.loanTitle}</td>
              <td className="border px-4 py-2">${loan.loanAmount}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    loan.status === "pending"
                      ? "bg-yellow-500"
                      : loan.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </span>
              </td>
              <td className="border px-4 py-2">
              <button
                    className="btn bg-linear-to-tr from-pink-400 to-pink-600   transition btn-sm text-white cursor-pointer"
                    onClick={() => handleViewLoan(loan)}
                  >
                    View
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
