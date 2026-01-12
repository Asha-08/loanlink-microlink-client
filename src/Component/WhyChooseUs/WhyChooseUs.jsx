import { motion } from "framer-motion";
import { ShieldCheck, Clock, ThumbsUp, Users } from "lucide-react";

const features = [
  {
    title: "Trusted Platform",
    description: "We ensure transparency, security, and reliability in every loan process.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Processing",
    description: "Quick approvals and minimal paperwork to save your time.",
    icon: Clock,
  },
  {
    title: "Customer Friendly",
    description: "Simple terms, no hidden charges, and clear communication.",
    icon: ThumbsUp,
  },
  {
    title: "Growing Community",
    description: "Thousands of users trust us for their financial needs.",
    icon: Users,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We focus on trust, speed, and simplicity to deliver the best loan experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="
                  rounded-2xl
                  border border-gray-200 dark:border-gray-800
                  bg-white dark:bg-[#0f172a]
                  p-8
                  transition
                  hover:-translate-y-1 hover:shadow-lg
                "
              >
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
