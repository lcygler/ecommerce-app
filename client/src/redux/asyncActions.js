import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import Cookies from 'js-cookie';

/* 
//* PRODUCTS
getAllProducts
getProductById
getProductByName
createProduct
updateProductById
deleteProductById

//* DETAIL
getCategories
getSeasons
getGenders 
getSize
getColor

//* FAVORITES
getUserFavorites
addFavorite
removeFavorite

//* CART
getUserCart
getCartById
createCart
updateCartById
deleteCartById

//* PURCHASES
getUserPurchases
getPurchaseById
createPurchase
updatePurchaseById
deletePurchaseById

//* USERS
getUserById
updateUserById
createUser
deleteUserById
loginUser
loginGoogle

//* REVIEWS
getUserReviews
getReviewById
createReview
updateReviewById 
deleteReviewById

//* CHARTS
getChartData
*/

//* PRODUCTS
export const getAllProducts = createAsyncThunk('slice/getAllProducts', async () => {
  const response = await axios.get(`/products`);
  return response.data;
});

export const getAdminProducts = createAsyncThunk('slice/getAdminProducts', async () => {
  const response = await axios.get(`/products/admin`);
  return response.data;
});

// export const getAllProducts = createAsyncThunk('slice/getAllProducts', async () => {
//   const token = Cookies.get('token');
//   const response = await axios.get(`/products`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// });

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
  async ({ productId, updatedProduct }) => {
    const response = await axios.patch(`/products/${productId}`, updatedProduct);
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

//* GENDER
export const getGenders = createAsyncThunk('slice/getGenders', async () => {
  const response = await axios.get(`/genders`);
  return response.data;
});

//* FAVORITES
export const getUserFavorites = createAsyncThunk('slice/getUserFavorites', async (userId) => {
  const response = await axios.get(`/favorites/users/${userId}`);
  return response.data;
});

export const addFavorite = createAsyncThunk('slice/addFavorite', async ({ userId, productId }) => {
  const response = await axios.post(`/favorites/${productId}/users/${userId}`);
  return response.data;
});

export const removeFavorite = createAsyncThunk(
  'slice/removeFavorite',
  async ({ userId, productId }) => {
    const response = await axios.delete(`/favorites/${productId}/users/${userId}`);
    return response.data;
  }
);

export const removeUserFavorites = createAsyncThunk('slice/removeUserFavorites', async (userId) => {
  const response = await axios.delete(`/favorites/users/${userId}`);
  return response.data;
});

//* CART
export const getUserCart = createAsyncThunk('slice/getUserCart', async (userId) => {
  const response = await axios.get(`/cart/users/${userId}`);
  return response.data;
});

export const updateUserCart = createAsyncThunk(
  'slice/updateUserCart',
  async ({ userId, products }) => {
    const response = await axios.post(`/cart/users/${userId}`, products);
    return response.data;
  }
);

export const deleteUserCart = createAsyncThunk('slice/deleteUserCart', async (userId) => {
  const response = await axios.delete(`/cart/users/${userId}`);
  return response.data;
});

export const getCartById = createAsyncThunk('slice/getCartById', async (cartId) => {
  const response = await axios.get(`/cart/${cartId}`);
  return response.data;
});

export const updateCartById = createAsyncThunk('slice/updateCartById', async (cartId, cart) => {
  const response = await axios.patch(`/cart/${cartId}`, cart);
  return response.data;
});

export const deleteCartById = createAsyncThunk('slice/deleteCartById', async (cartId) => {
  const response = await axios.delete(`/cart/${cartId}`);
  return response.data;
});

//* PAYMENT
export const createPaymentLink = createAsyncThunk(
  'slice/createPaymentLink',
  async (cartProducts) => {
    const response = await axios.post(`/payment`, cartProducts);
    return response.data;
  }
);

//* STOCK
export const updateProductsStock = createAsyncThunk(
  'slice/updateProductsStock',
  async (cartProducts) => {
    const response = await axios.patch(`/stock/updateStock`, cartProducts);
    return response.data;
  }
);

//* PURCHASES
export const getAllPurchases = createAsyncThunk('slice/getAllPurchases', async () => {
  const response = await axios.get(`/purchases`);
  return response.data;
});

export const getUserPurchases = createAsyncThunk('slice/getUserPurchases', async (userId) => {
  const response = await axios.get(`/purchases/users/${userId}`);
  return response.data;
});

export const getPurchaseById = createAsyncThunk('slice/getPurchaseById', async (purchaseId) => {
  const response = await axios.get(`/purchases/${purchaseId}`);
  return response.data;
});

export const createPurchase = createAsyncThunk(
  'slice/createPurchase',
  async ({ userId, products }) => {
    const response = await axios.post(`/purchases/users/${userId}`, products);
    return response.data;
  }
);

export const updatePurchaseById = createAsyncThunk(
  'slice/updatePurchaseById',
  async ({ purchaseId, purchaseData }) => {
    const response = await axios.patch(`/purchases/${purchaseId}`, purchaseData);
    return response.data;
  }
);

export const deletePurchaseById = createAsyncThunk(
  'slice/deletePurchaseById',
  async (purchaseId) => {
    const response = await axios.delete(`/purchases/${purchaseId}`);
    return response.data;
  }
);

export const sendPurchaseSuccess = createAsyncThunk('slice/sendPurchaseSuccess', async (email) => {
  const response = await axios.post(`/purchases/success`, email);
  return response.data;
});

export const sendPurchaseFailure = createAsyncThunk('slice/sendPurchaseFailure', async (email) => {
  const response = await axios.post(`/purchases/failure`, email);
  return response.data;
});

//* USERS
export const getUsers = createAsyncThunk('slice/getUsers', async () => {
  const response = await axios.get(`/users`);
  return response.data;
});

export const getUserById = createAsyncThunk('slice/getUserById', async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
});

export const updateUserById = createAsyncThunk(
  'slice/updateUserById',
  async ({ userId, updatedUser }) => {
    const response = await axios.patch(`/users/${userId}`, updatedUser);
    return response.data;
  }
);

export const createUser = createAsyncThunk('slice/createUser', async (userData) => {
  const response = await axios.post(`/users/register`, userData);
  return response.data;
});

export const deleteUserById = createAsyncThunk('slice/deleteUserById', async (userId) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
});

export const loginUser = createAsyncThunk('slice/loginUser', async (userData) => {
  const response = await axios.post(`/users/login`, userData);
  return response.data;
});

// const token = response.data.token;

// Verificar el valor del token en la consola
// console.log('Token:', token);

// Guardar el token en una cookie llamada 'token' con una vida útil de 1 día
// Cookies.set('token', token, { expires: 1 });

export const loginGoogle = createAsyncThunk('slice/loginGoogle', async (userData) => {
  const response = await axios.post(`/users/login/google`, userData);
  return response.data;
});

//* REVIEWS
export const getAllReviews = createAsyncThunk('slice/getAllReviews', async () => {
  const response = await axios.get(`/reviews`);
  return response.data;
});

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
  async ({ reviewId, updatedReview }) => {
    const response = await axios.patch(`/reviews/${reviewId}`, updatedReview);
    return response.data;
  }
);

export const deleteReviewById = createAsyncThunk('slice/deleteReviewById', async (reviewId) => {
  const response = await axios.delete(`/reviews/${reviewId}`);
  return response.data;
});

//* CHARTS
export const getChartData = createAsyncThunk('slice/getChartData', async () => {
  const response = await axios.get('/charts');
  return response.data;
});
