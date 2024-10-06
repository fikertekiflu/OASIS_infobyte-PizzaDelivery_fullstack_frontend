import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError(''); // Clear previous errors
      } else {
        setError(data.message);
        setMessage(''); // Clear previous success messages
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8EFEA]">
      <div className="bg-white shadow-md rounded-lg p-8 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Request Password Reset
          </button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-red-600 transition"
          >
            Remembered your password? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
