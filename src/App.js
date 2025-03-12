import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { CartProvider } from './context/CartContext';

// Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TailwindShowcasePage from './pages/TailwindShowcasePage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TempCart from './components/TempCart';

function App() {
  return (
    <CartProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tailwind" element={<TailwindShowcasePage />} />
          </Routes>
        </Box>
        <Footer />
        <TempCart />
      </Box>
    </CartProvider>
  );
}

export default App; 