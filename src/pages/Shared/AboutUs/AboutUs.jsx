import React from "react";

const AboutUs = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pink-700 mb-4">
            About Us
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We are a digital loan management platform focused on making
            financial services simple, transparent, and accessible for everyone.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-semibold text-pink-700 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to simplify the loan process by providing a
              user-friendly platform where users can explore loan options,
              apply easily, and manage their loans with confidence.
              Transparency, security, and trust are at the core of our service.
            </p>
          </div>

          <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>✔ Simple and fast loan application</li>
              <li>✔ Secure data handling</li>
              <li>✔ Transparent loan details</li>
              <li>✔ User-focused experience</li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className=" border border-gray-100 shadow-sm rounded-xl p-6">
            <h4 className="text-3xl font-bold text-pink-400">1000+</h4>
            <p className="text-gray-400 mt-2">Happy Users</p>
          </div>

          <div className=" border border-gray-100 shadow-sm rounded-xl p-6">
            <h4 className="text-3xl font-bold text-pink-400">95%</h4>
            <p className="text-gray-400 mt-2">Customer Satisfaction</p>
          </div>

          <div className=" border border-gray-100 shadow-sm rounded-xl p-6">
            <h4 className="text-3xl font-bold text-pink-400">500+</h4>
            <p className="text-gray-400 mt-2">Loans Approved</p>
          </div>

          <div className=" border border-gray-100 shadow-sm rounded-xl p-6">
            <h4 className="text-3xl font-bold text-pink-400">24/7</h4>
            <p className="text-gray-400 mt-2">Support</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
