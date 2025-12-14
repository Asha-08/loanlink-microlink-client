import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch single loan data
  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/addloans/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Populate form once loan data is fetched
  useEffect(() => {
    if (loan) {
      reset({
        title: loan.title || "",
        description: loan.description || "",
        category: loan.category || "",
        interestRate: loan.interestRate || "",
        maxLoanLimit: loan.maxLoanLimit || "",
        emiPlans: loan.emiPlans || "",
        requiredDocuments: loan.requiredDocuments || "",
        image: loan.image || "",
      });
    }
  }, [loan, reset]);

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/addloans/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Loan updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
           navigate(-1);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to update loan",
          text: err.message,
        });
      });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <FaSpinner className="animate-spin text-3xl mx-auto" />
        <p>Loading loan details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Loan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold">Loan Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="font-semibold">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            {...register("interestRate", { required: "Interest rate required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.interestRate && (
            <p className="text-red-500 text-sm">{errors.interestRate.message}</p>
          )}
        </div>

        {/* Max Loan Limit */}
        <div>
          <label className="font-semibold">Max Loan Limit (৳)</label>
          <input
            type="number"
            {...register("maxLoanLimit", { required: "Max loan limit required" })}
            className="input input-bordered w-full mt-1"
          />
          {errors.maxLoanLimit && (
            <p className="text-red-500 text-sm">{errors.maxLoanLimit.message}</p>
          )}
        </div>

        {/* EMI Plans */}
        <div>
          <label className="font-semibold">EMI Plans</label>
          <input
            type="text"
            {...register("emiPlans")}
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Required Documents */}
        <div>
          <label className="font-semibold">Required Documents</label>
          <input
            type="text"
            {...register("requiredDocuments")}
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="font-semibold">Loan Image URL</label>
          <input
            type="text"
            {...register("image")}
            className="input input-bordered w-full mt-1"
          />
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full mt-4">Update Loan</button>
      </form>
    </div>
  );
};

export default UpdateLoan;
