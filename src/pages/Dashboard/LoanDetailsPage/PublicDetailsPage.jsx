import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const PublicDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role, setRole] = useState("user");

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/addloans/${id}`);
      return res.data;
    },
  });

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}/role`).then((res) => {
        setRole(res.data.role); // manager, admin, or user
      });
    }
  }, [user?.email]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const canApply = role !== "manager" && role !== "admin";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={loan.image}
        alt={loan.title}
        className="w-full h-84 object-cover rounded"
      />

      <h2 className="text-3xl font-bold mt-6">{loan.title}</h2>

      <p className="mt-2 text-gray-600">{loan.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <p>
          <strong>Category:</strong> {loan.category}
        </p>
        <p>
          <strong>Interest Rate:</strong> {loan.interestRate}%
        </p>
        <p>
          <strong>Max Limit:</strong> ৳{loan.maxLoanLimit}
        </p>
        <p>
          <strong>EMI Plans:</strong> {loan.emiPlans}
        </p>
        <p>
          <strong>Required Documents:</strong> {loan.requiredDocuments}
        </p>
      </div>

      {/* Apply Now Button */}
      {canApply ? (
        <Link
          to="/apply-loan"
          state={{ title: loan.title, interestRate: loan.interestRate }}
          className="btn btn-primary mt-6"
        >
          Apply Now
        </Link>
      ) : (
        <button className="btn btn-secondary mt-6" disabled>
          Only borrowers/user can apply
        </button>
      )}
    </div>
  );
};

export default PublicDetailsPage;
