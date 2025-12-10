import React from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplyLoan = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Loan data passed from previous page (if any)
  const loanData = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
   
  const axiosSecure = useAxiosSecure();


  const handleLoanApplication = (data) => {
    data.email = user?.email;
    data.inerestRate = loanData?.inerestRate || "10%";
    console.log("Final Data sent to backend", data);
    let cost = 10;
    data.applicationFee = cost;
    data.status = "pending";
    data.applicationFeeStatus = "unpaid",
    data.createdAt = new Date(),

    console.log("application fee:", cost);
    // SweetAlert for confirmation
    Swal.fire({
      title: "Confirm Application Fee?",
      text: `You will be charged ${cost}$ as an application fee.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Proceed to Payment",
    }).then((result)=>{
        if(result.isConfirmed){
            
            // save the loan info in to the database
            axiosSecure.post('/loans',data)
            .then(res=>{
                console.log('after saving loan',res.data);
            })
        }
    })
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Loan Application Form
      </h2>

      <form
        onSubmit={handleSubmit(handleLoanApplication)}
        className="space-y-5"
      >
        {/* =================== AUTO-FILLED FIELDS =================== */}
        <div>
          <label className="font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100"
          />
        </div>

        {loanData?.title ? (
          <div>
            <label className="font-semibold">Loan Title</label>
            <input
              type="text"
              value={loanData.title}
              readOnly
              className="input input-bordered w-full mt-1 bg-gray-100"
            />
          </div>
        ) : (
          <div>
            <label className="font-semibold">Loan Title</label>
            <input
              type="text"
              {...register("loanTitle", { required: true })}
              placeholder="Enter Loan Title"
              className="input input-bordered w-full mt-1"
            />
            {errors.loanTitle && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
        )}

        <div>
          <label className="font-semibold">Interest Rate</label>
          <input
            type="text"
            value={loanData.interestRate || "10%"}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100"
          />
        </div>

        {/* =================== USER INPUT FIELDS =================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="input input-bordered w-full mt-1"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="input input-bordered w-full mt-1"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
        </div>

        <div>
          <label className="font-semibold">Contact Number</label>
          <input
            type="text"
            {...register("contactNumber", { required: true })}
            className="input input-bordered w-full mt-1"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">National ID / Passport Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="input input-bordered w-full mt-1"
          />
          {errors.nid && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Income Source</label>
          <input
            type="text"
            {...register("incomeSource", { required: true })}
            className="input input-bordered w-full mt-1"
          />
          {errors.incomeSource && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Monthly Income</label>
          <input
            type="number"
            {...register("monthlyIncome", { required: true })}
            className="input input-bordered w-full mt-1"
          />
          {errors.monthlyIncome && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Loan Amount</label>
          <input
            type="number"
            {...register("loanAmount", { required: true })}
            className="input input-bordered w-full mt-1"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Reason for Loan</label>
          <textarea
            {...register("reason", { required: true })}
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
          {errors.reason && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Address</label>
          <textarea
            {...register("address", { required: true })}
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Extra Notes (Optional)</label>
          <textarea
            {...register("extraNotes")}
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
        </div>

        {/* =================== SUBMIT BUTTON =================== */}
        <button className="btn btn-primary w-full mt-4">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
