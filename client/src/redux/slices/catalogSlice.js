import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const getCatalog = createAsyncThunk('catalog/getCatalog', async () => {
  const response = await axios.get(`${API_URL}/catalog`);
  return response.data;
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    catalog: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catalog = action.payload;
      })
      .addCase(getCatalog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default catalogSlice.reducer;
