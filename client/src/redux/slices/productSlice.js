import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get(`${API_URL}/catalog`);
  return response.data;
});

export const getProductById = createAsyncThunk('products/getProductById', async (id) => {
  const response = await axios.get(`${API_URL}/catalog/${id}`);
  return response.data;
});

export const getProductByName = createAsyncThunk('products/getProductByName', async (name) => {
  const response = await axios.get(`${API_URL}/catalog?name=${name}`);
  return response.data;
});

export const getCategories = createAsyncThunk('products/getCategories', async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    selectedProduct: {},
    categories: [],
    getProductsStatus: 'idle',
    getProductByIdStatus: 'idle',
    getProductByNameStatus: 'idle',
    getProductsError: null,
    getProductByIdError: null,
    getProductByNameError: null,
  },
  reducers: {},
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

export const { filterProducts } = productSlice.actions;

export default productSlice.reducer;
