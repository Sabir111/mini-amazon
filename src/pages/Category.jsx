import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsByCategory(category);
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Set price range based on products
        if (productsData.length > 0) {
          const prices = productsData.map(p => p.price);
          setPriceRange([0, Math.ceil(Math.max(...prices))]);
        }
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

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
  }, [products, sortBy, priceRange]);

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
          <Link 
            to="/" 
            className="mt-4 inline-block bg-amazon-orange text-amazon-blue px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-amazon-orange">Home</Link>
            <span>/</span>
            <span className="text-gray-900 capitalize">{category}</span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">{category}</h1>
          <p className="text-gray-600">
            Discover our collection of {category} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
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

              {/* Category Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Category Info</h3>
                <p className="text-sm text-gray-600">
                  {products.length} product{products.length !== 1 ? 's' : ''} available in {category}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold capitalize">{category}</h2>
              <span className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                <Link
                  to="/"
                  className="mt-4 inline-block bg-amazon-orange text-amazon-blue px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default Category;
