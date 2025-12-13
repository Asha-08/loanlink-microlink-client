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
    <div>
      <h2 className="text-3xl">PendingApplications:{loans.length}</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full bg-base-100">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Date</th>
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

                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleUpdateStatus(loan, "approved")}
                    className="btn btn-success btn-sm text-white"
                  >
                    Approve
                  </button>

                  <button
                     onClick={() => handleUpdateStatus(loan, "rejected")}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>

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
  );
};

export default PendingApplications;
