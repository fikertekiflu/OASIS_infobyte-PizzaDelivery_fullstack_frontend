// CartPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/cartcontext'; // Adjust path as needed

const CartPage = () => {
  const { state } = useLocation();
  const { cart, setCart } = useCart();
  const [customizations, setCustomizations] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.cart) {
      setCart(state.cart);
    }
  }, [state, setCart]);

  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const updatedCustomizations = {};
        for (const pizza of cart) {
          const res = await axios.get(`http://localhost:5000/api/pizzas/${pizza._id}`);
          updatedCustomizations[pizza._id] = {
            base: res.data.availableBases[0],
            sauce: res.data.availableSauces[0],
            cheese: res.data.availableCheeses[0],
            veggies: [],
            options: res.data,
          };
        }
        setCustomizations(updatedCustomizations);
      } catch (error) {
        console.error('Error fetching pizza details:', error);
      }
    };

    if (cart.length) {
      fetchCustomizations();
    }
  }, [cart]);

  const handleCustomizationChange = (pizzaId, field, value) => {
    setCustomizations(prev => ({
      ...prev,
      [pizzaId]: {
        ...prev[pizzaId],
        [field]: value,
      },
    }));
  };

  const handleDeletePizza = (pizzaId) => {
    setCart(cart.filter(pizza => pizza._id !== pizzaId));
  };

  const handleOrderNow = () => {
    // Calculate total amount based on selected pizzas
    const total = cart.reduce((acc, pizza) => acc + pizza.price, 0);
    navigate('/payment', { state: { cart, customizations, total } });
  };

  const handleBackToDashboard = () => {
    navigate('/Userdashboard');
  };

  useEffect(() => {
    const total = cart.reduce((acc, pizza) => acc + pizza.price, 0);
    setTotalAmount(total);
  }, [cart]);

  return (
    <div className="bg-[#f0f4f8] min-h-screen p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Your Cart</h2>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-4 block mx-auto"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
      {cart.length === 0 ? (
        <p className="text-lg text-center">Your cart is empty. Add some pizzas!</p>
      ) : (
        <div className="space-y-8">
          {cart.map(pizza => (
            <div key={pizza._id} className="bg-white p-6 shadow-lg rounded-lg flex flex-col md:flex-row">
              <img src={pizza.image} alt={pizza.name} className="w-48 h-48 rounded-lg object-cover md:mr-6" />
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">{pizza.name}</h3>
                <p className="text-gray-700 mb-4">{pizza.description}</p>

                {/* Customization Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold">Base:</label>
                    <select
                      className="p-2 border rounded w-full shadow-sm"
                      value={customizations[pizza._id]?.base}
                      onChange={(e) => handleCustomizationChange(pizza._id, 'base', e.target.value)}
                    >
                      {customizations[pizza._id]?.options.availableBases.map(base => (
                        <option key={base} value={base}>{base}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold">Sauce:</label>
                    <select
                      className="p-2 border rounded w-full shadow-sm"
                      value={customizations[pizza._id]?.sauce}
                      onChange={(e) => handleCustomizationChange(pizza._id, 'sauce', e.target.value)}
                    >
                      {customizations[pizza._id]?.options.availableSauces.map(sauce => (
                        <option key={sauce} value={sauce}>{sauce}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold">Cheese:</label>
                    <select
                      className="p-2 border rounded w-full shadow-sm"
                      value={customizations[pizza._id]?.cheese}
                      onChange={(e) => handleCustomizationChange(pizza._id, 'cheese', e.target.value)}
                    >
                      {customizations[pizza._id]?.options.availableCheeses.map(cheese => (
                        <option key={cheese} value={cheese}>{cheese}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold">Veggies:</label>
                    <div className="space-y-2">
                      {customizations[pizza._id]?.options.availableVeggies.map(veggie => (
                        <label key={veggie} className="block flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={customizations[pizza._id]?.veggies.includes(veggie)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const updatedVeggies = checked
                                ? [...customizations[pizza._id].veggies, veggie]
                                : customizations[pizza._id].veggies.filter(v => v !== veggie);
                              handleCustomizationChange(pizza._id, 'veggies', updatedVeggies);
                            }}
                          />
                          {veggie}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">Price: ${pizza.price}</span>
                  <div className="flex space-x-4">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      onClick={() => handleDeletePizza(pizza._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      onClick={handleOrderNow}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        {cart.length > 0 && (
          <button
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition block mx-auto"
            onClick={() => setCart([])} // Clear the cart
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
