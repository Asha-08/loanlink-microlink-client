import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans?status=pending");
      return res.data;
    },
  });

  const handleUpdateStatus = async (loan, status) => {
    const res = await axiosSecure.patch(`/loans/${loan._id}/status`, {
      status,
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire(
        status === "approved" ? "Approved!" : "Rejected!",
        `Loan has been ${status}.`,
        status === "approved" ? "success" : "info"
      );
      refetch();
    }
  };

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded ${
              filter === f
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-pink-300 hover:text-white transition"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-pink-100 text-pink-700">
            <tr>
              <th className="border px-4 py-2 text-left">Loan ID</th>
              <th className="border px-4 py-2 text-left">User</th>
              <th className="border px-4 py-2 text-left">Loan Category</th>
              <th className="border px-4 py-2 text-left">Amount</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
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
                    onClick={() =>
                      (window.location.href = `/dashboard/loan/${loan._id}`)
                    }
                    className="btn btn-outline btn-sm bg-linear-to-tr from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingApplications;
