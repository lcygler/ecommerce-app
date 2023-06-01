import {
  addFavorite,
  createPaymentLink,
  createProduct,
  createPurchase,
  createReview,
  createUser,
  deleteCartById,
  deleteProductById,
  deletePurchaseById,
  deleteReviewById,
  deleteUserById,
  deleteUserCart,
  getAdminProducts,
  getAllProducts,
  getAllPurchases,
  getAllReviews,
  getCartById,
  getCategories,
  getChartData,
  getGenders,
  getProductById,
  getProductByName,
  getPurchaseById,
  getReviewById,
  getSeasons,
  getUserById,
  getUserCart,
  getUserFavorites,
  getUserPurchases,
  getUserReviews,
  getUsers,
  loginGoogle,
  loginUser,
  removeFavorite,
  removeUserFavorites,
  sendPurchaseFailure,
  sendPurchaseSuccess,
  updateCartById,
  updateProductById,
  updateProductsStock,
  updatePurchaseById,
  updateReviewById,
  updateUserById,
  updateUserCart,
} from './asyncActions';

export const extraReducers = (builder) => {
  builder
    //* PRODUCTS
    .addCase(getAdminProducts.pending, (state) => {
      state.getAdminProductsStatus = 'loading';
    })
    .addCase(getAdminProducts.fulfilled, (state, action) => {
      state.getAdminProductsStatus = 'succeeded';
      state.adminProducts = action.payload;
    })
    .addCase(getAdminProducts.rejected, (state, action) => {
      state.getAdminProductsStatus = 'failed';
      state.getAdminProductsError = action.error.message;
    })

    .addCase(getAllProducts.pending, (state) => {
      state.getAllProductsStatus = 'loading';
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.getAllProductsStatus = 'succeeded';
      state.allProducts = action.payload;
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.getAllProductsStatus = 'failed';
      state.getAllProductsError = action.error.message;
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
    })

    .addCase(createProduct.pending, (state) => {
      state.createProductStatus = 'loading';
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.createProductStatus = 'succeeded';
      state.selectedProduct = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.createProductStatus = 'failed';
      state.createProductError = action.error.message;
    })

    .addCase(updateProductById.pending, (state) => {
      state.updateProductByIdStatus = 'loading';
    })
    .addCase(updateProductById.fulfilled, (state, action) => {
      state.updateProductByIdStatus = 'succeeded';
      state.selectedProduct = action.payload;
    })
    .addCase(updateProductById.rejected, (state, action) => {
      state.updateProductByIdStatus = 'failed';
      state.updateProductByIdError = action.error.message;
    })

    .addCase(deleteProductById.pending, (state) => {
      state.deleteProductByIdStatus = 'loading';
    })
    .addCase(deleteProductById.fulfilled, (state, action) => {
      state.deleteProductByIdStatus = 'succeeded';
    })
    .addCase(deleteProductById.rejected, (state, action) => {
      state.deleteProductByIdStatus = 'failed';
      state.deleteProductByIdError = action.error.message;
    })

    //* CATEGORIES
    .addCase(getCategories.pending, (state) => {
      state.getCategoriesStatus = 'loading';
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.getCategoriesStatus = 'succeeded';
      state.categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.getCategoriesStatus = 'failed';
      state.getCategoriesError = action.error.message;
    })

    //* SEASONS
    .addCase(getSeasons.pending, (state) => {
      state.getSeasonsStatus = 'loading';
    })
    .addCase(getSeasons.fulfilled, (state, action) => {
      state.getSeasonsStatus = 'succeeded';
      state.seasons = action.payload;
    })
    .addCase(getSeasons.rejected, (state, action) => {
      state.getSeasonsStatus = 'failed';
      state.getSeasonsError = action.error.message;
    })

    //* GENDERS
    .addCase(getGenders.pending, (state) => {
      state.getGendersStatus = 'loading';
    })
    .addCase(getGenders.fulfilled, (state, action) => {
      state.getGendersStatus = 'succeeded';
      state.genders = action.payload;
    })
    .addCase(getGenders.rejected, (state, action) => {
      state.getGendersStatus = 'failed';
      state.getGendersError = action.error.message;
    })

    //* FAVORITES
    .addCase(getUserFavorites.pending, (state) => {
      state.getUserFavoritesStatus = 'loading';
    })
    .addCase(getUserFavorites.fulfilled, (state, action) => {
      state.getUserFavoritesStatus = 'succeeded';
      state.favorites = action.payload;

      const userId = state.userId;
      localStorage.setItem(`user_${userId}_favorites`, JSON.stringify(action.payload));
    })
    .addCase(getUserFavorites.rejected, (state, action) => {
      state.getUserFavoritesStatus = 'failed';
      state.getUserFavoritesError = action.error.message;
    })

    .addCase(addFavorite.pending, (state) => {
      state.addFavoriteStatus = 'loading';
    })
    .addCase(addFavorite.fulfilled, (state, action) => {
      state.addFavoriteStatus = 'succeeded';
    })
    .addCase(addFavorite.rejected, (state, action) => {
      state.addFavoriteStatus = 'failed';
      state.addFavoriteError = action.error.message;
    })

    .addCase(removeFavorite.pending, (state) => {
      state.removeFavoriteStatus = 'loading';
    })
    .addCase(removeFavorite.fulfilled, (state, action) => {
      state.removeFavoriteStatus = 'succeeded';
    })
    .addCase(removeFavorite.rejected, (state, action) => {
      state.removeFavoriteStatus = 'failed';
      state.removeFavoriteError = action.error.message;
    })

    .addCase(removeUserFavorites.pending, (state) => {
      state.removeUserFavoritesStatus = 'loading';
    })
    .addCase(removeUserFavorites.fulfilled, (state, action) => {
      state.removeUserFavoritesStatus = 'succeeded';
    })
    .addCase(removeUserFavorites.rejected, (state, action) => {
      state.removeUserFavoritesStatus = 'failed';
      state.removeUserFavoritesError = action.error.message;
    })

    //* CART
    .addCase(getUserCart.pending, (state) => {
      state.getUserCartStatus = 'loading';
    })
    .addCase(getUserCart.fulfilled, (state, action) => {
      state.getUserCartStatus = 'succeeded';
      state.selectedCart = action.payload;
      state.cartProducts = action.payload;
      state.cartTotal = action.payload.reduce(
        (total, product) => total + product.price * (1 - product.discounts) * product.quantity,
        0
      );

      const userId = state.userId;
      localStorage.setItem(`user_${userId}_cartProducts`, JSON.stringify(action.payload));
    })
    .addCase(getUserCart.rejected, (state, action) => {
      state.getUserCartStatus = 'failed';
      state.getUserCartError = action.error.message;
    })

    .addCase(updateUserCart.pending, (state) => {
      state.updateUserCartStatus = 'loading';
    })
    .addCase(updateUserCart.fulfilled, (state, action) => {
      state.updateUserCartStatus = 'succeeded';
      state.selectedCart = action.payload;
    })
    .addCase(updateUserCart.rejected, (state, action) => {
      state.updateUserCartStatus = 'failed';
      state.updateUserCartError = action.error.message;
    })

    .addCase(deleteUserCart.pending, (state) => {
      state.deleteUserCartStatus = 'loading';
    })
    .addCase(deleteUserCart.fulfilled, (state, action) => {
      state.deleteUserCartStatus = 'succeeded';
    })
    .addCase(deleteUserCart.rejected, (state, action) => {
      state.deleteUserCartStatus = 'failed';
      state.deleteUserCartError = action.error.message;
    })

    .addCase(getCartById.pending, (state) => {
      state.getCartByIdStatus = 'loading';
    })
    .addCase(getCartById.fulfilled, (state, action) => {
      state.getCartByIdStatus = 'succeeded';
      state.selectedCart = action.payload;
    })
    .addCase(getCartById.rejected, (state, action) => {
      state.getCartByIdStatus = 'failed';
      state.getCartByIdError = action.error.message;
    })

    .addCase(updateCartById.pending, (state) => {
      state.updateCartByIdStatus = 'loading';
    })
    .addCase(updateCartById.fulfilled, (state, action) => {
      state.updateCartByIdStatus = 'succeeded';
      state.selectedCart = action.payload;
    })
    .addCase(updateCartById.rejected, (state, action) => {
      state.updateCartByIdStatus = 'failed';
      state.updateCartByIdError = action.error.message;
    })

    .addCase(deleteCartById.pending, (state) => {
      state.deleteCartByIdStatus = 'loading';
    })
    .addCase(deleteCartById.fulfilled, (state, action) => {
      state.deleteCartByIdStatus = 'succeeded';
    })
    .addCase(deleteCartById.rejected, (state, action) => {
      state.deleteCartByIdStatus = 'failed';
      state.deleteCartByIdError = action.error.message;
    })

    //* PAYMENT
    .addCase(createPaymentLink.pending, (state) => {
      state.createPaymentLinkStatus = 'loading';
    })
    .addCase(createPaymentLink.fulfilled, (state, action) => {
      state.createPaymentLinkStatus = 'succeeded';
      state.paymentLink = action.payload;
    })
    .addCase(createPaymentLink.rejected, (state, action) => {
      state.createPaymentLinkStatus = 'failed';
      state.createPaymentLinkError = action.error.message;
    })

    //* STOCK
    .addCase(updateProductsStock.pending, (state) => {
      state.updateProductsStockStatus = 'loading';
    })
    .addCase(updateProductsStock.fulfilled, (state, action) => {
      state.updateProductsStockStatus = 'succeeded';
    })
    .addCase(updateProductsStock.rejected, (state, action) => {
      state.updateProductsStockStatus = 'failed';
      state.updateProductsStockError = action.error.message;
    })

    //* PURCHASES
    .addCase(getAllPurchases.pending, (state) => {
      state.getAllPurchasesStatus = 'loading';
    })
    .addCase(getAllPurchases.fulfilled, (state, action) => {
      state.getAllPurchasesStatus = 'succeeded';
      state.allPurchases = action.payload;
    })
    .addCase(getAllPurchases.rejected, (state, action) => {
      state.getAllPurchasesStatus = 'failed';
      state.getAllPurchasesError = action.error.message;
    })

    .addCase(getUserPurchases.pending, (state) => {
      state.getUserPurchasesStatus = 'loading';
    })
    .addCase(getUserPurchases.fulfilled, (state, action) => {
      state.getUserPurchasesStatus = 'succeeded';
      state.purchases = action.payload;

      const userId = state.userId;
      localStorage.setItem(`user_${userId}_purchases`, JSON.stringify(action.payload));
    })
    .addCase(getUserPurchases.rejected, (state, action) => {
      state.getUserPurchasesStatus = 'failed';
      state.getUserPurchasesError = action.error.message;
    })

    .addCase(getPurchaseById.pending, (state) => {
      state.getPurchaseByIdStatus = 'loading';
    })
    .addCase(getPurchaseById.fulfilled, (state, action) => {
      state.getPurchaseByIdStatus = 'succeeded';
      state.selectedPurchase = action.payload;
    })
    .addCase(getPurchaseById.rejected, (state, action) => {
      state.getPurchaseByIdStatus = 'failed';
      state.getPurchaseByIdError = action.error.message;
    })

    .addCase(createPurchase.pending, (state) => {
      state.createPurchaseStatus = 'loading';
    })
    .addCase(createPurchase.fulfilled, (state, action) => {
      state.createPurchaseStatus = 'succeeded';
      state.selectedPurchase = action.payload;

      const userId = action.payload?.UserId;
      localStorage.setItem(`user_${userId}_selectedPurchase`, JSON.stringify(action.payload));
    })
    .addCase(createPurchase.rejected, (state, action) => {
      state.createPurchaseStatus = 'failed';
      state.createPurchaseError = action.error.message;
    })

    .addCase(updatePurchaseById.pending, (state) => {
      state.updatePurchaseByIdStatus = 'loading';
    })
    .addCase(updatePurchaseById.fulfilled, (state, action) => {
      state.updatePurchaseByIdStatus = 'succeeded';
      state.selectedPurchase = action.payload;
    })
    .addCase(updatePurchaseById.rejected, (state, action) => {
      state.updatePurchaseByIdStatus = 'failed';
      state.updatePurchaseByIdError = action.error.message;
    })

    .addCase(deletePurchaseById.pending, (state) => {
      state.deletePurchaseByIdStatus = 'loading';
    })
    .addCase(deletePurchaseById.fulfilled, (state, action) => {
      state.deletePurchaseByIdStatus = 'succeeded';
    })
    .addCase(deletePurchaseById.rejected, (state, action) => {
      state.deletePurchaseByIdStatus = 'failed';
      state.deletePurchaseByIdError = action.error.message;
    })

    //* EMAILS
    .addCase(sendPurchaseSuccess.pending, (state) => {
      state.sendPurchaseSuccessStatus = 'loading';
    })
    .addCase(sendPurchaseSuccess.fulfilled, (state, action) => {
      state.sendPurchaseSuccessStatus = 'succeeded';
    })
    .addCase(sendPurchaseSuccess.rejected, (state, action) => {
      state.sendPurchaseSuccessStatus = 'failed';
      state.sendPurchaseSuccessError = action.error.message;
    })

    .addCase(sendPurchaseFailure.pending, (state) => {
      state.sendPurchaseFailureStatus = 'loading';
    })
    .addCase(sendPurchaseFailure.fulfilled, (state, action) => {
      state.sendPurchaseFailureStatus = 'succeeded';
    })
    .addCase(sendPurchaseFailure.rejected, (state, action) => {
      state.sendPurchaseFailureStatus = 'failed';
      state.sendPurchaseFailureError = action.error.message;
    })

    //* USERS
    .addCase(getUsers.pending, (state) => {
      state.getUsersStatus = 'loading';
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.getUsersStatus = 'succeeded';
      state.allUsers = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.getUsersStatus = 'failed';
      state.getUsersError = action.error.message;
    })

    .addCase(getUserById.pending, (state) => {
      state.getUserByIdStatus = 'loading';
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.getUserByIdStatus = 'succeeded';
      state.selectedUser = action.payload;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.getUserByIdStatus = 'failed';
      state.getUserByIdError = action.error.message;
    })

    .addCase(createUser.pending, (state) => {
      state.createUserStatus = 'loading';
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.createUserStatus = 'succeeded';
      state.selectedUser = action.payload;
    })
    .addCase(createUser.rejected, (state, action) => {
      state.createUserStatus = 'failed';
      state.createUserError = action.error.message;
    })

    .addCase(updateUserById.pending, (state) => {
      state.updateUserByIdStatus = 'loading';
    })
    .addCase(updateUserById.fulfilled, (state, action) => {
      state.updateUserByIdStatus = 'succeeded';
      state.selectedUser = action.payload;
    })
    .addCase(updateUserById.rejected, (state, action) => {
      state.updateUserByIdStatus = 'failed';
      state.updateUserByIdError = action.error.message;
    })

    .addCase(deleteUserById.pending, (state) => {
      state.deleteUserByIdStatus = 'loading';
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
      state.deleteUserByIdStatus = 'succeeded';
    })
    .addCase(deleteUserById.rejected, (state, action) => {
      state.deleteUserByIdStatus = 'failed';
      state.deleteUserByIdError = action.error.message;
    })

    .addCase(loginUser.pending, (state) => {
      state.loginUserStatus = 'loading';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loginUserStatus = 'succeeded';
      state.selectedUser = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.user.isAdmin;
      state.userId = action.payload.user.id;

      const userId = action.payload.user.id;
      localStorage.setItem('userId', userId);
      localStorage.setItem(`user_${userId}_selectedUser`, JSON.stringify(action.payload));
      localStorage.setItem(`user_${userId}_isAuthenticated`, 'true');
      localStorage.setItem(`user_${userId}_isAdmin`, action.payload.user.isAdmin);

      // state.cartProducts = JSON.parse(localStorage.getItem(`user_${userId}_cartProducts`)) || [];
      // state.cartTotal = JSON.parse(localStorage.getItem(`user_${userId}_cartTotal`)) || 0;
      // state.purchases = JSON.parse(localStorage.getItem(`user_${userId}_purchases`)) || [];
      // state.favorites = JSON.parse(localStorage.getItem(`user_${userId}_favorites`)) || [];
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loginUserStatus = 'failed';
      state.loginUserError = action.error.message;
    })

    //* GOOGLE LOGIN
    .addCase(loginGoogle.pending, (state) => {
      state.loginGoogleStatus = 'loading';
    })
    .addCase(loginGoogle.fulfilled, (state, action) => {
      state.loginGoogleStatus = 'succeeded';
      state.selectedUser = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.user.isAdmin;
      state.userId = action.payload.user.id;

      const userId = action.payload.user.id;
      localStorage.setItem('userId', userId);
      localStorage.setItem(`user_${userId}_selectedUser`, JSON.stringify(action.payload));
      localStorage.setItem(`user_${userId}_isAuthenticated`, 'true');
      localStorage.setItem(`user_${userId}_isAdmin`, action.payload.user.isAdmin);

      // state.cartProducts = JSON.parse(localStorage.getItem(`user_${userId}_cartProducts`)) || [];
      // state.cartTotal = JSON.parse(localStorage.getItem(`user_${userId}_cartTotal`)) || 0;
      // state.purchases = JSON.parse(localStorage.getItem(`user_${userId}_purchases`)) || [];
      // state.favorites = JSON.parse(localStorage.getItem(`user_${userId}_favorites`)) || [];
    })
    .addCase(loginGoogle.rejected, (state, action) => {
      state.loginGoogleStatus = 'failed';
      state.loginGoogleError = action.error.message;
    })

    //* REVIEWS
    .addCase(getAllReviews.pending, (state) => {
      state.getAllReviewsStatus = 'loading';
    })
    .addCase(getAllReviews.fulfilled, (state, action) => {
      state.getAllReviewsStatus = 'succeeded';
      state.allReviews = action.payload;
    })
    .addCase(getAllReviews.rejected, (state, action) => {
      state.getAllReviewsStatus = 'failed';
      state.getAllReviewsError = action.error.message;
    })

    .addCase(getUserReviews.pending, (state) => {
      state.getUserReviewsStatus = 'loading';
    })
    .addCase(getUserReviews.fulfilled, (state, action) => {
      state.getUserReviewsStatus = 'succeeded';
      state.userReviews = action.payload;
    })
    .addCase(getUserReviews.rejected, (state, action) => {
      state.getUserReviewsStatus = 'failed';
      state.getUserReviewsError = action.error.message;
    })

    .addCase(getReviewById.pending, (state) => {
      state.getReviewByIdStatus = 'loading';
    })
    .addCase(getReviewById.fulfilled, (state, action) => {
      state.getReviewByIdStatus = 'succeeded';
      state.selectedReview = action.payload;
    })
    .addCase(getReviewById.rejected, (state, action) => {
      state.getReviewByIdStatus = 'failed';
      state.getReviewByIdError = action.error.message;
    })

    .addCase(createReview.pending, (state) => {
      state.createReviewStatus = 'loading';
    })
    .addCase(createReview.fulfilled, (state, action) => {
      state.createReviewStatus = 'succeeded';
      state.selectedReview = action.payload;
    })
    .addCase(createReview.rejected, (state, action) => {
      state.createReviewStatus = 'failed';
      state.createReviewError = action.error.message;
    })

    .addCase(updateReviewById.pending, (state) => {
      state.updateReviewByIdStatus = 'loading';
    })
    .addCase(updateReviewById.fulfilled, (state, action) => {
      state.updateReviewByIdStatus = 'succeeded';
      state.selectedReview = action.payload;
    })
    .addCase(updateReviewById.rejected, (state, action) => {
      state.updateReviewByIdStatus = 'failed';
      state.updateReviewByIdError = action.error.message;
    })

    .addCase(deleteReviewById.pending, (state) => {
      state.deleteReviewByIdStatus = 'loading';
    })
    .addCase(deleteReviewById.fulfilled, (state, action) => {
      state.deleteReviewByIdStatus = 'succeeded';
    })
    .addCase(deleteReviewById.rejected, (state, action) => {
      state.deleteReviewByIdStatus = 'failed';
      state.deleteReviewByIdError = action.error.message;
    })

    //* CHART DATA
    .addCase(getChartData.pending, (state) => {
      state.getChartDataStatus = 'loading';
    })
    .addCase(getChartData.fulfilled, (state, action) => {
      state.getChartDataStatus = 'succeeded';
      state.chartData = action.payload;
    })
    .addCase(getChartData.rejected, (state, action) => {
      state.getChartDataStatus = 'failed';
      state.getChartDataError = action.error.message;
    });
};
