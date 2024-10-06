import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 text-sm mb-2">
          &copy; {new Date().getFullYear()} ST PIZZA. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
            Twitter
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Designed with 🍕 love for pizza lovers!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
