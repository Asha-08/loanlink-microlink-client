import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, TrendingUp, User, Tag } from "lucide-react";
import { useState } from "react";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Financial Tips", "Business Growth", "Success Stories", "Loan Guides", "News"];

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Loan Applicants",
      excerpt: "Essential advice for entrepreneurs applying for their first microloan. Learn how to prepare your documents and increase approval chances.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop",
      category: "Loan Guides",
      author: "Sarah Johnson",
      date: "Jan 8, 2026",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "How Small Businesses Can Manage Cash Flow",
      excerpt: "Discover practical strategies to maintain healthy cash flow and grow your business sustainably with smart financial planning.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      category: "Business Growth",
      author: "Michael Chen",
      date: "Jan 6, 2026",
      readTime: "7 min read",
      featured: true
    },
    {
      id: 3,
      title: "Understanding Interest Rates: A Complete Guide",
      excerpt: "Learn everything about interest rates, APR, and how they affect your loan repayments over time.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop",
      category: "Financial Tips",
      author: "Emma Davis",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "From Home Kitchen to Restaurant: Maria's Journey",
      excerpt: "How a $5,000 microloan helped Maria transform her home-based catering into a thriving restaurant business.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop",
      category: "Success Stories",
      author: "David Martinez",
      date: "Jan 3, 2026",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 5,
      title: "5 Ways to Improve Your Credit Score",
      excerpt: "Boost your creditworthiness with these proven strategies and increase your chances of loan approval.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop",
      category: "Financial Tips",
      author: "Lisa Thompson",
      date: "Jan 1, 2026",
      readTime: "5 min read",
      featured: false
    },
    {
      id: 6,
      title: "The Rise of Digital Lending in 2026",
      excerpt: "Explore how technology is revolutionizing the microloan industry and making finance more accessible.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      category: "News",
      author: "James Wilson",
      date: "Dec 28, 2025",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 7,
      title: "Budgeting 101: Managing Your Business Finances",
      excerpt: "Master the fundamentals of business budgeting with our comprehensive guide for entrepreneurs.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=500&fit=crop",
      category: "Business Growth",
      author: "Rachel Green",
      date: "Dec 25, 2025",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 8,
      title: "Choosing the Right Loan for Your Business",
      excerpt: "A detailed comparison of different loan types to help you make the best decision for your business needs.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
      category: "Loan Guides",
      author: "Alex Kumar",
      date: "Dec 22, 2025",
      readTime: "9 min read",
      featured: false
    },
    {
      id: 9,
      title: "Agricultural Loans: Empowering Farmers",
      excerpt: "How specialized agricultural microloans are helping farmers modernize and increase productivity.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
      category: "Success Stories",
      author: "Patricia Moore",
      date: "Dec 20, 2025",
      readTime: "6 min read",
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0050b2] to-[#0066e6] dark:from-[#003d8f] dark:to-[#0050b2] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              LoanLink Blog
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Financial insights, success stories, and expert tips to help you grow your business
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:border-white dark:focus:border-blue-400 outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#0050b2] dark:bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-[#0050b2] dark:text-blue-400" />
              Featured Articles
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0050b2] dark:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#0050b2] dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {post.author}
                        </span>
                      </div>
                      
                      <button className="text-[#0050b2] dark:text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <span className="bg-[#0050b2]/10 dark:bg-blue-400/10 text-[#0050b2] dark:text-blue-400 px-3 py-1 rounded-full font-semibold">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#0050b2] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {post.author}
                        </span>
                      </div>
                      
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.date}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default BlogsPage;