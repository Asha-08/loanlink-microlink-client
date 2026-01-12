import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Who can apply for a loan?",
    answer:
      "Any registered user who meets our eligibility criteria can apply for a loan.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most loan applications are reviewed and approved within 24–48 hours.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No. We believe in transparency. All charges are clearly shown before confirmation.",
  },
  {
    question: "How will I receive the loan amount?",
    answer:
      "Approved funds are transferred directly to your registered bank account.",
  },
  {
    question: "Can I track my loan status?",
    answer:
      "Yes, you can monitor repayment schedules and loan status from your dashboard.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find quick answers to common questions about our loan process.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-[#0f172a]"
              >
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
