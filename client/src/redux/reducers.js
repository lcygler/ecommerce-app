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
  state.filteredFavorites = [];

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

//* ORDERS
export const createOrder = (state, action) => {
  const products = action.payload;

  let id;
  if (state.orders && state.orders.length > 0) {
    const maxId = state.orders.reduce((maxId, order) => (order.id > maxId ? order.id : maxId), 0);
    id = maxId + 1;
  } else {
    id = 1;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const total = products.reduce(
    (total, product) => total + product.price * (1 - product.discounts) * product.quantity,
    0
  );

  const order = {
    id,
    date: `${year}-${month}-${day}`, // YYYY-MM-DD
    status: 'On its way',
    total,
    products: products,
  };

  state.orders.push(order);

  console.log('Orders:', state.orders);

  const userId = state.userId;
  localStorage.setItem(`user_${userId}_orders`, JSON.stringify(state.orders));
};

export const deleteOrder = (state, action) => {
  if (state.orders.length !== 0) {
    state.orders.pop();

    const userId = state.userId;
    localStorage.setItem(`user_${userId}_orders`, JSON.stringify(state.orders));
  }
};

export const clearOrders = (state, action) => {
  state.orders = [];

  const userId = state.userId;
  localStorage.removeItem(`user_${userId}_orders`);
};

//* AUTH
export const loginGoogle = (state, action) => {
  const user = action.payload;
  const userId = user.id;
  state.userId = userId;
  state.selectedUser = user;
  state.isAuthenticated = true;
  state.isAdmin = false;

  localStorage.setItem('userId', userId);
  localStorage.setItem(`user_${userId}_selectedUser`, JSON.stringify(user));
  localStorage.setItem(`user_${userId}_isAuthenticated`, 'true');
  localStorage.setItem(`user_${userId}_isAdmin`, 'false');

  state.cartProducts = JSON.parse(localStorage.getItem(`user_${userId}_cartProducts`)) || [];
  state.cartTotal = JSON.parse(localStorage.getItem(`user_${userId}_cartTotal`)) || 0;
  state.favorites = JSON.parse(localStorage.getItem(`user_${userId}_favorites`)) || [];
  state.orders = JSON.parse(localStorage.getItem(`user_${userId}_orders`)) || [];
};

export const logoutUser = (state, action) => {
  state.userId = '';
  state.selectedUser = {};
  state.isAuthenticated = false;
  state.isAdmin = false;
  state.cartProducts = [];
  state.cartTotal = 0;
  state.favorites = [];
  state.orders = [];

  localStorage.removeItem(`userId`);
};
