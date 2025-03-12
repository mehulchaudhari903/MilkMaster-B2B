import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Default placeholder image for products without images
const placeholderImage = 'https://via.placeholder.com/300x200?text=Dairy+Product';

function TailwindProductCard({ product }) {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Destructure product properties with fallbacks for safety
  const { 
    id, 
    name, 
    description, 
    price, 
    unit, 
    category, 
    stock,
    imageUrl = placeholderImage
  } = product;
  
  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  // Add to Cart functionality
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation to product detail
    
    const cartItem = {
      id,
      name,
      price,
      quantity,
      unit,
      imageUrl
    };
    
    // Add to cart using context
    addToCart(cartItem, quantity);
    
    // Show toast notification
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= stock) {
      setQuantity(value);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  // Determine stock status styling
  const getStockStatus = () => {
    if (stock > 100) return { 
      text: 'In Stock', 
      className: 'bg-green-100 text-green-800'
    };
    if (stock > 0) return { 
      text: 'Low Stock', 
      className: 'bg-yellow-100 text-yellow-800'
    };
    return { 
      text: 'Out of Stock', 
      className: 'bg-red-100 text-red-800'
    };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="card group h-full flex flex-col transform transition-all duration-300 hover:-translate-y-2 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute right-0 top-0 mt-2 mr-2 z-50 bg-green-500 text-white text-sm rounded-lg py-2 px-4 shadow-lg transform transition-all duration-500 animate-bounce">
          Added to cart!
        </div>
      )}
      
      <div className="relative overflow-hidden">
        {/* Category Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {category}
          </span>
        </div>
        
        {/* Product Image */}
        <img 
          src={imageUrl} 
          alt={name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={handleClick}
        />
      </div>
      
      {/* Product Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-2 cursor-pointer" onClick={handleClick}>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          </div>
          <span className="ml-2 text-xs text-gray-500">4.5</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-lg font-bold text-primary-600">${price}</span>
            <span className="text-xs text-gray-500 ml-1">{unit}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.className}`}>
            {stockStatus.text}
          </span>
        </div>
        
        {/* Quantity Selector */}
        {stock > 0 && (
          <div className="flex items-center mt-4 mb-2">
            <span className="text-sm text-gray-600 mr-2">Qty:</span>
            <div className="flex border border-gray-300 rounded-md">
              <button 
                className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 rounded-l-md hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              </button>
              <input 
                type="number" 
                className="w-12 h-8 text-center text-sm border-x border-gray-300 focus:outline-none" 
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={stock}
              />
              <button 
                className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 rounded-r-md hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button 
          className={`w-full mt-2 py-2 flex items-center justify-center rounded-md transition-colors duration-300 ${
            stock === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          }`}
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default TailwindProductCard; 