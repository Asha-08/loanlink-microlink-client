import React from 'react'
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const LoansDetailsPage = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

   if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  return (
     <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      {/* Card */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative ">

        {/* Header */}
        <div className="bg-linear-to-r from-pink-600 to-pink-400 text-white p-10 relative flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Loan Application Details</h2>
          <p className="text-sm opacity-90">
            Application ID: {loan._id}
          </p>

          <span
            className={`absolute bottom-2  px-3 py-1 rounded-full text-xs font-semibold
              ${
                loan.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : loan.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : loan.status === "fee-not-paid"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-yellow-200 text-yellow-700"
              }
              
            `}
          >
            {loan.status}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-sm">

          {/* Applicant Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Applicant Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Name" value={`${loan.firstName} ${loan.lastName}`} />
              <Info label="Email" value={loan.email} />
              <Info label="Contact" value={loan.contactNumber} />
              <Info label="NID" value={loan.nid} />
              <Info label="Address" value={loan.address} />
            </div>
          </section>

          {/* Loan Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Loan Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Loan Title" value={loan.loanTitle} />
              <Info label="Loan Amount" value={`$${loan.loanAmount}`} />
              <Info label="Interest Rate" value={`${loan.inerestRate}`} />
              <Info label="Reason" value={loan.reason} />
            </div>
          </section>

          {/* Financial Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Financial Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Income Source" value={loan.incomeSource} />
              <Info label="Monthly Income" value={`$${loan.monthlyIncome}`} />
              <Info label="Application Fee" value={`$${loan.applicationFee}`} />
              <Info label="Fee Status" value={loan.applicationFeeStatus} />
            </div>
          </section>

          {/* Meta */}
          <section>
            <Info
              label="Applied At"
              value={new Date(loan.createdAt).toLocaleString()}
            />
            {loan.extraNotes && (
              <Info label="Extra Notes" value={loan.extraNotes} />
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm bg-linear-to-tr from-pink-400 to-pink-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 wrap-break-word">
      {value || "—"}
    </p>
  </div>
  )


export default LoansDetailsPage