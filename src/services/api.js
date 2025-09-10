import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Get limited products (for pagination)
export const getLimitedProducts = async (limit = 10) => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching limited products:', error);
    throw error;
  }
};

export default api;
