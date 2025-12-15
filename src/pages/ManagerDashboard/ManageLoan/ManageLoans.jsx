import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
   const [searchText, setSearchText] = useState("");
   const {
    data: loans = [],
    refetch,
  } = useQuery({
    queryKey: ["manager-all-loans", searchText],
    queryFn: async () => {
       const res = await axiosSecure.get(
        `/addloans?search=${searchText}`
      );
      return res.data;
    },
  });

  
  
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
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center"> All Loans</h2>

      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

       {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
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
    </div>
  )
}

export default ManageLoans