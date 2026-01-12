import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import PaymentDetailsModal from "../Payment/PaymentDetailsModal";
import LoanDetailsModal from "./LoanDetailsModal";
import { FaEye, FaTimes, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openLoanModal, setOpenLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const { data: loans = [], refetch } = useQuery({
    queryKey: ["myloans", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancelLoan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this loan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0050b2",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/loans/${id}`);

        if (res.data?.deletedCount > 0) {
          Swal.fire({
            title: "Cancelled!",
            text: "Loan has been cancelled.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          refetch(); // refresh table
        }
      }
    });
  };

  const handlePayment = async (loan) => {
    const paymentInfo = {
      cost: loan.applicationFee,
      loanId: loan._id,
      email: loan.email,
      loanTitle: loan.loanTitle,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  // payment details modal
  const handleOpenPaymentModal = async (loanId) => {
    const res = await axiosSecure.get(`/payments?email=${user.email}`);
    setSelectedPayment(res.data[0]); // single payment entry
    setOpenModal(true);
  };

  // view loan details modal
  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setOpenLoanModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Loans
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Total Loans: <span className="font-semibold text-[#0050b2]">{loans.length}</span>
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table Head */}
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Loan Info
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
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
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No loans found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  loans.map((loan, index) => (
                    <tr 
                      key={loan._id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {loan._id.slice(0, 8)}...
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
                              : loan.status === "Approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-wrap gap-2">
                          {/* VIEW Button - always visible */}
                          <button
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0050b2] hover:bg-[#003d8a] text-white rounded-md transition-colors duration-200 text-xs font-medium"
                            onClick={() => handleViewLoan(loan)}
                            title="View Loan Details"
                          >
                            <FaEye />
                            <span className="hidden sm:inline">View</span>
                          </button>

                          {/* CANCEL Button - Only if status = Pending */}
                          {(loan.status === "fee-not-paid" ||
                            loan.status === "pending") && (
                            <button
                              onClick={() => handleCancelLoan(loan._id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
                              title="Cancel Loan"
                            >
                              <FaTimes />
                              <span className="hidden sm:inline">Cancel</span>
                            </button>
                          )}

                          {/* PAY Button - only if feeStatus = Unpaid */}
                          {loan.applicationFeeStatus === "unpaid" && (
                            <button
                              onClick={() => handlePayment(loan)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-xs font-medium"
                              title="Pay Application Fee"
                            >
                              <FaCreditCard />
                              <span className="hidden sm:inline">Pay</span>
                            </button>
                          )}

                          {/* PAID Badge instead of button */}
                          {loan.applicationFeeStatus === "paid" && (
                            <button
                              onClick={() => handleOpenPaymentModal(loan._id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 rounded-md transition-colors duration-200 text-xs font-medium cursor-pointer"
                              title="View Payment Details"
                            >
                              <FaCheckCircle />
                              Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal render */}
      {openModal && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setOpenModal(false)}
        />
      )}

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

export default MyLoans;