import React from "react";

const features = [
  {
    title: "Fast Approval",
    desc: "Get quick loan approval with a simple and transparent process.",
    icon: "⚡",
  },
  {
    title: "Secure Process",
    desc: "Your data is fully protected with industry-standard security.",
    icon: "🔒",
  },
  {
    title: "Flexible Loans",
    desc: "Choose loan plans that best match your financial needs.",
    icon: "📄",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always ready to assist you.",
    icon: "💬",
  },
];

const WhyChooseUs = () => {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-500 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-400 mb-12">
          We provide reliable, secure, and user-friendly loan solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-pink-50 p-6 rounded-xl shadow-md text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-pink-500 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
