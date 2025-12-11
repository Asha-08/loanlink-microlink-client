import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { loanId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: loan } = useQuery({
    queryKey: ["loans", loanId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${loanId}`);
      return res.data;
    },
  });

  const handlePayment = async() => {
        const paymentInfo = {
            cost: loan.applicationFee,
            loanId: loan._id,
            email: loan.email,
            loanTitle: loan.loanTitle
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        console.log(res.data);

        window.location.href = res.data.url;
    }


  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h2>Please Pay ${loan.applicationFee} application fee for: {loan.loanTitle}</h2>
      <button onClick={handlePayment} className="btn btn-warning btn-sm text-white">Pay</button>
    </div>
  );
};

export default Payment;
