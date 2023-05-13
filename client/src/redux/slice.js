import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  filterByCategory,
  filterByDiscount,
  filterByGender,
  filterBySeason,
  sortProducts,
} from './helpers';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

//* ASYNC REDUCERS
//* PRODUCTS
export const getAllProducts = createAsyncThunk('slice/getAllProducts', async () => {
  // const response = await axios.get(`${API_URL}/products`);
  const response = await axios.get(`${API_URL}/catalog`);
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

export const getCategories = createAsyncThunk('slice/getCategories', async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
});

//* FAVORITES
export const getClientFavorites = createAsyncThunk('slice/getClientFavorites', async (clientId) => {
  const response = await axios.get(`${API_URL}/favorites/client/${clientId}`);
  return response.data;
});

export const addFavorite = createAsyncThunk('slice/addFavorite', async (clientId, favorite) => {
  const response = await axios.post(`${API_URL}/favorites/client/${clientId}`, favorite);
  return response.data;
});

export const deleteFavorite = createAsyncThunk('slice/deleteFavorite', async (favoriteId) => {
  const response = await axios.delete(`${API_URL}/favorites/${favoriteId}`);
  return response.data;
});

//* ORDERS
export const createOrder = createAsyncThunk('slice/createOrder', async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
});

export const getClientOrders = createAsyncThunk('slice/getClientOrders', async (clientId) => {
  const response = await axios.get(`${API_URL}/orders/client/${clientId}`);
  return response.data;
});

export const getOrderById = createAsyncThunk('slice/getOrderById', async (orderId) => {
  const response = await axios.get(`${API_URL}/orders/${orderId}`);
  return response.data;
});

export const deleteOrderById = createAsyncThunk('slice/deleteOrderById', async (orderId) => {
  const response = await axios.delete(`${API_URL}/orders/${orderId}`);
  return response.data;
});

export const updateOrderById = createAsyncThunk('slice/updateOrderById', async (orderId, order) => {
  const response = await axios.patch(`${API_URL}/orders/${orderId}`, order);
  return response.data;
});

//* USERS
export const getUserById = createAsyncThunk('slice/getUserById', async (userId) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
});

export const createUser = createAsyncThunk('slice/createUser', async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
});

