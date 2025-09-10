import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/"
              className="bg-amazon-orange hover:bg-yellow-500 text-amazon-blue font-bold py-3 px-8 rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="block">
                          <h3 className="text-lg font-medium text-gray-900 hover:text-amazon-orange line-clamp-2">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 capitalize mt-1">
                          Category: {item.category}
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-2">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-amazon-orange hover:bg-yellow-500 text-amazon-blue font-bold py-3 px-6 rounded-md transition-colors mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Security badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure checkout
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    30-day return policy
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Free shipping over $25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
