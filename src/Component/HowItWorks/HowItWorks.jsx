import React from "react";
import {
  UserPlus,
  HandCoins,
  FileText,
  CheckCircle,
  CreditCard,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your account quickly and securely to get started.",
    icon: UserPlus,
  },
  {
    title: "Choose Loan",
    description: "Select the best loan option that fits your needs.",
    icon: HandCoins,
  },
  {
    title: "Apply",
    description: "Fill out a simple form and submit your application.",
    icon: FileText,
  },
  {
    title: "Get Approved",
    description: "Get fast approval and receive your funds quickly.",
    icon: CheckCircle,
  },
  {
    title: "Receive Funds",
    description: "Funds will be transferred directly to your account.",
    icon: CreditCard,
  },
  {
    title: "Manage Loan",
    description: "Track your repayment schedule and manage your loan easily.",
    icon: BarChart3,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-14">
          Follow these simple steps to apply and manage your loan seamlessly.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="
                  group
                  rounded-2xl
                  border border-gray-200 dark:border-gray-800
                  bg-white dark:bg-[#0f172a]
                  p-8
                  transition
                  hover:shadow-lg hover:-translate-y-1
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-14 h-14 mx-auto mb-5
                    flex items-center justify-center
                    rounded-xl
                    bg-blue-50 dark:bg-blue-900/20
                    text-blue-600 dark:text-blue-400
                    group-hover:scale-110 transition
                  "
                >
                  <Icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