export const updateUserById = createAsyncThunk('slice/updateUserById', async (userId, userData) => {
  const response = await axios.patch(`${API_URL}/users/${userId}`, userData);
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
export const getReviewById = createAsyncThunk('slice/getReviewById', async (reviewId) => {
  const response = await axios.get(`${API_URL}/reviews/${reviewId}`);
  return response.data;
});

export const getClientReviews = createAsyncThunk('slice/getClientReviews', async (userId) => {
  const response = await axios.get(`${API_URL}/reviews/users/${userId}`);
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

//* INITIAL STATE
const initialState = {
  allProducts: [],
  filteredProducts: [],
  selectedProduct: {},
  categories: [],

  // Filters
  category: 'All',
  gender: 'All',
  season: 'All',
  size: 'All',
  discount: 'All',
  order: 'Default',
  currentPage: 1,

  // Favorites
  favorites: [],

  // Cart
  cartItems: [],
  cartTotal: 0,

  // Orders
  clientOrders: [],
  selectedOrder: {},

  // Users
  selectedUser: {},

  // Reviews
  clientReviews: [],
  selectedReview: {},

  //* Async Status
  // Products
  getAllProductsStatus: 'idle',
  getProductByIdStatus: 'idle',
  getProductByNameStatus: 'idle',
  getCategories: 'idle',

  // Favorites
  getClientFavoritesStatus: 'idle',
  addFavoriteStatus: 'idle',
  deleteFavoriteStatus: 'idle',

  // Orders
  getClientOrdersStatus: 'idle',
  getOrderByIdStatus: 'idle',
  createOrderStatus: 'idle',
  updateOrderByIdStatus: 'idle',
  deleteOrderByIdStatus: 'idle',

  // Users
  getUserByIdStatus: 'idle',
  createUserStatus: 'idle',
  updateUserByIdStatus: 'idle',
  deleteUserByIdStatus: 'idle',
  validateLoginStatus: 'idle',

  // Reviews
  getClientReviewsStatus: 'idle',
  getReviewByIdStatus: 'idle',
  createReviewStatus: 'idle',
  updateReviewByIdStatus: 'idle',
  deleteReviewByIdStatus: 'idle',

  //* Async Error
  // Products
  getAllProductsError: null,
  getProductByIdError: null,
  getProductByNameError: null,
  getCategories: null,

  // Favorites
  getClientFavoritesError: null,
  addFavoriteError: null,
  deleteFavoriteError: null,

  // Orders
  getClientOrdersError: null,
  getOrderByIdError: null,
  createOrderError: null,
  updateOrderByIdError: null,
  deleteOrderByIdError: null,

  // Users
  getUserByIdError: null,
  createUserError: null,
  updateUserByIdError: null,
  deleteUserByIdError: null,
  validateLoginError: null,

  // Reviews
  getClientReviewsError: null,
  getReviewByIdError: null,
  createReviewError: null,
  updateReviewByIdError: null,
  deleteReviewByIdError: null,
};

//* SLICE
const slice = createSlice({
  name: 'slice',
  initialState,

  reducers: {
    //* FILTER REDUCERS
    filterProducts(state, action) {
      let filteredSorted = [...state.allProducts];

      if (state.category !== 'All') {
        filteredSorted = filterByCategory(filteredSorted, state.category);
      }
      if (state.gender !== 'All') {
        filteredSorted = filterByGender(filteredSorted, state.gender);
      }
      if (state.season !== 'All') {
        filteredSorted = filterBySeason(filteredSorted, state.season);
      }
      if (state.discount !== 'All') {
        filteredSorted = filterByDiscount(filteredSorted, state.discount);
      }
      if (state.order !== 'Default') {
        filteredSorted = sortProducts(filteredSorted, state.order);
      }

      state.filteredProducts = filteredSorted;
    },

    updateCategoryFilter(state, action) {
      state.category = action.payload;
    },

    updateDiscountFilter(state, action) {
      state.discount = action.payload;
    },

    updateGenderFilter(state, action) {
      state.gender = action.payload;
    },

    updateSeasonFilter(state, action) {
      state.season = action.payload;
    },

    updateOrder(state, action) {
      state.order = action.payload;
    },

    resetFilters(state, action) {
      state.category = 'All';
      state.discount = 'All';
      state.gender = 'All';
      state.season = 'All';
      state.order = 'Default';
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    //* Clear Details
    clearSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },

    clearSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },

    //* CART REDUCERS
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
      }

      state.totalPrice -= existingItem.price;
    },

    updateItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      existingItem.quantity = quantity;

      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    clearCart(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },

  //* ASYNC REDUCERS
  extraReducers: (builder) => {
    builder
      //* PRODUCTS
      .addCase(getAllProducts.pending, (state) => {
        state.getAllProductsStatus = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.getAllProductsStatus = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.getAllProductsStatus = 'failed';
        state.getAllProductsError = action.error.message;
      })

      .addCase(getProductById.pending, (state) => {
        state.getProductByIdStatus = 'loading';
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.getProductByIdStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.getProductByIdStatus = 'failed';
        state.getProductByIdError = action.error.message;
      })

      .addCase(getProductByName.pending, (state) => {
        state.getProductByNameStatus = 'loading';
      })
      .addCase(getProductByName.fulfilled, (state, action) => {
        state.getProductByNameStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByName.rejected, (state, action) => {
        state.getProductByNameStatus = 'failed';
        state.getProductByNameError = action.error.message;
      })

      //* FAVORITES
      .addCase(getClientFavorites.pending, (state) => {
        state.getClientFavoritesStatus = 'loading';
      })
      .addCase(getClientFavorites.fulfilled, (state, action) => {
        state.getClientFavoritesStatus = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(getClientFavorites.rejected, (state, action) => {
        state.getClientFavoritesStatus = 'failed';
        state.getClientFavoritesError = action.error.message;
      })

      .addCase(addFavorite.pending, (state) => {
        state.addFavoriteStatus = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.addFavoriteStatus = 'succeeded';
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.addFavoriteStatus = 'failed';
        state.addFavoriteError = action.error.message;
      })

      .addCase(deleteFavorite.pending, (state) => {
        state.deleteFavoriteStatus = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.deleteFavoriteStatus = 'succeeded';
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.deleteFavoriteStatus = 'failed';
        state.deleteFavoriteError = action.error.message;
      })

      //* ORDERS
      .addCase(getClientOrders.pending, (state) => {
        state.getClientOrdersStatus = 'loading';
      })
      .addCase(getClientOrders.fulfilled, (state, action) => {
        state.getClientOrdersStatus = 'succeeded';
        state.clientOrders = action.payload;
      })
      .addCase(getClientOrders.rejected, (state, action) => {
        state.getClientOrdersStatus = 'failed';
        state.getClientOrdersError = action.error.message;
      })

      .addCase(getOrderById.pending, (state) => {
        state.getOrderByIdStatus = 'loading';
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.getOrderByIdStatus = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.getOrderByIdStatus = 'failed';
        state.getOrderByIdError = action.error.message;
      })

      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderStatus = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = 'failed';
        state.createOrderError = action.error.message;
      })

      .addCase(updateOrderById.pending, (state) => {
        state.updateOrderByIdStatus = 'loading';
      })
      .addCase(updateOrderById.fulfilled, (state, action) => {
        state.updateOrderByIdStatus = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(updateOrderById.rejected, (state, action) => {
        state.updateOrderByIdStatus = 'failed';
        state.updateOrderByIdError = action.error.message;
      })

      .addCase(deleteOrderById.pending, (state) => {
        state.deleteOrderByIdStatus = 'loading';
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.deleteOrderByIdStatus = 'succeeded';
      })
      .addCase(deleteOrderById.rejected, (state, action) => {
        state.deleteOrderByIdStatus = 'failed';
        state.deleteOrderByIdError = action.error.message;
      })

      //* USERS
      .addCase(getUserById.pending, (state) => {
        state.getUserByIdStatus = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.getUserByIdStatus = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.getUserByIdStatus = 'failed';
        state.getUserByIdError = action.error.message;
      })

      .addCase(createUser.pending, (state) => {
        state.createUserStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = 'failed';
        state.createUserError = action.error.message;
      })

      .addCase(updateUserById.pending, (state) => {
        state.updateUserByIdStatus = 'loading';
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.updateUserByIdStatus = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.updateUserByIdStatus = 'failed';
        state.updateUserByIdError = action.error.message;
      })

      .addCase(deleteUserById.pending, (state) => {
        state.deleteUserByIdStatus = 'loading';
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.deleteUserByIdStatus = 'succeeded';
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.deleteUserByIdStatus = 'failed';
        state.deleteUserByIdError = action.error.message;
      })

      .addCase(validateLogin.pending, (state) => {
        state.validateLoginByIdStatus = 'loading';
      })
      .addCase(validateLogin.fulfilled, (state, action) => {
        state.validateLoginByIdStatus = 'succeeded';
      })
      .addCase(validateLogin.rejected, (state, action) => {
        state.validateLoginByIdStatus = 'failed';
        state.validateLoginByIdError = action.error.message;
      })

      //* REVIEWS
      .addCase(getClientReviews.pending, (state) => {
        state.getClientReviewsStatus = 'loading';
      })
      .addCase(getClientReviews.fulfilled, (state, action) => {
        state.getClientReviewsStatus = 'succeeded';
        state.clientReviews = action.payload;
      })
      .addCase(getClientReviews.rejected, (state, action) => {
        state.getClientReviewsStatus = 'failed';
        state.getClientReviewsError = action.error.message;
      })

      .addCase(getReviewById.pending, (state) => {
        state.getReviewByIdStatus = 'loading';
      })
      .addCase(getReviewById.fulfilled, (state, action) => {
        state.getReviewByIdStatus = 'succeeded';
        state.selectedReview = action.payload;
      })
      .addCase(getReviewById.rejected, (state, action) => {
        state.getReviewByIdStatus = 'failed';
        state.getReviewByIdError = action.error.message;
      })

      .addCase(createReview.pending, (state) => {
        state.createReviewStatus = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.createReviewStatus = 'succeeded';
        state.selectedReview = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.createReviewStatus = 'failed';
        state.createReviewError = action.error.message;
      })

      .addCase(updateReviewById.pending, (state) => {
        state.updateReviewByIdStatus = 'loading';
      })
      .addCase(updateReviewById.fulfilled, (state, action) => {
        state.updateReviewByIdStatus = 'succeeded';
        state.selectedReview = action.payload;
      })
      .addCase(updateReviewById.rejected, (state, action) => {
        state.updateReviewByIdStatus = 'failed';
        state.updateReviewByIdError = action.error.message;
      })

      .addCase(deleteReviewById.pending, (state) => {
        state.deleteReviewByIdStatus = 'loading';
      })
      .addCase(deleteReviewById.fulfilled, (state, action) => {
        state.deleteReviewByIdStatus = 'succeeded';
      })
      .addCase(deleteReviewById.rejected, (state, action) => {
        state.deleteReviewByIdStatus = 'failed';
        state.deleteReviewByIdError = action.error.message;
      });
  },
});

//* EXPORT ACTIONS
export const {
  filterProducts,
  updateCategoryFilter,
  updateDiscountFilter,
  updateGenderFilter,
  updateSeasonFilter,
  updateOrder,
  resetFilters,
  setCurrentPage,
  clearSelectedOrder,
  clearSelectedProduct,
} = slice.actions;

//* EXPORT REDUCER
export default slice.reducer;
