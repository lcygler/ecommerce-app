import {
  addFavorite,
  createOrder,
  createProduct,
  createReview,
  createUser,
  deleteFavorite,
  deleteOrderById,
  deleteProductById,
  deleteReviewById,
  deleteUserById,
  getAllProducts,
  getCategories,
  getOrderById,
  getProductById,
  getProductByName,
  getReviewById,
  getUserById,
  getUserFavorites,
  getUserOrders,
  getUserReviews,
  updateOrderById,
  updateProductById,
  updateReviewById,
  updateUserById,
  validateLogin,
} from './asyncActions';

export const extraReducers = (builder) => {
  builder
    //* PRODUCTS
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

    //* FAVORITES
    .addCase(getUserFavorites.pending, (state) => {
      state.getUserFavoritesStatus = 'loading';
    })
    .addCase(getUserFavorites.fulfilled, (state, action) => {
      state.getUserFavoritesStatus = 'succeeded';
      state.favorites = action.payload;
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

    .addCase(deleteFavorite.pending, (state) => {
      state.deleteFavoriteStatus = 'loading';
    })
    .addCase(deleteFavorite.fulfilled, (state, action) => {
      state.deleteFavoriteStatus = 'succeeded';
    })
    .addCase(deleteFavorite.rejected, (state, action) => {
      state.deleteFavoriteStatus = 'failed';
      state.deleteFavoriteError = action.error.message;
    })

    //* ORDERS
    .addCase(getUserOrders.pending, (state) => {
      state.getUserOrdersStatus = 'loading';
    })
    .addCase(getUserOrders.fulfilled, (state, action) => {
      state.getUserOrdersStatus = 'succeeded';
      state.userOrders = action.payload;
    })
    .addCase(getUserOrders.rejected, (state, action) => {
      state.getUserOrdersStatus = 'failed';
      state.getUserOrdersError = action.error.message;
    })

    .addCase(getOrderById.pending, (state) => {
      state.getOrderByIdStatus = 'loading';
    })
    .addCase(getOrderById.fulfilled, (state, action) => {
      state.getOrderByIdStatus = 'succeeded';
      state.selectedOrder = action.payload;
    })
    .addCase(getOrderById.rejected, (state, action) => {
      state.getOrderByIdStatus = 'failed';
      state.getOrderByIdError = action.error.message;
    })

    .addCase(createOrder.pending, (state) => {
      state.createOrderStatus = 'loading';
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.createOrderStatus = 'succeeded';
      state.selectedOrder = action.payload;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.createOrderStatus = 'failed';
      state.createOrderError = action.error.message;
    })

    .addCase(updateOrderById.pending, (state) => {
      state.updateOrderByIdStatus = 'loading';
    })
    .addCase(updateOrderById.fulfilled, (state, action) => {
      state.updateOrderByIdStatus = 'succeeded';
      state.selectedOrder = action.payload;
    })
    .addCase(updateOrderById.rejected, (state, action) => {
      state.updateOrderByIdStatus = 'failed';
      state.updateOrderByIdError = action.error.message;
    })

    .addCase(deleteOrderById.pending, (state) => {
      state.deleteOrderByIdStatus = 'loading';
    })
    .addCase(deleteOrderById.fulfilled, (state, action) => {
      state.deleteOrderByIdStatus = 'succeeded';
    })
    .addCase(deleteOrderById.rejected, (state, action) => {
      state.deleteOrderByIdStatus = 'failed';
      state.deleteOrderByIdError = action.error.message;
    })

    //* USERS
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

    .addCase(validateLogin.pending, (state) => {
      state.validateLoginByIdStatus = 'loading';
    })
    .addCase(validateLogin.fulfilled, (state, action) => {
      state.validateLoginByIdStatus = 'succeeded';
      state.loginValidation = action.payload;
    })
    .addCase(validateLogin.rejected, (state, action) => {
      state.validateLoginByIdStatus = 'failed';
      state.validateLoginByIdError = action.error.message;
    })

    //* REVIEWS
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
    });
};