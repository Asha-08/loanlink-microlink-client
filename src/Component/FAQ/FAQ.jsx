import React from "react";

const faqs = [
  {
    question: "Who can apply for a loan?",
    answer:
      "Any registered user who meets the basic eligibility criteria can apply.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most loan applications are reviewed and approved within 24 hours.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we use advanced security measures to protect your personal data.",
  },
  {
    question: "Can I track my loan status?",
    answer:
      "Absolutely! You can track your loan status from your dashboard.",
  },
];

const FAQ = () => {
  return (
    <section className=" py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-pink-500 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-pink-200 rounded-lg p-5"
            >
              <h3 className="font-semibold text-lg text-pink-500 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
