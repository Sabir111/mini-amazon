import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0 || !query) {
      setFilteredProducts([]);
      return;
    }

    // Filter products based on search query
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
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
      case 'relevance':
        // Sort by relevance (title matches first, then description)
        filtered.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
          const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
          if (aTitle && !bTitle) return -1;
          if (!aTitle && bTitle) return 1;
          return 0;
        });
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, query, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amazon-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching products...</p>
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

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Products</h1>
            <p className="text-gray-600 mb-8">Enter a search term to find products</p>
            <Link
              to="/"
              className="bg-amazon-orange hover:bg-yellow-500 text-amazon-blue font-bold py-3 px-8 rounded-md transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any products matching "{query}". Try searching with different keywords.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Suggestions:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your spelling</li>
                <li>• Try more general keywords</li>
                <li>• Browse our categories instead</li>
              </ul>
            </div>
            <Link
              to="/"
              className="mt-8 inline-block bg-amazon-orange hover:bg-yellow-500 text-amazon-blue font-bold py-3 px-8 rounded-md transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Sort Results</h2>
                
                <div className="mb-6">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazon-orange focus:border-transparent"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* Search Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Search Info</h3>
                  <p className="text-sm text-gray-600">
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Results for "{query}"
                </h2>
                <span className="text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
