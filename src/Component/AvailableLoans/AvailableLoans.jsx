import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {loans.map((loan) => (
        <div key={loan._id} className="card bg-white shadow-md p-4 rounded">
          <img
            src={loan.image}
            alt={loan.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-xl font-bold mt-2">{loan.title}</h3>
          <p className="text-gray-600 mt-1">
            {loan.shortDescription || loan.description?.slice(0, 100)}...
          </p>
          <p className="mt-2 font-semibold">Max Loan: ${loan.maxLoanLimit}</p>

          <button
                  onClick={() => navigate(`/loans/${loan._id}`)}
                  className="btn bg-linear-to-tr from-pink-400 to-pink-600 transition btn-sm text-white"
                >
                  View Details
                </button>

        </div>
      ))}
    </div>
  );
};

export default AvailableLoans;
