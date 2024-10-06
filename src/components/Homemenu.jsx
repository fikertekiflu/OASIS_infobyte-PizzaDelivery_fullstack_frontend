import React from "react";
import pizza from "../assets/images/pizza.png";
import sallad1 from "../assets/images/sallad1.png";
import sallad2 from "../assets/images/sallad2.png";

const Homemenu = () => {
  return (
    <section className="relative py-16">
      {/* Salad Decorations */}
      <div className="absolute left-0 right-0 w-full flex justify-between">
        <div className="absolute left-0 -top-20">
          <img src={sallad1} alt="Salad 1" className="w-20 h-auto" />
        </div>
        <div className="absolute right-0 -top-20">
          <img src={sallad2} alt="Salad 2" className="w-20 h-auto" />
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto text-center ">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          CHECK OUT <span className="text-red-600">Our Best Sellers</span>
        </h2>

        {/* Pizza Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
          {/* Pizza 1 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-red-200">
            <img src={pizza} alt="Pepperoni Pizza" className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pepperoni Pizza</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Pepperoni puts the pizzazz in pizza. Enjoy every bite of our traditional crust brushed with garlic butter, topped with pepperoni and cheese.
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition font-semibold">
              Add to cart (from $12)
            </button>
          </div>

          {/* Pizza 2 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-red-200">
            <img src={pizza} alt="Cheese Pizza" className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cheese Pizza</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Cheese pizza is a favorite for a reason. Gooey mozzarella cheese is the star of our cheese pizza on a traditional crust.
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition font-semibold">
              Add to cart ($11)
            </button>
          </div>

          {/* Pizza 3 */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-red-200">
            <img src={pizza} alt="Beef Pizza" className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Beef Pizza</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Beef pizza is made for the meat lovers. Topped with garlic butter and finished with cheese and beef.
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition font-semibold">
              Add to cart (from $14)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homemenu;
