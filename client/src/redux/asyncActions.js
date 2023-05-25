import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import Cookies from 'js-cookie';
/* 
//* PRODUCTS
getAllProducts (Front OK - Back OK) 
getProductById (Front OK - Back OK) 
getProductByName (Front OK - Back NOK) 
createProduct (Front OK - Back OK) 
updateProductById (Front OK - Back OK) 
deleteProductById (Front OK - Back NOK) 

//* DETAIL
getCategories (Front OK - Back NOK) 
getSeasons (Front OK - Back OK) 
getGenders (Front OK - Back OK) 
getSize (Front NOK - Back NOK) 
getColor (Front NOK - Back NOK) 

//* FAVORITES
getUserFavorites (Front OK - Back NOK)
addFavorite (Front OK - Back NOK)
deleteFavorite (Front OK - Back NOK)

//* CART
getUserCart (Front OK - Back NOK)
getCartById (Front OK - Back NOK)
createCart (Front OK - Back NOK)
updateCartById (Front OK - Back NOK)
deleteCartById (Front OK - Back NOK)

//* ORDERS
getUserOrders (Front OK - Back NOK)
getOrderById (Front OK - Back NOK)
createOrder (Front OK - Back NOK)
updateOrderById (Front OK - Back NOK)
deleteOrderById  (Front OK - Back NOK)

//* USERS
getUserById (Front OK - Back NOK)
updateUserById (Front OK - Back NOK)
createUser (Front OK - Back OK)
deleteUserById (Front OK - Back NOK)
loginUser (Front OK - Back OK)

//* REVIEWS
getUserReviews (Front OK - Back NOK)
getReviewById (Front OK - Back NOK)
createReview (Front OK - Back NOK)
updateReviewById (Front OK - Back NOK)
deleteReviewById (Front OK - Back NOK)
*/

//* PRODUCTS
export const getAllProducts = createAsyncThunk('slice/getAllProducts', async () => {
  const response = await axios.get(`/products`);
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

export const addFavorite = createAsyncThunk('slice/addFavorite', async (userId, favorite) => {
  const response = await axios.post(`/favorites/users/${userId}`, favorite);
  return response.data;
});

export const deleteFavorite = createAsyncThunk('slice/deleteFavorite', async (favoriteId) => {
  const response = await axios.delete(`/favorites/${favoriteId}`);
  return response.data;
});

//* CART
export const getUserCart = createAsyncThunk('slice/getCartOrders', async (userId) => {
  const response = await axios.get(`/cart/users/${userId}`);
  return response.data;
});

export const getCartById = createAsyncThunk('slice/getCartById', async (cartId) => {
  const response = await axios.get(`/cart/${cartId}`);
  return response.data;
});

export const createCart = createAsyncThunk('slice/createCart', async (cart) => {
  const response = await axios.post(`/cart`, cart);
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
export const createPaymentLink = createAsyncThunk('slice/createPaymentLink', async (data) => {
  const response = await axios.post(`/payment`, data);
  return response.data;
});

//* STOCK
export const updateProductsStock = createAsyncThunk(
  'slice/updateProductsStock',
  async (cartProducts) => {
    const response = await axios.patch(`/stock/updateStock`, cartProducts);
    return response.data;
  }
);

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
  const response = await axios.post(`/users/register`, userData);
  return response.data;
});

export const deleteUserById = createAsyncThunk('slice/deleteUserById', async (userId) => {
  const response = await axios.delete(`/users/${userId}`);
  return response.data;
});

export const loginUser = createAsyncThunk('slice/loginUser', async (userData) => {
  const response = await axios.post(`/users/login`, userData);

  // const token = response.data.token;

  // Verificar el valor del token en la consola
  // console.log('Token:', token);

  // Guardar el token en una cookie llamada 'token' con una vida útil de 1 día
  // Cookies.set('token', token, { expires: 1 });

  return response.data;
});

export const loginGoogle = createAsyncThunk('slice/loginGoogle', async (userData) => {
  const response = await axios.post(`/users/login/google`, userData);
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

//* OTHERS

// export const addCartItem = createAsyncThunk('slice/addCartItem', async (userId, productId) => {
//   const response = await axios.post(`/cart/users/${userId}`, productId);
//   return response.data;
// });

// export const updateCartItem = createAsyncThunk('slice/updateCartItem', async (userId, product) => {
//   const response = await axios.patch(`/cart/users/${userId}`, product);
//   return response.data;
// });

// export const deleteCartItem = createAsyncThunk('slice/deleteCartItem', async (userId, product) => {
//   const response = await axios.request({
//     url: `/cart/users/${userId}`,
//     method: 'delete',
//     data: product,
//   });
//   return response.data;
// });
