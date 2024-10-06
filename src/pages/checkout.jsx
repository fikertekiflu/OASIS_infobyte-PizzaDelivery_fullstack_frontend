import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm'; // Your custom CheckoutForm

// Load Stripe
const stripePromise = loadStripe('pk_test_51Q2WzpJ0bINKsPeBePctUExnZS7diVNSzKn2FA3hRoM2xym0nA3xcQMFNesR5A5YKv7mbaZ3YnMXPBHl17AwVupW00vyLCx8ZR');

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount } = location.state || {};

  return (
    <div className="bg-gray-100 min-h-screen px-8 py-12">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 bg-red-600 text-white shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <button
          onClick={() => navigate('/cart')}
          className="mr-4 bg-white text-red-600 px-4 py-2 rounded shadow-lg hover:bg-red-500 hover:text-white transition"
        >
          Back to Cart
        </button>
      </nav>

      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((pizza, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{pizza.name}</h3>
                  <p className="text-red-500 font-semibold">${pizza.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No items in cart.</p>
        )}

        {/* Stripe Checkout Form */}
        <div className="mt-10">
          <h2 className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={totalAmount} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
