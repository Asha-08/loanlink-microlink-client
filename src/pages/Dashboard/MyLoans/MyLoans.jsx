import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: loans = [],refetch } = useQuery({
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
      cancelButtonColor: "#3085d6",
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

  return (
    <div>
      <h2>All of my loans: {loans.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th> Loan ID </th>
              <th> Loan Info</th>
              <th> Amount</th>
              <th> Status</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan,index) => (
              <tr key={loan._id}>
                <th>{index+1}</th>
                <td>{loan._id}</td>
                <td>{loan.loanTitle}</td>
                <td>${loan.loanAmount}</td>
                <td
                    className={`badge ${
                      loan.status === "pending"
                        ? "badge-warning"
                        : loan.status === "Approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {loan.status}
                  </td>
                <td>
                    {/* VIEW Button - always visible */}
                  <button className="btn btn-info btn-sm text-white">
                    View
                  </button>

                    {/* CANCEL Button - Only if status = Pending */}
                  {loan.status === "pending" && (
                    <button
                    onClick={() => handleCancelLoan(loan._id)}
                     className="btn btn-error btn-sm text-white mx-2">
                      Cancel
                    </button>
                  )}
                    {/* PAY Button - only if feeStatus = Unpaid */}
                  {loan.applicationFeeStatus === "unpaid" && (
                    <button className="btn btn-warning btn-sm text-white">
                      Pay
                    </button>
                  )}

                  {/* PAID Badge instead of button */}
                  {loan.applicationFeeStatus === "Paid" && (
                    <span className="badge badge-success">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoans;
