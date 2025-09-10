import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-amazon-blue text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-white">mini</span>
              <span className="text-amazon-orange">Amazon</span>
            </div>
          </Link>

          {/* Desktop Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full">
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

          {/* Right side - Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-amazon-orange transition-colors relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="hidden lg:inline">Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-amazon-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-3 py-2 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange text-sm"
              />
              <button
                type="submit"
                className="bg-amazon-orange hover:bg-yellow-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-gray-600 py-2">
          <div className="flex items-center space-x-6 overflow-x-auto">
            <Link to="/" className="hover:text-amazon-orange transition-colors whitespace-nowrap">
              All Products
            </Link>
            <Link to="/category/electronics" className="hover:text-amazon-orange transition-colors whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/category/jewelery" className="hover:text-amazon-orange transition-colors whitespace-nowrap">
              Jewelry
            </Link>
            <Link to="/category/men's clothing" className="hover:text-amazon-orange transition-colors whitespace-nowrap">
              Men's Clothing
            </Link>
            <Link to="/category/women's clothing" className="hover:text-amazon-orange transition-colors whitespace-nowrap">
              Women's Clothing
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-600 py-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:text-amazon-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/category/electronics" 
                className="hover:text-amazon-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                to="/category/jewelery" 
                className="hover:text-amazon-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jewelry
              </Link>
              <Link 
                to="/category/men's clothing" 
                className="hover:text-amazon-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men's Clothing
              </Link>
              <Link 
                to="/category/women's clothing" 
                className="hover:text-amazon-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women's Clothing
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
