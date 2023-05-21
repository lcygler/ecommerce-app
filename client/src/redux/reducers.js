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

export const filterFavorites = (state, action) => {
  let filteredSorted = [...state.favorites];

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

  state.filteredFavorites = filteredSorted;
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

//* FAVORITES
export const addFavorite = (state, action) => {
  const newFav = action.payload;
  state.favorites.push(newFav);

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_favorites`, JSON.stringify(state.favorites));
};

export const removeFavorite = (state, action) => {
  const favId = action.payload;
  state.favorites = state.favorites.filter((fav) => fav.id !== favId);

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_favorites`, JSON.stringify(state.favorites));
};

export const clearFavorites = (state, action) => {
  state.favorites = [];

  const userId = state.userId;
  localStorage.removeItem(`user_${userId}_favorites`);
};

//* CART
export const addProduct = (state, action) => {
  const newProduct = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === newProduct.id);

  if (!existingProduct) {
    state.cartProducts.push(newProduct);
    state.cartTotal += newProduct.price * (1 - newProduct.discounts);

    const userId = state.userId;
    localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
    localStorage.setItem(`user_${userId}_cartTotal`, JSON.stringify(state.cartTotal));
  }
};

export const removeProduct = (state, action) => {
  const productId = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    state.cartTotal -=
      existingProduct.price * (1 - existingProduct.discounts) * existingProduct.quantity;

    state.cartProducts = state.cartProducts.filter((product) => product.id !== productId);

    const userId = state.userId;
    localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
    localStorage.setItem(`user_${userId}_cartTotal`, JSON.stringify(state.cartTotal));
  }
};

export const updateProduct = (state, action) => {
  const { productId, quantity } = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity = quantity;

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * (1 - product.discounts) * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
  localStorage.setItem(`user_${userId}_cartTotal`, JSON.stringify(state.cartTotal));
};

export const increaseProduct = (state, action) => {
  const productId = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
    state.cartTotal += existingProduct.price * (1 - existingProduct.discounts);
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
  localStorage.setItem(`user_${userId}_cartTotal`, JSON.stringify(state.cartTotal));
};

export const decreaseProduct = (state, action) => {
  const productId = action.payload;
  const existingProduct = state.cartProducts.find((product) => product.id === productId);

  if (existingProduct) {
    if (existingProduct.quantity === 1) {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== productId);
    } else if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
    }

    state.cartTotal = state.cartProducts.reduce(
      (total, product) => total + product.price * (1 - product.discounts) * product.quantity,
      0
    );
  }

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(state.cartProducts));
  localStorage.setItem(`user_${userId}_cartTotal`, JSON.stringify(state.cartTotal));
};

export const clearCart = (state, action) => {
  state.cartProducts = [];
  state.cartTotal = 0;

  const userId = state.userId;
  localStorage.removeItem(`user_${userId}_cartProducts`);
  localStorage.removeItem(`user_${userId}_cartTotal`);
};

//* AUTH
export const logoutUser = (state, action) => {
  state.userId = '';
  state.selectedUser = {};
  state.isAuthenticated = false;
  state.isAdmin = false;
  state.cartProducts = [];
  state.cartTotal = 0;
  state.favorites = [];

  localStorage.removeItem(`userId`);
};
