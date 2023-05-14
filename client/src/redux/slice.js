import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

//* ASYNC REDUCERS
export const getProducts = createAsyncThunk('slice/getProducts', async () => {
  const response = await axios.get(`${API_URL}/catalog`);
  return response.data;
});

export const getProductById = createAsyncThunk('slice/getProductById', async (id) => {
  const response = await axios.get(`${API_URL}/catalog/${id}`);
  return response.data;
});

export const getProductByName = createAsyncThunk('slice/getProductByName', async (name) => {
  const response = await axios.get(`${API_URL}/catalog?name=${name}`);
  return response.data;
});

export const getCategories = createAsyncThunk('slice/getCategories', async () => {
  const response = await axios.get(`${API_URL}/categories`);
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

  // Cart
  cartItems: [],
  cartTotal: 0,

  // Async Status
  getProductsStatus: 'idle',
  getProductByIdStatus: 'idle',
  getProductByNameStatus: 'idle',

  // Async Error
  getProductsError: null,
  getProductByIdError: null,
  getProductByNameError: null,
};

//* SLICE
const slice = createSlice({
  name: 'slice',
  initialState,

  //* FILTER REDUCERS
  reducers: {
    filterProducts(state, action) {
      let filteredSorted = [...state.allProducts];

      if (state.category !== 'All') {
        filteredSorted = filteredSorted.filter((product) =>
          product.categories.map((e) => e.name).includes(state.category)
        );
      }

      if (state.gender !== 'All') {
        filteredSorted = filteredSorted.filter((product) => product.gender === state.gender);
      }

      if (state.season !== 'All') {
        filteredSorted = filteredSorted.filter((product) =>
          product.seasons.map((e) => e.name).includes(state.season)
        );
      }

      if (state.discount !== 'All') {
        filteredSorted = filteredSorted.filter(
          (product) => product.discount === Number(state.discount)
        );
      }

      if (state.order !== 'Default') {
        switch (state.order) {
          case 'Price (Asc)':
            filteredSorted.sort((a, b) => {
              if (a.price < b.price) {
                return -1;
              } else if (a.price > b.price) {
                return 1;
              } else {
                return 0;
              }
            });
            break;

          case 'Price (Desc)':
            filteredSorted.sort((a, b) => {
              if (a.price < b.price) {
                return 1;
              } else if (a.price > b.price) {
                return -1;
              } else {
                return 0;
              }
            });
            break;

          default:
            break;
        }
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
      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsStatus = 'failed';
        state.getProductsError = action.error.message;
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
} = slice.actions;

//* EXPORT REDUCER
export default slice.reducer;
