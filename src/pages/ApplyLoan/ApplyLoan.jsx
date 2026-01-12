import React from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIdCard, 
  FaBriefcase, 
  FaDollarSign, 
  FaFileAlt, 
  FaMapMarkerAlt,
  FaStickyNote
} from "react-icons/fa";

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
  const navigate = useNavigate();

  const handleLoanApplication = (data) => {
    data.email = user?.email;
    data.interestRate = loanData?.interestRate || "10%";
    data.loanTitle = loanData?.title;

    console.log("Final Data sent to backend", data);
    let cost = 10;
    data.applicationFee = cost;
    data.status = "fee-not-paid";
    (data.applicationFeeStatus = "unpaid"),
      (data.createdAt = new Date()),
      console.log("application fee:", cost);
    // SweetAlert for confirmation
    Swal.fire({
      title: "Confirm Application Fee?",
      text: `You will be charged ${cost}$ as an application fee.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0050b2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Proceed to Payment",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the loan info in to the database
        axiosSecure.post("/loans", data).then((res) => {
          console.log("after saving loan", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-loans");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Loan application has created",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Loan Application Form
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below to apply for your loan
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit(handleLoanApplication)}
            className="space-y-6"
          >
            {/* =================== AUTO-FILLED FIELDS SECTION =================== */}
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 border border-blue-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#0050b2] text-white rounded-full flex items-center justify-center text-sm">1</span>
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaEnvelope className="inline mr-2 text-[#0050b2]" />
                    User Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                  />
                </div>

                {loanData?.title ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#0050b2]" />
                      Loan Title
                    </label>
                    <input
                      type="text"
                      value={loanData.title}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaFileAlt className="inline mr-2 text-[#0050b2]" />
                      Loan Title
                    </label>
                    <input
                      type="text"
                      {...register("loanTitle", { required: true })}
                      placeholder="Enter Loan Title"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    />
                    {errors.loanTitle && (
                      <p className="text-red-500 text-sm mt-1">Loan title is required</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Interest Rate
                  </label>
                  <input
                    type="text"
                    value={loanData.interestRate || "10"}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* =================== PERSONAL INFORMATION =================== */}
            <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-6 border border-green-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#0050b2] text-white rounded-full flex items-center justify-center text-sm">2</span>
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaUser className="inline mr-2 text-[#0050b2]" />
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName", { required: true })}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">First name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FaUser className="inline mr-2 text-[#0050b2]" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">Last name is required</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaPhone className="inline mr-2 text-[#0050b2]" />
                    Contact Number
                  </label>
                  <input
                    type="text"
                    {...register("contactNumber", {
                      required: true,
                      pattern: /^[0-9]+$/,
                    })}
                    placeholder="Enter your contact number"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                  />
                  {errors.contactNumber?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1">Contact number is required</p>
                  )}
                  {errors.contactNumber?.type === "pattern" && (
                    <p className="text-red-500 text-sm mt-1">Numbers only</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaIdCard className="inline mr-2 text-[#0050b2]" />
                    National ID / Passport Number
                  </label>
                  <input
                    type="text"
                    {...register("nid", { required: true, pattern: /^[0-9]+$/ })}
                    placeholder="Enter your National ID / Passport number"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                  />
                  {errors.nid?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1">NID/Passport is required</p>
                  )}
                  {errors.nid?.type === "pattern" && (
                    <p className="text-red-500 text-sm mt-1">Numbers only</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-[#0050b2]" />
                    Address
                  </label>
                  <textarea
                    {...register("address", { required: true })}
                    placeholder="Enter your complete address"
                    rows="3"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100 resize-none"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">Address is required</p>
                  )}
                </div>
              </div>
            </div>

            {/* =================== FINANCIAL INFORMATION =================== */}
            <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-6 border border-purple-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#0050b2] text-white rounded-full flex items-center justify-center text-sm">3</span>
                Financial Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaBriefcase className="inline mr-2 text-[#0050b2]" />
                    Income Source
                  </label>
                  <input
                    type="text"
                    {...register("incomeSource", { required: true })}
                    placeholder="e.g., Employment, Business, Freelance"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                  />
                  {errors.incomeSource && (
                    <p className="text-red-500 text-sm mt-1">Income source is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaDollarSign className="inline mr-2 text-[#0050b2]" />
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    {...register("monthlyIncome", { required: true, min: 0 })}
                    placeholder="Enter your monthly income"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    onWheel={(e) => e.target.blur()}
                  />
                  {errors.monthlyIncome?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1">Monthly income is required</p>
                  )}
                  {errors.monthlyIncome?.type === "min" && (
                    <p className="text-red-500 text-sm mt-1">Income cannot be negative</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaDollarSign className="inline mr-2 text-[#0050b2]" />
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    {...register("loanAmount", { required: true, min: 1 })}
                    placeholder="Enter requested loan amount"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    onWheel={(e) => e.target.blur()}
                  />
                  {errors.loanAmount?.type === "required" && (
                    <p className="text-red-500 text-sm mt-1">Loan amount is required</p>
                  )}
                  {errors.loanAmount?.type === "min" && (
                    <p className="text-red-500 text-sm mt-1">Amount must be greater than 0</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaFileAlt className="inline mr-2 text-[#0050b2]" />
                    Reason for Loan
                  </label>
                  <textarea
                    {...register("reason", { required: true })}
                    placeholder="Explain why you need this loan"
                    rows="4"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100 resize-none"
                  ></textarea>
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">Reason is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <FaStickyNote className="inline mr-2 text-[#0050b2]" />
                    Extra Notes (Optional)
                  </label>
                  <textarea
                    {...register("extraNotes")}
                    placeholder="Any additional information you'd like to share"
                    rows="3"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0050b2] focus:border-transparent transition-all text-gray-900 dark:text-gray-100 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* =================== SUBMIT BUTTON =================== */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-[#0050b2] hover:bg-[#003d8a] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Application
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                An application fee of $10 will be charged upon submission
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;