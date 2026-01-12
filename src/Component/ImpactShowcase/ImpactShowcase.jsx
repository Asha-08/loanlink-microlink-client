import { motion } from "framer-motion";
import { TrendingUp, Users, Briefcase, GraduationCap, Store, Sprout } from "lucide-react";
import { Link } from "react-router";

const ImpactShowcase = () => {
  const stats = [
    { icon: Users, number: "15K+", label: "Lives Transformed" },
    { icon: Briefcase, number: "8K+", label: "Businesses Funded" },
    { icon: TrendingUp, number: "250%", label: "Average Growth" },
  ];

  const successStories = [
    {
      name: "Sarah Martinez",
      business: "Martinez Bakery",
      category: "Retail Business",
      icon: Store,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
      loanAmount: "$5,000",
      result: "Expanded from home kitchen to storefront",
      growth: "3x Revenue Growth",
      timeline: "12 months",
      description: "Started with a small home bakery, now employs 8 people and serves 200+ customers daily.",
      bgColor: "from-purple-500 to-pink-500"
    },
    {
      name: "James Okafor",
      business: "Green Farm Solutions",
      category: "Agriculture",
      icon: Sprout,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
      loanAmount: "$8,000",
      result: "Modernized farming equipment",
      growth: "5x Production",
      timeline: "18 months",
      description: "Transformed traditional farming methods with modern irrigation, now supplies 50+ local markets.",
      bgColor: "from-green-500 to-emerald-500"
    },
    {
      name: "Priya Sharma",
      business: "TechEd Academy",
      category: "Education",
      icon: GraduationCap,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      loanAmount: "$6,500",
      result: "Launched online coding bootcamp",
      growth: "500+ Students",
      timeline: "10 months",
      description: "Built a thriving online education platform teaching coding skills to underserved communities.",
      bgColor: "from-blue-500 to-cyan-500"
    }
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
            Real Impact, Real Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Transforming Lives Through{" "}
            <span className="text-[#0050b2] dark:text-blue-400">Microloans</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how our microloans have helped entrepreneurs turn their dreams into thriving businesses
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0050b2] to-[#0066e6] rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.business}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.bgColor} opacity-20`} />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <story.icon className="w-5 h-5 text-[#0050b2] dark:text-blue-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {story.name}
                    </h3>
                    <p className="text-lg text-[#0050b2] dark:text-blue-400 font-semibold mb-4">
                      {story.business}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {story.description}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Loan Amount</div>
                      <div className="text-lg font-bold text-[#0050b2] dark:text-blue-400">
                        {story.loanAmount}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {story.timeline}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl col-span-2">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Achievement</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {story.growth}
                      </div>
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                      {story.result}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-br from-[#0050b2] to-[#0066e6] dark:from-[#003d8f] dark:to-[#0050b2] p-12 rounded-3xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have transformed their businesses with LoanLink
          </p>
          <Link to={"/apply-loan"} className="bg-white text-[#0050b2] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            Apply for a Loan Today
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactShowcase;