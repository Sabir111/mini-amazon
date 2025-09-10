import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 h-full flex flex-col">
        {/* Product Image */}
        <div className="aspect-square mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
            {truncateTitle(product.title)}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars(product.rating?.rate || 0)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-amazon-orange hover:bg-yellow-500 text-amazon-blue px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
