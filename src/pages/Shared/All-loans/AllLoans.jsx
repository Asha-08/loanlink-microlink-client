import React, { useState, useMemo } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, DollarSign, X } from 'lucide-react';

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [interestRateFilter, setInterestRateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/addloans");
      return res.data;
    },
  });

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(loans.map(loan => loan.category))];
    return uniqueCategories;
  }, [loans]);

  // Filter and sort logic
  const filteredAndSortedLoans = useMemo(() => {
    let filtered = [...loans];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(loan =>
        loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(loan => loan.category === categoryFilter);
    }

    // Interest rate filter
    if (interestRateFilter !== 'all') {
      if (interestRateFilter === 'low') {
        filtered = filtered.filter(loan => loan.interestRate <= 5);
      } else if (interestRateFilter === 'medium') {
        filtered = filtered.filter(loan => loan.interestRate > 5 && loan.interestRate <= 10);
      } else if (interestRateFilter === 'high') {
        filtered = filtered.filter(loan => loan.interestRate > 10);
      }
    }

    // Sorting
    if (sortBy === 'interest-low') {
      filtered.sort((a, b) => a.interestRate - b.interestRate);
    } else if (sortBy === 'interest-high') {
      filtered.sort((a, b) => b.interestRate - a.interestRate);
    } else if (sortBy === 'limit-low') {
      filtered.sort((a, b) => a.maxLoanLimit - b.maxLoanLimit);
    } else if (sortBy === 'limit-high') {
      filtered.sort((a, b) => b.maxLoanLimit - a.maxLoanLimit);
    }

    return filtered;
  }, [loans, searchTerm, categoryFilter, interestRateFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLoans = filteredAndSortedLoans.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, interestRateFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setInterestRateFilter('all');
    setSortBy('default');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-12 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="loans-pattern-loading" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loans-pattern-loading)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-10">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-3 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto animate-pulse"></div>
          </div>

          {/* Search and Filter Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
            {/* Search Bar Skeleton */}
            <div className="mb-6">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Filters Row Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Results Count Skeleton */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>

                  {/* Info Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-12 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loans-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loans-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
            All Available <span className="text-[#0050b2] dark:text-blue-400">Loans</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find the perfect loan solution for your needs
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by loan title or category..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Interest Rate Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                Interest Rate
              </label>
              <select
                value={interestRateFilter}
                onChange={(e) => setInterestRateFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white"
              >
                <option value="all">All Rates</option>
                <option value="low">Low (≤5%)</option>
                <option value="medium">Medium (5-10%)</option>
                <option value="high">High (10%)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0050b2] dark:focus:ring-blue-400 focus:border-transparent transition-all text-gray-900 dark:text-white"
              >
                <option value="default">Default</option>
                <option value="interest-low">Interest: Low to High</option>
                <option value="interest-high">Interest: High to Low</option>
                <option value="limit-low">Limit: Low to High</option>
                <option value="limit-high">Limit: High to Low</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-[#0050b2] dark:text-blue-400">{filteredAndSortedLoans.length}</span> loan(s)
            </p>
          </div>
        </motion.div>

        {/* Loans Grid */}
        {currentLoans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No loans found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#0050b2] hover:bg-[#003d8a] text-white font-semibold rounded-xl transition-all"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {currentLoans.map((loan, index) => (
                <motion.div
                  key={loan._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-[#0050b2] text-white text-xs font-bold rounded-full">
                        {loan.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {loan.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</span>
                        <span className="text-lg font-bold text-[#0050b2] dark:text-blue-400">
                          {loan.interestRate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Max Limit</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ৳{loan.maxLoanLimit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/loans/${loan._id}`)}
                      className="w-full py-3 bg-[#0050b2] hover:bg-[#003d8a] text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      View Details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-2 flex-wrap"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === index + 1
                        ? 'bg-[#0050b2] text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllLoans;