import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const TypewriterEffect = ({ words, loop = true }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          if (loop) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, loop]);

  return (
    <span className="inline-block">
      <span className="text-[#0050b2] dark:text-blue-400 font-extrabold">
        {currentText}
      </span>
      <span className="animate-pulse text-[#0050b2] dark:text-blue-400">|</span>
    </span>
  );
};

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Get Instant",
      animatedWords: ["Microloans", "Financing", "Capital"],
      subtitle: "For Your Business Dreams",
      description: "Fast approval process with competitive rates. Transform your business ideas into reality with our flexible microloan solutions.",
      cta: "Apply Now",
      ctaSecondary: "Contact Us",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80",
      gradient: "from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
    },
    {
      id: 2,
      title: "Empower Your",
      animatedWords: ["Business", "Growth", "Success"],
      subtitle: "With Smart Financial Solutions",
      description: "Join thousands of entrepreneurs who trust LoanLink. Simple application, transparent terms, and dedicated support at every step.",
      cta: "Get Started",
      ctaSecondary: "Contact Us",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop&q=80",
      gradient: "from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20"
    },
    {
      id: 3,
      title: "Build Your",
      animatedWords: ["Future", "Empire", "Legacy"],
      subtitle: "One Step at a Time",
      description: "Flexible repayment options and no hidden fees. We provide the financial backing you need to scale your business confidently.",
      cta: "Start Today",
      ctaSecondary: "Contact Us",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
      gradient: "from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900/20"
    },
    {
      id: 4,
      title: "Transform Your",
      animatedWords: ["Vision", "Ideas", "Goals"],
      subtitle: "Into Reality Today",
      description: "Access capital when you need it most. Our streamlined process ensures you get funded quickly with minimal paperwork.",
      cta: "Apply Now",
      ctaSecondary: "Contact us",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=800&fit=crop&q=80",
      gradient: "from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-white dark:bg-gray-900">
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0 z-10'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full z-0'
              : 'opacity-0 translate-x-full z-0'
          }`}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-${slide.id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#0050b2" strokeWidth="1" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#0050b2" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="10" fill="none" stroke="#0050b2" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-${slide.id})`} />
            </svg>
          </div>

          {/* Content Grid */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
              
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-2 sm:space-y-3 lg:space-y-4 z-20 order-2 lg:order-1 pb-16 sm:pb-20 md:pb-16 lg:pb-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#0050b2]/10 dark:bg-[#0050b2]/20 text-[#0050b2] dark:text-blue-400 px-3 py-1.5 rounded-full w-fit text-xs sm:text-sm font-semibold backdrop-blur-sm">
                  <span className="w-2 h-2 bg-[#0050b2] dark:bg-blue-400 rounded-full animate-pulse"></span>
                  Trusted by 10,000+ Businesses
                </div>

                {/* Main Heading with Typewriter */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
                    {slide.title}
                    <br />
                    <TypewriterEffect words={slide.animatedWords} />
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300 leading-tight">
                    {slide.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                  <Link to={"/apply-loan"} className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0050b2] hover:bg-[#003d8a] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link to={"/contact"} className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-gray-800 text-[#0050b2] dark:text-blue-400 text-sm sm:text-base font-bold rounded-xl shadow-md hover:shadow-xl border-2 border-[#0050b2] dark:border-blue-400 transform hover:-translate-y-1 transition-all duration-300">
                    {slide.ctaSecondary}
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-5 pt-1.5 sm:pt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold whitespace-nowrap">5-Min Approval</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold whitespace-nowrap">No Hidden Fees</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold whitespace-nowrap">Flexible Terms</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex items-center justify-center lg:justify-end z-20 order-1 lg:order-2 pt-4 lg:pt-0">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#0050b2] to-blue-600 rounded-[2rem] opacity-20 blur-xl"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0050b2] rounded-full opacity-10 blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-blue-600 rounded-full opacity-10 blur-2xl"></div>
                  
                  {/* Main Image Container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0050b2]/20 to-blue-600/20 rounded-[2rem] transform rotate-3"></div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white dark:border-gray-800">
                      <img
                        src={slide.image}
                        alt={`${slide.title} - Hero Banner`}
                        className="w-full h-[240px] sm:h-[280px] lg:h-[340px] object-cover"
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0050b2]/40 via-transparent to-transparent"></div>
                      
                      {/* Floating Stats Card */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-3 shadow-xl">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-[#0050b2] dark:text-blue-400">$50K+</div>
                            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Avg Loan</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-[#0050b2] dark:text-blue-400">24hrs</div>
                            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Funding</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-[#0050b2] dark:text-blue-400">4.9★</div>
                            <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 pb-3 sm:pb-6 lg:pb-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          
          {/* Pagination Dots */}
          <div className="flex items-center gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-[#0050b2] dark:bg-blue-400 rounded-full'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 dark:bg-gray-600 hover:bg-[#0050b2]/50 dark:hover:bg-blue-400/50 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
