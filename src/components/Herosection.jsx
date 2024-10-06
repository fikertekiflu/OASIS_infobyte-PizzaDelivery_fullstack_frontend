import React from "react";
import pizza from "../assets/images/pizza.png"; // Make sure the pizza image is correctly imported

const HeroSection = () => {
  return (
    <section className="py-10 px-6 "> {/* Slight padding adjustments for balance */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="md:w-1/ text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Everything<br />
            is better<br />
            with a&nbsp;
            <span className="text-red-600">Pizza</span>
          </h1>
          <p className="text-gray-700 mb-6 text-base md:text-lg">
            Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life.
          </p>
          
          {/* Buttons */}
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="bg-red-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-red-700 transition duration-300">
              Order Now
            </button>
            <button className="bg-white text-red-600 border border-red-600 px-5 py-3 rounded-md shadow-md hover:bg-red-600 hover:text-white transition duration-300">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Pizza Image Section */}
        <div className="md:w-1/2 flex justify-center ">
          <img
            src={pizza}
            alt="Pizza"
            className="w-68 h-auto" // Adjusted width for a smaller, balanced image size
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
