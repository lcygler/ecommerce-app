export const getInitialState = () => {
  //* USER
  const storedUserId = localStorage.getItem('userId');
  const storedSelectedUser = JSON.parse(localStorage.getItem(`user_${storedUserId}_selectedUser`));
  const storedIsAuthenticated =
    localStorage.getItem(`user_${storedUserId}_isAuthenticated`) === 'true';
  const storedIsAdmin = localStorage.getItem(`user_${storedUserId}_isAdmin`) === 'true';

  //* CART
  const storedCartProducts = JSON.parse(localStorage.getItem(`user_${storedUserId}_cartProducts`));
  const storedCartTotal = JSON.parse(localStorage.getItem(`user_${storedUserId}_cartTotal`));

  //* ORDERS
  const storedOrders = JSON.parse(localStorage.getItem(`user_${storedUserId}_orders`));

  //* FAVORITES
  const storedFavorites = JSON.parse(localStorage.getItem(`user_${storedUserId}_favorites`));

  return {
    // Products
    allProducts: [],
    filteredProducts: [],
    selectedProduct: {},
    categories: [],
    seasons: [],
    genders: [],

    // Filters
    category: 'All',
    gender: 'All',
    season: 'All',
    size: 'All',
    discount: 'All',
    order: 'Default',
    currentPage: 1,

    // Favorites
    favorites: storedFavorites || [],
    filteredFavorites: [],

    // Cart
    selectedCart: {},
    cartProducts: storedCartProducts || [],
    cartTotal: storedCartTotal || 0,

    // Orders
    orders: storedOrders || [],
    selectedOrder: {},
    paymentLink: '',

    // Users
    userId: storedUserId || null,
    selectedUser: storedSelectedUser || {},
    isAuthenticated: storedIsAuthenticated || false,
    isAdmin: storedIsAdmin || false,

    // Reviews
    reviews: [],
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
    getSeasonsStatus: 'idle',
    getGendersStatus: 'idle',

    // Favorites
    getUserFavoritesStatus: 'idle',
    addFavoriteStatus: 'idle',
    deleteFavoriteStatus: 'idle',

    // Cart
    getUserCartStatus: 'idle',
    getCartByIdStatus: 'idle',
    createCartStatus: 'idle',
    updateCartByIdStatus: 'idle',
    deleteCartByIdStatus: 'idle',
    createPaymentLinkStatus: 'idle',
    updateProductsStockStatus: 'idle',

    // Orders
    getUserOrdersStatus: 'idle',
    getOrderByIdStatus: 'idle',
    createOrderStatus: 'idle',
    updateOrderByIdStatus: 'idle',
    deleteOrderByIdStatus: 'idle',

    // Users
    getUserByIdStatus: 'idle',
    createUserStatus: 'idle',
    updateUserByIdStatus: 'idle',
    deleteUserByIdStatus: 'idle',
    loginUserStatus: 'idle',
    loginGoogleStatus: 'idle',

    // Reviews
    getUserReviewsStatus: 'idle',
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
    getSeasonsError: null,
    getGendersError: null,

    // Favorites
    getUserFavoritesError: null,
    addFavoriteError: null,
    deleteFavoriteError: null,

    // Cart
    getUserCartError: null,
    getCartByIdError: null,
    createCartError: null,
    updateCartByIdError: null,
    deleteCartByIdError: null,
    createPaymentLinkError: null,
    updateProductsStockError: null,

    // Orders
    getUserOrdersError: null,
    getOrderByIdError: null,
    createOrderError: null,
    updateOrderByIdError: null,
    deleteOrderByIdError: null,

    // Users
    getUserByIdError: null,
    createUserError: null,
    updateUserByIdError: null,
    deleteUserByIdError: null,
    loginUserError: null,
    loginGoogleError: null,

    // Reviews
    getUserReviewsError: null,
    getReviewByIdError: null,
    createReviewError: null,
    updateReviewByIdError: null,
    deleteReviewByIdError: null,
  };
};
