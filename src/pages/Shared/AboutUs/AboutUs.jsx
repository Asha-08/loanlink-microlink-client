import { motion } from "framer-motion";
import { Zap, Lock, DollarSign, Handshake, Smartphone, Star } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { number: "10K+", label: "Loans Approved" },
    { number: "$50M+", label: "Funded Amount" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Approval",
      description: "Get your loan approved within 24 hours with our streamlined digital process and instant verification system."
    },
    {
      icon: Lock,
      title: "Secure & Safe",
      description: "Your data is protected with bank-level encryption and security measures to ensure complete privacy."
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Enjoy some of the lowest interest rates in the market with transparent terms and no hidden fees."
    },
    {
      icon: Handshake,
      title: "Flexible Terms",
      description: "Choose repayment plans that work for you with customizable loan terms and flexible payment options."
    },
    {
      icon: Smartphone,
      title: "Digital First",
      description: "Complete your entire loan journey from application to disbursement through our user-friendly platform."
    },
    {
      icon: Star,
      title: "Expert Support",
      description: "Our dedicated team is always ready to guide you through every step of your financial journey."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
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
            About LoanLink
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Empowering Dreams Through Microloans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connecting opportunities with possibilities through accessible financial inclusion
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop"
                alt="Financial Planning and Growth"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0050b2]/20 to-transparent" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Connecting Opportunities with{" "}
              <span className="text-[#0050b2] dark:text-blue-400">Possibilities</span>
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              At LoanLink, we believe that everyone deserves access to financial opportunities. Our platform bridges the gap between aspiring entrepreneurs and their dreams by providing quick, transparent, and affordable microloans.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded with a mission to promote financial inclusion, we've helped thousands of individuals and small businesses access the capital they need to grow, innovate, and succeed. Our streamlined process ensures that financial assistance is just a few clicks away.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We leverage technology to make lending smarter, faster, and more accessible. With competitive rates, flexible terms, and a commitment to transparency, LoanLink is your trusted partner in financial growth.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0050b2] to-[#0066e6] dark:from-[#003d8f] dark:to-[#0050b2] p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#0050b2] to-[#0066e6] rounded-xl flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;