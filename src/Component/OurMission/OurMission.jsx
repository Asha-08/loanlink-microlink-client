import { motion } from "framer-motion";
import { Target, ShieldCheck, Handshake } from "lucide-react";

const OurMission = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="inline-block bg-[#0050b2]/10 dark:bg-blue-400/10 text-[#0050b2] dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            Our Mission
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Building trust through{" "}
            <span className="text-[#0050b2] dark:text-blue-400">smart lending</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            We simplify access to secure, transparent microloans for individuals
            and businesses.
          </p>

          <div className="space-y-4 pt-4">
            {[ 
              { icon: Target, title: "Clear Goals", text: "Responsible and smart financial planning." },
              { icon: ShieldCheck, title: "Secure Platform", text: "Your data is always protected." },
              { icon: Handshake, title: "Community Impact", text: "Empowering entrepreneurs." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#0050b2] dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80"
            alt="Our Mission"
            className="w-full h-[420px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default OurMission;
