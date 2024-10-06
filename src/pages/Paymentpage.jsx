import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const { state } = useLocation();
  const { cart, customizations } = state || {};
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userID');

  // Calculate total price from the cart
  useEffect(() => {
    if (cart) {
      const total = cart.reduce((sum, pizza) => sum + pizza.price, 0);
      setTotalAmount(total);
    }
  }, [cart]);

  const handlePaymentSubmit = async () => {const handlePaymentSubmit = async () => {
    if (!deliveryAddress) {
      setError('Delivery address is required.');
      return;
    }
    if (!userId) {
      setError('User is not logged in.');
      return;
    }
  
    if (!cart || cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    // Map the cart to ensure it only sends the necessary fields (e.g., name, price, quantity)
    const pizzas = cart.map(pizza => ({
      name: pizza.name,           // Ensure the 'name' field exists in each pizza
      price: pizza.price,         // Ensure the 'price' field exists
      quantity: pizza.quantity || 1, // Add quantity if it's missing, default to 1
    }));
  
    const payload = {
      userId,
      pizzas, // Mapped cart
      totalAmount,
      deliveryAddress,
    };
  
    // Log the payload to check the mapped pizzas array
    console.log('Submitting payment with the following payload:', payload);
  
    try {
      const response = await axios.post('http://localhost:5000/api/payment/mock-payment', payload);
  
      if (response.status === 200) {
        alert('Payment successful! Your order is placed.');
        navigate('/order-summary', { state: { order: response.data.order } });
      } else {
        setError('Payment failed. Unexpected server response.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
  
      if (error.response && error.response.data) {
        setError(`Payment failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError('Payment failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
    if (!deliveryAddress) {
      setError('Delivery address is required.');
      return;
    }
    if (!userId) {
      setError('User is not logged in.');
      return;
    }
  
    // Check if cart is valid
    if (!cart || cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    // Prepare payload
    const payload = {
      userId,
      pizzas: cart, // Ensure this matches what your backend expects
      totalAmount,
      deliveryAddress,
    };
  
    // Debug: Log the full payload to ensure correctness
    console.log('Submitting payment with the following payload:', payload);
  
    try {
      const response = await axios.post('http://localhost:5000/api/payment/mock-payment', payload);
  
      if (response.status === 200) {
        alert('Payment successful! Your order is placed.');
        // Redirect to order summary with order data
        navigate('/order-summary', { state: { order: response.data.order } });
      } else {
        setError('Payment failed. Unexpected server response.');
      }
    } catch (error) {
      // Log the full error object for debugging
      console.error('Error submitting payment:', error);
  
      // Check for detailed backend error
      if (error.response && error.response.data) {
        setError(`Payment failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        setError('Payment failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Payment Page</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2"> please enter Total Amount:</h3>
          <p className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</p>
        </div>

        {/* Delivery Address */}
        <label className="block text-lg font-medium mb-2">Delivery Address:</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          placeholder="Enter your delivery address"
          disabled={loading}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        ) : (
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-green-700 transition"
            onClick={handlePaymentSubmit}
          >
            Submit Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
