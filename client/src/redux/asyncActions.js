import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* 
//* PRODUCTS
getAllProducts
getProductById
getProductByName
createProduct
updateProductById
deleteProductById
getCategories
getSeasons

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
  // const response = await axios.get(`/products`);
  const response = await axios.get(`/catalog`); //! temporalmente
  return response.data;
});

export const getProductById = createAsyncThunk('slice/getProductById', async (productId) => {
  const response = await axios.get(`/products/${productId}`);
  return response.data;
});

export const getProductByName = createAsyncThunk('slice/getProductByName', async (productName) => {
  const response = await axios.get(`/products?name=${productName}`);
  return response.data;
});

export const createProduct = createAsyncThunk('slice/createProduct', async (product) => {
  const response = await axios.post(`/products`, product);
  return response.data;
});

export const updateProductById = createAsyncThunk(
  'slice/updateProductById',
  async (productId, product) => {
    const response = await axios.patch(`/products/${productId}`, product);
    return response.data;
  }
);

export const deleteProductById = createAsyncThunk('slice/deleteProductById', async (productId) => {
  const response = await axios.delete(`/products/${productId}`);
  return response.data;
});

//* CATEGORIES
export const getCategories = createAsyncThunk('slice/getCategories', async () => {
  const response = await axios.get(`/categories`);
  return response.data;
});

//* SEASONS
export const getSeasons = createAsyncThunk('slice/getSeasons', async () => {
  const response = await axios.get(`/seasons`);
  return response.data;
});

//* FAVORITES
export const getUserFavorites = createAsyncThunk('slice/getUserFavorites', async (userId) => {
  const response = await axios.get(`/favorites/users/${userId}`);
  return response.data;
});

export const addFavorite = createAsyncThunk('slice/addFavorite', async (userId, favorite) => {
  const response = await axios.post(`/favorites/users/${userId}`, favorite);
  return response.data;
});

export const deleteFavorite = createAsyncThunk('slice/deleteFavorite', async (favoriteId) => {
  const response = await axios.delete(`/favorites/${favoriteId}`);
  return response.data;
});

//* ORDERS
export const getUserOrders = createAsyncThunk('slice/getUserOrders', async (userId) => {
  const response = await axios.get(`/orders/users/${userId}`);
  return response.data;
});

export const getOrderById = createAsyncThunk('slice/getOrderById', async (orderId) => {
  const response = await axios.get(`/orders/${orderId}`);
  return response.data;
});

export const createOrder = createAsyncThunk('slice/createOrder', async (order) => {
  const response = await axios.post(`/orders`, order);
  return response.data;
});

export const updateOrderById = createAsyncThunk('slice/updateOrderById', async (orderId, order) => {
  const response = await axios.patch(`/orders/${orderId}`, order);
  return response.data;
});

export const deleteOrderById = createAsyncThunk('slice/deleteOrderById', async (orderId) => {
  const response = await axios.delete(`/orders/${orderId}`);
  return response.data;
});

//* USERS
export const getUserById = createAsyncThunk('slice/getUserById', async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
});

export const updateUserById = createAsyncThunk('slice/updateUserById', async (userId, userData) => {
  const response = await axios.patch(`/users/${userId}`, userData);
  return response.data;
});

export const createUser = createAsyncThunk('slice/createUser', async (userData) => {
  const response = await axios.post(`/users`, userData);
  return response.data;
});

export const deleteUserById = createAsyncThunk('slice/deleteUserById', async (userId) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
});

export const validateLogin = createAsyncThunk('slice/validateLogin', async (userData) => {
  const response = await axios.post(`/users/check`, userData);
  return response.data;
});

//* REVIEWS
export const getUserReviews = createAsyncThunk('slice/getUserReviews', async (userId) => {
  const response = await axios.get(`/reviews/users/${userId}`);
  return response.data;
});

export const getReviewById = createAsyncThunk('slice/getReviewById', async (reviewId) => {
  const response = await axios.get(`/reviews/${reviewId}`);
  return response.data;
});

export const createReview = createAsyncThunk('slice/createReview', async (review) => {
  const response = await axios.post(`/reviews`, review);
  return response.data;
});

export const updateReviewById = createAsyncThunk(
  'slice/updateReviewById',
  async (reviewId, review) => {
    const response = await axios.patch(`/reviews/${reviewId}`, review);
    return response.data;
  }
);

export const deleteReviewById = createAsyncThunk('slice/deleteReviewById', async (reviewId) => {
  const response = await axios.delete(`/users/${reviewId}`);
  return response.data;
});
