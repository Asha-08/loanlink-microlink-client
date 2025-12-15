import React from "react";

const Contact = () => {
  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need support? Feel free to reach out to us.
            We are always happy to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Office
              </h3>
              <p className="text-gray-600">
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Email
              </h3>
              <p className="text-gray-600">
                support@loanplatform.com
              </p>
            </div>

            <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Phone
              </h3>
              <p className="text-gray-600">
                +880 1234 567 890
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white border border-gray-100 shadow-sm rounded-xl p-8 space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                placeholder="Your message"
              ></textarea>
            </div>

            <button className="btn bg-pink-400 hover:bg-pink-500 text-white w-full">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
