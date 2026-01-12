import { motion } from "framer-motion";
import { Calculator, DollarSign, Calendar, Percent, TrendingUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [interestRate, setInterestRate] = useState(8.5);

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = duration;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * duration;
  const totalInterest = totalPayment - loanAmount;

  const benefits = [
    { icon: CheckCircle2, text: "Instant approval decision" },
    { icon: CheckCircle2, text: "Flexible repayment terms" },
    { icon: CheckCircle2, text: "No hidden fees" },
    { icon: CheckCircle2, text: "Early repayment option" }
  ];

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#0050b2]/10 dark:bg-blue-400/10 text-[#0050b2] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Plan Your Loan
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Calculate Your{" "}
            <span className="text-[#0050b2] dark:text-blue-400">Monthly Payment</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get an instant estimate of your loan payments with our interactive calculator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 md:p-10 rounded-3xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#0050b2] dark:bg-blue-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loan Calculator
              </h3>
            </div>

            <div className="space-y-8">
              
              {/* Loan Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Loan Amount
                  </label>
                  <span className="text-2xl font-bold text-[#0050b2] dark:text-blue-400">
                    ${loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #0050b2 0%, #0050b2 ${((loanAmount - 1000) / (50000 - 1000)) * 100}%, #d1d5db ${((loanAmount - 1000) / (50000 - 1000)) * 100}%, #d1d5db 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>$1,000</span>
                  <span>$50,000</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Loan Duration
                  </label>
                  <span className="text-2xl font-bold text-[#0050b2] dark:text-blue-400">
                    {duration} months
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #0050b2 0%, #0050b2 ${((duration - 6) / (60 - 6)) * 100}%, #d1d5db ${((duration - 6) / (60 - 6)) * 100}%, #d1d5db 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>6 months</span>
                  <span>60 months</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Interest Rate
                  </label>
                  <span className="text-2xl font-bold text-[#0050b2] dark:text-blue-400">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #0050b2 0%, #0050b2 ${((interestRate - 5) / (20 - 5)) * 100}%, #d1d5db ${((interestRate - 5) / (20 - 5)) * 100}%, #d1d5db 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>5.0%</span>
                  <span>20.0%</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Monthly Payment - Main Result */}
            <div className="bg-gradient-to-br from-[#0050b2] to-[#0066e6] dark:from-[#003d8f] dark:to-[#0050b2] p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 text-sm font-semibold">Monthly Payment</span>
              </div>
              <div className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                ${monthlyPayment.toFixed(2)}
              </div>
              <p className="text-white/80 text-sm">
                Estimated monthly installment
              </p>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Total Payment
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalPayment.toFixed(2)}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Total Interest
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalInterest.toFixed(2)}
                </div>
              </div>
            </div>

           

            {/* CTA Button */}
            <Link to={"/apply-loan"} className="w-full bg-[#0050b2] hover:bg-[#003d8f] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group">
              <span className="text-lg">Apply for This Loan</span>
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              *This is an estimate. Final terms may vary based on your credit profile.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LoanCalculator;