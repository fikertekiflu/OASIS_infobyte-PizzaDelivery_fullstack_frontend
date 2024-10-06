import React from "react";
import Abt from "../assets/images/Abt.jpg";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 px-6 ">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Discover the story behind your favorite pizza place and our passion for crafting the perfect slice.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between md:space-x-8">
          {/* About Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={Abt}
              alt="About PizzaHut"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* About Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Journey
            </h3>
            <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
              Since opening our doors, PizzaHut has been committed to creating authentic and delicious pizza using only the finest ingredients. 
            </p>
            <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
              Our dedication to quality and customer service remains stronger than ever. Every pizza we make reflects our love for food and the people we serve.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
