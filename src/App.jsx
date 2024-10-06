import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import { Login, Register } from './pages/loginregiser';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';
import Cartpage from './pages/Cartpage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/Paymentpage';
import OrderSummary from './pages/OrderSummery';
import { CartProvider } from './components/cartcontext'; // Import the Checkout page

const App = () => {
  return (
    <CartProvider>
    <Router>
      <div className="min-h-screen bg-white"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/payment" element={<PaymentPage cartTotal={40} />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>
    </Router>
  </CartProvider>
  );
};

export default App;
