import React, { useState, useEffect } from 'react';
import { getAllProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        
        // Set initial price range based on products
        const prices = productsData.map(p => p.price);
        setPriceRange([0, Math.ceil(Math.max(...prices))]);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amazon-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-amazon-orange text-amazon-blue px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-amazon-blue to-gray-800 text-white rounded-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to miniAmazon</h1>
          <p className="text-base sm:text-lg md:text-xl">Discover amazing products at great prices</p>
        </div>

        {/* Mobile Filters - Collapsible */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazon-orange focus:border-transparent text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazon-orange focus:border-transparent text-sm"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Price Range - Mobile */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  min="0"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  min="0"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazon-orange focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazon-orange focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 p-1 border border-gray-300 rounded text-sm"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 p-1 border border-gray-300 rounded text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {selectedCategory === 'all' ? 'All Products' : 
                 selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <span className="text-gray-600 text-sm">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
