import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const AddLoan = () => {
  const {user} = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgbbKey = import.meta.env.VITE_image_host_key;

    setLoading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) setImageURL(data.data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (!imageURL) {
      Swal.fire("Error", "Please upload an image first", "error");
      return;
    }

    const loanData = {
      title: data.title,
      description: data.description,
      category: data.category,
      interestRate: parseFloat(data.interestRate),
      maxLoanLimit: parseFloat(data.maxLoanLimit),
      requiredDocuments: data.requiredDocuments,
      emiPlans: data.emiPlans,
      image: imageURL,
      showOnHome: data.showOnHome || false,
      createdBy: {
        email: user?.email,
        name: user?.displayName
      },
      createdAt: new Date()
    };

    axiosSecure.post("/addloans", loanData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Loan added successfully", "success");
          reset();
          setImageURL("");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg mx-auto shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add Loan</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Loan Title */}
        <div>
          <label className="label">Loan Title*</label>
          <input
            type="text"
            placeholder="Loan Title"
            {...register("title", { required: true })}
            className="input w-full"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
            className="input w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category*</label>
          <input
            type="text"
            placeholder="Category"
            {...register("category", { required: true })}
            className="input w-full"
          />
          {errors.category && <p className="text-red-500">Category is required</p>}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="label">Interest Rate* (%)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Interest Rate"
            {...register("interestRate", { required: true })}
            onWheel={(e) => e.target.blur()}
            className="input w-full"
          />
          {errors.interestRate && <p className="text-red-500">Interest Rate is required</p>}
        </div>

        {/* Max Loan Limit */}
        <div>
          <label className="label">Max Loan Limit*</label>
          <input
            type="number"
            placeholder="Max Loan Limit"
            {...register("maxLoanLimit", { required: true })}
            onWheel={(e) => e.target.blur()}
            className="input w-full"
          />
          {errors.maxLoanLimit && <p className="text-red-500">Max Loan Limit is required</p>}
        </div>

        {/* Required Documents */}
        <div>
          <label className="label">Required Documents (comma separated)</label>
          <input
            type="text"
            placeholder="Passport, ID, etc."
            {...register("requiredDocuments")}
            className="input w-full"
          />
        </div>

        {/* EMI Plans */}
        <div>
          <label className="label">EMI Plans (comma separated)</label>
          <input
            type="text"
            placeholder="3 months, 6 months, 12 months"
            {...register("emiPlans")}
            className="input w-full"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Loan Image*</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="file-input w-full"
          />
          {loading && <p>Uploading image...</p>}
          {imageURL && <img src={imageURL} alt="Loan" className="w-32 mt-2" />}
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("showOnHome")} />
          <label>Show on Home</label>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Loan
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
