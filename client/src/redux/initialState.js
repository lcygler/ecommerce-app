export const initialState = {
  // Products
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
  loginStatus: 'Logged out',

  // Reviews
  clientReviews: [],
  selectedReview: {},

  //* Async Status
  // Products
  getAllProductsStatus: 'idle',
  getProductByIdStatus: 'idle',
  getProductByNameStatus: 'idle',
  createProductStatus: 'idle',
  updateProductByIdStatus: 'idle',
  deleteProductStatus: 'idle',
  getCategoriesStatus: 'idle',

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
  createProductError: null,
  updateProductByIdError: null,
  deleteProductError: null,
  getCategoriesError: null,

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
