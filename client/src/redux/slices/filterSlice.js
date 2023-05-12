import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filteredCatalog: [],
    category: 'All',
    gender: 'All',
    season: 'All',
    size: 'All',
    discount: 'All',
    priceOrder: 'Default',
    currentPage: 1,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { addItem, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
