import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addloans");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading loans...</p>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        All Available Loans
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <figure>
              <img
                src={loan.image}
                alt={loan.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            {/* Content */}
            <div className="card-body">
              <h3 className="card-title">{loan.title}</h3>

              <p className="text-sm text-gray-500">
                Category: {loan.category}
              </p>

              <p>
                <strong>Interest:</strong> {loan.interestRate}%
              </p>

              <p>
                <strong>Max Limit:</strong> ৳{loan.maxLoanLimit}
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => navigate(`/loans/${loan._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllLoans