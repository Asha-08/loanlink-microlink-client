import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ApprovedApplication = () => {

   const axiosSecure = useAxiosSecure();
    const { data: loans = [], } = useQuery({
      queryKey: ["loans", "approved"],
      queryFn: async () => {
        const res = await axiosSecure.get("/loans?status=approved");
        return res.data;
      },
    });

  return (
    <div>
      <h2>Approved Applications:{loans.length}</h2>

        <div className="overflow-x-auto rounded-xl shadow ">
        <table className="table w-full bg-base-100">
          <thead className="bg-base-200 text-base bg-linear-to-r from-pink-600 to-pink-400 text-white">
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover">
                <td className="font-mono text-sm">{loan._id}</td>

                <td>
                  <div className="font-semibold">{`${loan.firstName} ${loan.lastName}`}</div>
                  <div className="text-sm opacity-70">{loan.email}</div>
                </td>

                <td className="font-semibold">${loan.loanAmount}</td>

                <td>{new Date(loan.approveAt).toLocaleDateString()}</td>

                <td className="flex gap-2 justify-center">
                 
                  <button
                    onClick={() =>
                      (window.location.href = `/dashboard/loan/${loan._id}`)
                    }
                    className="btn btn-outline btn-sm bg-linear-to-tr from-pink-400 to-pink-600 text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {loans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pending loan applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApprovedApplication