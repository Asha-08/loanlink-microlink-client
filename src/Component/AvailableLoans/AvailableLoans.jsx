import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

const AvailableLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addloans/home");
      return res.data;
    },
  });
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
   <div className="max-w-7xl mx-auto p-6 text-center">
    <h2 className="text-4xl font-bold mb-4 text-pink-500">
          Explore Available Loans
        </h2>
        <p className="text-gray-400 mb-12">
          Compare loan types, interest rates, and apply easily.
        </p>
     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {loans.map((loan) => (
        <div key={loan._id} className="card bg-white shadow-md p-4 rounded">
          <img
            src={loan.image}
            alt={loan.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-xl text-gray-600 font-bold mt-2">{loan.title}</h3>
          <p className="text-gray-600 mt-1">
            {loan.shortDescription || loan.description?.slice(0, 100)}...
          </p>
          <p className="mt-2 font-semibold text-gray-600">Max Loan: ${loan.maxLoanLimit}</p>

          <button
                  onClick={() => navigate(`/loans/${loan._id}`)}
                  className="btn bg-linear-to-tr from-pink-400 to-pink-600 transition btn-sm text-white"
                >
                  View Details
                </button>

        </div>
      ))}
    </div>
    <Link
        to="/all-loans"
        className="
          btn
          my-6
          bg-pink-500
          text-white 
          bottom-4 right-4
          sm:bottom-6 sm:right-6
        "
      >
       View All Loans
      </Link>
   </div>
  );
};

export default AvailableLoans;
