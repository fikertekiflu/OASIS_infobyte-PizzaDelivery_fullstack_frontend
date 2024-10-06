import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-8 px-4 "> {/* Adjusted padding */}
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Get in Touch 🤝
          </h2>
          <p className="text-gray-600 text-lg">
            We’d love to hear from you! Reach out to us anytime.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
          {/* Contact Form */}
          <form className="md:w-1/2 bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Name 
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email 
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
                Message 💬
              </label>
              <textarea
                id="message"
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300">
              Send Message ✉️
            </button>
          </form>

          {/* Contact Info */}
          <div className="md:w-1/2 text-center md:text-left md:ml-16 ">
            <h3 className="text-2xl font-semibold text-red-500 mb-2">
              Contact Details 📍
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Address:</strong> 123 Pizza Street, Flavor Town, USA
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Email:</strong> info@pizzahut.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
