import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/* 
//* PRODUCTS
getAllProducts
getProductById
getProductByName
createProduct
updateProductById
deleteProductById
getCategories

//* FAVORITES
getUserFavorites
addFavorite
deleteFavorite

//* ORDERS
getUserOrders
getOrderById
createOrder
updateOrderById
deleteOrderById

//* USERS
getUserById
updateUserById
createUser
deleteUserById
validateLogin

//* REVIEWS
getUserReviews
getReviewById
createReview
updateReviewById
deleteReviewById
*/

//* PRODUCTS
export const getAllProducts = createAsyncThunk('slice/getAllProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

export const getProductById = createAsyncThunk('slice/getProductById', async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}`);
  return response.data;
});

export const getProductByName = createAsyncThunk('slice/getProductByName', async (productName) => {
  const response = await axios.get(`${API_URL}/products?name=${productName}`);
  return response.data;
});

export const createProduct = createAsyncThunk('slice/createProduct', async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
});

export const updateProductById = createAsyncThunk(
  'slice/updateProductById',
  async (productId, product) => {
    const response = await axios.patch(`${API_URL}/products/${productId}`, product);
    return response.data;
  }
);

export const deleteProductById = createAsyncThunk('slice/deleteProductById', async (productId) => {
  const response = await axios.delete(`${API_URL}/products/${productId}`);
  return response.data;
});

//* CATEGORIES
export const getCategories = createAsyncThunk('slice/getCategories', async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
});

//* FAVORITES
export const getUserFavorites = createAsyncThunk('slice/getUserFavorites', async (userId) => {
  const response = await axios.get(`${API_URL}/favorites/users/${userId}`);
  return response.data;
});

export const addFavorite = createAsyncThunk('slice/addFavorite', async (userId, favorite) => {
  const response = await axios.post(`${API_URL}/favorites/users/${userId}`, favorite);
  return response.data;
});

export const deleteFavorite = createAsyncThunk('slice/deleteFavorite', async (favoriteId) => {
  const response = await axios.delete(`${API_URL}/favorites/${favoriteId}`);
  return response.data;
});

//* ORDERS
export const getUserOrders = createAsyncThunk('slice/getUserOrders', async (userId) => {
  const response = await axios.get(`${API_URL}/orders/users/${userId}`);
  return response.data;
});

export const getOrderById = createAsyncThunk('slice/getOrderById', async (orderId) => {
  const response = await axios.get(`${API_URL}/orders/${orderId}`);
  return response.data;
});

export const createOrder = createAsyncThunk('slice/createOrder', async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
});

export const updateOrderById = createAsyncThunk('slice/updateOrderById', async (orderId, order) => {
  const response = await axios.patch(`${API_URL}/orders/${orderId}`, order);
  return response.data;
});

export const deleteOrderById = createAsyncThunk('slice/deleteOrderById', async (orderId) => {
  const response = await axios.delete(`${API_URL}/orders/${orderId}`);
  return response.data;
});

//* USERS
export const getUserById = createAsyncThunk('slice/getUserById', async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
});

export const updateUserById = createAsyncThunk('slice/updateUserById', async (userId, userData) => {
  const response = await axios.patch(`${API_URL}/users/${userId}`, userData);
  return response.data;
});

export const createUser = createAsyncThunk('slice/createUser', async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
});

export const deleteUserById = createAsyncThunk('slice/deleteUserById', async (userId) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`);
  return response.data;
});

export const validateLogin = createAsyncThunk('slice/validateLogin', async (userData) => {
  const response = await axios.post(`${API_URL}/users/check`, userData);
  return response.data;
});

//* REVIEWS
export const getUserReviews = createAsyncThunk('slice/getUserReviews', async (userId) => {
  const response = await axios.get(`${API_URL}/reviews/users/${userId}`);
  return response.data;
});

export const getReviewById = createAsyncThunk('slice/getReviewById', async (reviewId) => {
  const response = await axios.get(`${API_URL}/reviews/${reviewId}`);
  return response.data;
});

export const createReview = createAsyncThunk('slice/createReview', async (review) => {
  const response = await axios.post(`${API_URL}/reviews`, review);
  return response.data;
});

export const updateReviewById = createAsyncThunk(
  'slice/updateReviewById',
  async (reviewId, review) => {
    const response = await axios.patch(`${API_URL}/reviews/${reviewId}`, review);
    return response.data;
  }
);

export const deleteReviewById = createAsyncThunk('slice/deleteReviewById', async (reviewId) => {
  const response = await axios.delete(`${API_URL}/users/${reviewId}`);
  return response.data;
});
