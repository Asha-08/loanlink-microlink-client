import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const AdminAllLoans = () => {
  const axiosSecure = useAxiosSecure();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // fetch loans
  const {
    data: loans = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addloans");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // pagination calculations
  const totalPages = Math.ceil(loans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLoans = loans.slice(startIndex, endIndex);

  // toggle show on home
  const toggleShowOnHome = async (loan) => {
    try {
      await axiosSecure.patch(`/addloans/${loan._id}/showOnHome`, {
        showOnHome: !loan.showOnHome,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: loan.showOnHome ? "Removed from Home" : "Shown on Home",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // delete loan
  const handleDelete = (loan) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/addloans/${loan._id}`);
        refetch();
        Swal.fire("Deleted!", "Loan has been deleted.", "success");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center">Admin - All Loans</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentLoans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td>{loan.title}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td>
                  <p>{loan.createdBy?.name}</p>
                  <p className="text-xs text-gray-500">
                    {loan.createdBy?.email}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => toggleShowOnHome(loan)}
                    className="text-xl"
                  >
                    {loan.showOnHome ? (
                      <FaEye className="text-green-500" />
                    ) : (
                      <FaEyeSlash className="text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/update-loan/${loan._id}`}>
                    <button className="btn btn-sm btn-warning">
                      <FaEdit /> Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(loan)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${
              currentPage === num + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Info */}
      <p className="text-center text-sm text-gray-500 mt-2">
        Showing {startIndex + 1}–{Math.min(endIndex, loans.length)} of{" "}
        {loans.length} loans
      </p>
    </div>
  );
};

export default AdminAllLoans;
