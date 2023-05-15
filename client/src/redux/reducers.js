import {
  filterByCategory,
  filterByDiscount,
  filterByGender,
  filterBySeason,
  sortProducts,
} from './helpers';

//* FILTERS
export const filterProducts = (state, action) => {
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
};

export const updateCategoryFilter = (state, action) => {
  state.category = action.payload;
};

export const updateDiscountFilter = (state, action) => {
  state.discount = action.payload;
};

export const updateGenderFilter = (state, action) => {
  state.gender = action.payload;
};

export const updateSeasonFilter = (state, action) => {
  state.season = action.payload;
};

export const updateOrder = (state, action) => {
  state.order = action.payload;
};

export const resetFilters = (state, action) => {
  state.category = 'All';
  state.discount = 'All';
  state.gender = 'All';
  state.season = 'All';
  state.order = 'Default';
};

export const setCurrentPage = (state, action) => {
  state.currentPage = action.payload;
};

export const clearSelectedProduct = (state, action) => {
  state.selectedProduct = action.payload;
};

export const clearSelectedOrder = (state, action) => {
  state.selectedOrder = action.payload;
};

//* CART
export const addItem = (state, action) => {
  const newItem = action.payload;
  const existingItem = state.items.find((item) => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    state.items.push(newItem);
  }

  state.totalPrice += newItem.price * newItem.quantity;
};

export const removeItem = (state, action) => {
  const itemId = action.payload;
  const existingItem = state.items.find((item) => item.id === itemId);

  if (existingItem.quantity === 1) {
    state.items = state.items.filter((item) => item.id !== itemId);
  } else {
    existingItem.quantity--;
  }

  state.totalPrice -= existingItem.price;
};

export const updateItemQuantity = (state, action) => {
  const { itemId, quantity } = action.payload;
  const existingItem = state.items.find((item) => item.id === itemId);

  existingItem.quantity = quantity;

  state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const clearCart = (state, action) => {
  state.items = [];
  state.totalPrice = 0;
};

//* AUTH
export const logoutUser = (state, action) => {
  state.selectedUser = {};
  state.isAuthenticated = false;
};
