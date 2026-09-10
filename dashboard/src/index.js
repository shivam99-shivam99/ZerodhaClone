import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';

// Kite Trading Dashboard
import Home from './components/Home';

// Landing Page Components
import HomePage from './landingpage/home/HomePage';
import Signup from './landingpage/signup/Signup';
import Login from './landingpage/login/Login';
import AboutPage from './landingpage/about/AboutPage';
import ProductsPage from './landingpage/products/ProductsPage';
import PricingPage from './landingpage/pricing/PricingPage';
import SupportPage from './landingpage/support/SupportPage';
import Navbar from './landingpage/Navbar';
import Footer from './landingpage/Footer';
import NotFound from './landingpage/NotFound';

function LandingLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing Page Routes wrapped in Navbar & Footer */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/Signin" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/Pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/Support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Kite Dashboard Application */}
        <Route path="/dashboard/*" element={<Home />} />

        {/* Direct links redirected to dashboard */}
        <Route path="/orders" element={<Navigate to="/dashboard/orders" replace />} />
        <Route path="/holdings" element={<Navigate to="/dashboard/holdings" replace />} />
        <Route path="/positions" element={<Navigate to="/dashboard/positions" replace />} />
        <Route path="/funds" element={<Navigate to="/dashboard/funds" replace />} />
        <Route path="/apps" element={<Navigate to="/dashboard/apps" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);