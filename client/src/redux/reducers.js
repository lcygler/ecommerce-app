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
export const addProduct = (state, action) => {
  const newProduct = action.payload;

  const existingProduct = state.cartProducts.find((product) => product.id === newProduct.id);

  if (existingProduct) {
    existingProduct.quantity += newProduct.quantity;
  } else {
    state.cartProducts.push(newProduct);
  }

  state.cartTotal += newProduct.price * newProduct.quantity;

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
};

export const removeProduct = (state, action) => {
  const productId = action.payload;

  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    state.cartProducts = state.cartProducts.filter((product) => product.id !== productId);

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
};

export const updateProduct = (state, action) => {
  const { productId, quantity } = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity = quantity;

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
};

export const increaseProduct = (state, action) => {
  const productId = action.payload;

  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
};

export const decreaseProduct = (state, action) => {
  const productId = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    if (existingProduct.quantity === 1) {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== productId);
    } else {
      existingProduct.quantity--;
    }

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
};

export const clearCart = (state, action) => {
  state.cartProducts = [];
  state.cartTotal = 0;
};

//* AUTH
export const logoutUser = (state, action) => {
  state.userId = '';
  state.selectedUser = {};
  state.isAuthenticated = false;
  state.isAdmin = false;
  state.cartProducts = [];
  state.cartTotal = 0;
};
