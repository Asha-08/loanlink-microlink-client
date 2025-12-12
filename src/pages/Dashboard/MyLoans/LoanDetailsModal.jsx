import React from 'react'

const LoanDetailsModal = ({ loan, onClose }) => {

    if (!loan) return null;


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto shadow-xl relative animate-scaleUp">

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Loan Details
        </h2>

        <div className="space-y-2 text-sm">
          <p><strong>Loan Title:</strong> {loan.loanTitle}</p>
          <p><strong>Applicant Name:</strong> {loan.firstName} {loan.lastName}</p>
          <p><strong>Contact Number:</strong> {loan.contactNumber}</p>
          <p><strong>NID:</strong> {loan.nid}</p>
          <p><strong>Income Source:</strong> {loan.incomeSource}</p>
          <p><strong>Monthly Income:</strong> {loan.monthlyIncome}</p>
          <p><strong>Loan Amount:</strong> {loan.loanAmount}</p>
          <p><strong>Interest Rate:</strong> {loan.inerestRate}</p>
          <p><strong>Reason:</strong> {loan.reason}</p>
          <p><strong>Address:</strong> {loan.address}</p>
          <p><strong>Extra Notes:</strong> {loan.extraNotes}</p>
          <p><strong>Email:</strong> {loan.email}</p>
          <p><strong>Application Fee:</strong> ${loan.applicationFee}</p>
          <p><strong>Fee Status:</strong> {loan.applicationFeeStatus}</p>
          <p><strong>Status:</strong> {loan.status}</p>
          <p>
            <strong>Applied At:</strong>{" "}
            {new Date(loan.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default LoanDetailsModal