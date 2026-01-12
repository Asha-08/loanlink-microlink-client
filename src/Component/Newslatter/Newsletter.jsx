import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, TrendingUp, Bell, Gift } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      text: "Financial tips & insights"
    },
    {
      icon: Bell,
      text: "Latest loan updates"
    },
    {
      icon: Gift,
      text: "Exclusive offers"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-[#0050b2] to-[#0066e6] dark:from-[#003d8f] dark:to-[#0050b2] rounded-3xl shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">Stay Connected</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                  Subscribe to Our Newsletter
                </h2>

                <p className="text-lg text-white/90 mb-6">
                  Get the latest updates, financial tips, and exclusive offers delivered straight to your inbox.
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Subscription Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl"
            >
              {!isSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                      <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#0050b2] hover:bg-[#003d8f] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from LoanLink.
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Successfully Subscribed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for subscribing. Check your inbox for confirmation.
                  </p>
                </motion.div>
              )}
            </motion.div>

          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 text-gray-600 dark:text-gray-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#0050b2] dark:text-blue-400" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#0050b2] dark:text-blue-400" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#0050b2] dark:text-blue-400" />
            <span>10K+ subscribers</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;