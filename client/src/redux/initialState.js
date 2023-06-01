export const getInitialState = () => {
  //* USER
  const storedUserId = localStorage.getItem('userId');
  const storedSelectedUser = JSON.parse(localStorage.getItem(`user_${storedUserId}_selectedUser`));
  const storedIsAuthenticated =
    localStorage.getItem(`user_${storedUserId}_isAuthenticated`) === 'true';
  const storedIsAdmin = localStorage.getItem(`user_${storedUserId}_isAdmin`) === 'true';

  //* PRODUCTS
  const storedFilteredProducts = JSON.parse(
    localStorage.getItem(`user_${storedUserId}_filteredProducts`)
  );

  //* CART
  const storedCartProducts = JSON.parse(localStorage.getItem(`user_${storedUserId}_cartProducts`));
  const storedCartTotal = JSON.parse(localStorage.getItem(`user_${storedUserId}_cartTotal`));

  //* PURCHASES
  const storedPurchases = JSON.parse(localStorage.getItem(`user_${storedUserId}_purchases`));
  const storedSelectedPurchase = JSON.parse(
    localStorage.getItem(`user_${storedUserId}_selectedPurchase`)
  );

  //* FAVORITES
  const storedFavorites = JSON.parse(localStorage.getItem(`user_${storedUserId}_favorites`));

  return {
    // Products
    adminProducts: [],
    allProducts: [],
    filteredAdminProducts: [],
    filteredProducts: storedFilteredProducts || [],
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
    stock: 'All',
    name: '',
    lastname: '',
    username: '',
    email: '',
    birthdate: '',
    phoneNumber: '',
    disable: '',
    admin: '',
    searchTerm: '',
    currentPage: 1,

    // Favorites
    favorites: storedFavorites || [],
    filteredFavorites: [],

    // Cart
    selectedCart: {},
    cartProducts: storedCartProducts || [],
    cartTotal: storedCartTotal || 0,

    // Purchases
    allPurchases: [],
    purchases: storedPurchases || [],
    selectedPurchase: storedSelectedPurchase || {},
    paymentLink: '',

    // Users
    allUsers: [],
    filteredUsers: [],
    userId: storedUserId || null,
    selectedUser: storedSelectedUser || {},
    isAuthenticated: storedIsAuthenticated || false,
    isAdmin: storedIsAdmin || false,

    // Reviews
    allReviews: [],
    reviews: [],
    selectedReview: {},

    // Chart
    chartData: [],

    //* Async Status
    // Products
    getAllProductsStatus: 'idle',
    getAdminProductsStatus: 'idle',
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
    removeFavoriteStatus: 'idle',
    removeUserFavoritesStatus: 'idle',

    // Cart
    getUserCartStatus: 'idle',
    updateUserCartStatus: 'idle',
    deleteUserCartStatus: 'idle',
    getCartByIdStatus: 'idle',
    updateCartByIdStatus: 'idle',
    deleteCartByIdStatus: 'idle',

    // Payment
    createPaymentLinkStatus: 'idle',

    // Stock
    updateProductsStockStatus: 'idle',

    // Purchases
    getAllPurchasesStatus: 'idle',
    getUserPurchasesStatus: 'idle',
    getPurchaseByIdStatus: 'idle',
    createPurchaseStatus: 'idle',
    updatePurchaseByIdStatus: 'idle',
    deletePurchaseByIdStatus: 'idle',
    sendPurchaseSuccessStatus: 'idle',
    sendPurchaseFailureStatus: 'idle',

    // Users
    getUsersStatus: 'idle',
    getUserByIdStatus: 'idle',
    createUserStatus: 'idle',
    updateUserByIdStatus: 'idle',
    deleteUserByIdStatus: 'idle',
    loginUserStatus: 'idle',
    loginGoogleStatus: 'idle',

    // Reviews
    getAllReviewsStatus: 'idle',
    getUserReviewsStatus: 'idle',
    getReviewByIdStatus: 'idle',
    createReviewStatus: 'idle',
    updateReviewByIdStatus: 'idle',
    deleteReviewByIdStatus: 'idle',

    //Chart
    getChartDataStatus: 'idle',

    //* Async Error
    // Products
    getAdminProductsError: null,
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
    removeFavoriteError: null,
    removeUserFavoritesError: null,

    // Cart
    getUserCartError: null,
    updateUserCartError: null,
    deleteUserCartError: null,
    getCartByIdError: null,
    updateCartByIdError: null,
    deleteCartByIdError: null,

    // Payment
    createPaymentLinkError: null,

    // Stock
    updateProductsStockError: null,

    // Purchases
    getAllPurchasesError: null,
    getUserPurchasesError: null,
    getPurchaseByIdError: null,
    createPurchaseError: null,
    updatePurchaseByIdError: null,
    deletePurchaseByIdError: null,
    sendPurchaseSuccessError: null,
    sendPurchaseFailureError: null,

    // Users
    getUsersError: null,
    getUserByIdError: null,
    createUserError: null,
    updateUserByIdError: null,
    deleteUserByIdError: null,
    loginUserError: null,
    loginGoogleError: null,

    // Reviews
    getAllReviewsError: null,
    getUserReviewsError: null,
    getReviewByIdError: null,
    createReviewError: null,
    updateReviewByIdError: null,
    deleteReviewByIdError: null,

    //Chart
    getChartDataError: null,
  };
};
