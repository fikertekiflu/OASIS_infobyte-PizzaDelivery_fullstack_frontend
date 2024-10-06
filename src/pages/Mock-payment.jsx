import React, { useState } from 'react';
import axios from 'axios';

function MockPaymentPage({ cart, totalAmount, userId, pizzas }) {
    const [paymentDetails, setPaymentDetails] = useState({ name: '', cardNumber: '', deliveryAddress: '' });
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            const response = await axios.post('http://localhost:5000/api/payment/mock-payment', {
                userId,
                pizzas,
                totalAmount,
                deliveryAddress: paymentDetails.deliveryAddress,
            });

            setMessage('Order successful! Your pizza will be delivered soon.');
        } catch (error) {
            setMessage('Payment failed. Please try again.');
        }

        setIsProcessing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Mock Payment Gateway</h2>
                <p>Total Amount: <span className="font-semibold">${totalAmount}</span></p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm">Name on Card</label>
                        <input type="text" name="name" value={paymentDetails.name} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm">Card Number</label>
                        <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm">Delivery Address</label>
                        <input type="text" name="deliveryAddress" value={paymentDetails.deliveryAddress} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <button type="button" onClick={handlePayment} disabled={isProcessing} className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {isProcessing ? 'Processing...' : 'Pay and Order'}
                    </button>
                </form>
                <p className="text-center text-green-500">{message}</p>
            </div>
        </div>
    );
}
export default MockPaymentPage;
