import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment successful', paymentMethod);
      // Proceed to backend for further processing
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-6">Enter your payment details</h3>
      <CardElement className="p-4 border border-gray-300 rounded-md mb-6" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-red-600 text-white py-3 px-8 rounded-full text-xl shadow-lg hover:bg-red-700 transition"
      >
        Pay ${totalAmount.toFixed(2)}
      </button>
    </form>
  );
};

export default CheckoutForm;
