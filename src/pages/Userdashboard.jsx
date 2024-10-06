import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importing the cart icon from react-icons

const UserDashboard = () => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  
  // Get username from localStorage
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="bg-gray-100 min-h-screen px-8 md:px-16 flex flex-col">
      <nav className="flex items-center justify-between p-4 text-gray-700 shadow-lg">
        <div className="flex items-center gap-8 text-gray-900 font-bold mt-6">
          <Link to="/" className="text-primary text-red-500 text-4xl">
            PizzaHut
          </Link>
        </div>
        <div className="flex items-center space-x-6 hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-500 transition duration-300">
            Home
          </Link>
          <Link to="/menu" className="hover:text-red-500 transition duration-300">
            Menu
          </Link>
          <span className="mr-4">Hey, {username}!</span> {/* Display the username */}
          <button onClick={goToCart} className="flex items-center">
            <FaShoppingCart className="w-6 h-6" /> {/* Using Font Awesome cart icon */}
            <span className="ml-1">({cart.length})</span>
          </button>
          <Link to="/" className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 text-center">Logout</Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center bg-red-500 text-white h-64 p-8">
        <h2 className="text-3xl font-bold">Welcome to Pizza Hut!</h2>
        <p className="mt-2 text-lg">Your favorite pizza is just a click away.</p>
      </section>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Pizzas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza) => (
            <div key={pizza._id} className="bg-[#F8EFEA] p-6 rounded-lg shadow-md flex flex-col items-center hover:bg-red-200 transition duration-200">
              <img src={pizza.image} alt={pizza.name} className="w-32 h-32 object-cover mb-4 rounded" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pizza.name}</h3>
                <p className="text-gray-700 mb-4 text-sm">{pizza.description}</p>
                <p className="font-bold text-red-600">${pizza.price.toFixed(2)}</p>
                <button 
                  className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition font-semibold"
                  onClick={() => addToCart(pizza)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-red-600 text-white p-4 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} Pizza Hut. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
