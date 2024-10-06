import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLogin }) => { // Accept isLogin as a prop
  return (
    <header className="flex justify-between items-center px-8 md:px-16">
      {/* Left section: Logo and Navigation */}
      <div className="flex items-center gap-8 text-gray-900 font-bold mt-6">
        {/* Logo */}
        <Link to="/" className="text-primary text-red-500 text-5xl">
          PizzaHut
        </Link>
      </div>

      {/* Right section: Login and Cart */}
      <div className="flex items-center space-x-6">
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-500 transition duration-300">
            Home
          </Link>
          <Link to="/menu" className="hover:text-red-500 transition duration-300">
            Menu
          </Link>
          <a href="#about" className="hover:text-red-500 transition duration-300">
            About
          </a>
          <a href="#contact" className="hover:text-red-500 transition duration-300">
            Contact
          </a>
        </nav>
        
        {/* Login/Register Button */}
        <Link
          to={isLogin ? "/register" : "/login"} // Navigate based on isLogin
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 text-center"
        >
          {isLogin ? "register" : "Login"} {/* Change text based on state */}
        </Link>
      </div>
    </header>
  );
};

export default Header;
