import React from 'react'

const steps = [
  {
    title: "Sign Up",
    description: "Create your account quickly and securely to get started.",
    icon: "📝",
  },
  {
    title: "Choose Loan",
    description: "Select the best loan option that fits your needs.",
    icon: "💰",
  },
  {
    title: "Apply",
    description: "Fill out a simple form and submit your application.",
    icon: "📤",
  },
  {
    title: "Get Approved",
    description: "Get fast approval and receive your funds quickly.",
    icon: "✅",
  },
  {
    title: "Receive Funds",
    description: "Funds will be transferred directly to your account.",
    icon: "💳",
  },
  {
    title: "Manage Loan",
    description: "Track your repayment schedule and manage your loan easily.",
    icon: "📊",
  },
];

const HowItWorks = () => {
  return (
     <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-pink-500">
          How It Works
        </h2>
        <p className="text-gray-400 mb-12">
          Follow these simple steps to apply and manage your loan seamlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-pink-50 border border-pink-200 rounded-xl p-6 flex flex-col items-center text-center shadow-md"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-pink-500 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks