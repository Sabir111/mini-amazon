import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-amazon-blue text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">mini</span>
              <span className="text-amazon-orange">Amazon</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
              <button
                type="submit"
                className="bg-amazon-orange hover:bg-yellow-500 px-6 py-2 rounded-r-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right side - Cart */}
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-amazon-orange transition-colors relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="hidden md:inline">Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-amazon-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-600 py-2">
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-amazon-orange transition-colors">
              All Products
            </Link>
            <Link to="/category/electronics" className="hover:text-amazon-orange transition-colors">
              Electronics
            </Link>
            <Link to="/category/jewelery" className="hover:text-amazon-orange transition-colors">
              Jewelry
            </Link>
            <Link to="/category/men's clothing" className="hover:text-amazon-orange transition-colors">
              Men's Clothing
            </Link>
            <Link to="/category/women's clothing" className="hover:text-amazon-orange transition-colors">
              Women's Clothing
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
