import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signin" element={<Login />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/Products" element={<ProductsPage />} />
      <Route path="/Pricing" element={<PricingPage />} />
      <Route path="/Support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
