import React from 'react'

const PaymentDetailsModal = ({ payment, onClose }) => {
    
    if (!payment) return null;


  return (
     <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50
                 animate-fadeIn"
    >
      <div
        className="bg-white p-6 rounded-xl w-96 shadow-xl relative 
                   animate-scaleUp"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Payment Details
        </h2>

        <div className="space-y-2 text-sm">
          <p><strong>Customer Email:</strong> {payment.customerEmail}</p>
          <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
          <p><strong>Loan ID:</strong> {payment.loanId}</p>
          <p><strong>Loan Title:</strong> {payment.loanTitle}</p>
          <p><strong>Amount:</strong> ${payment.amount}</p>
          <p><strong>Currency:</strong> {payment.currency}</p>
          <p><strong>Status:</strong> {payment.paymentStatus}</p>
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(payment.paidAt).toLocaleString()}
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

export default PaymentDetailsModal