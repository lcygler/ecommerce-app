import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  deleteProductById,
  deleteReviewById,
  deleteUserById,
  getAdminProducts,
  getAllPurchases,
  getAllReviews,
  getCategories,
  getChartData,
  getGenders,
  getSeasons,
  getUsers,
  updateProductById,
  updateReviewById,
  updateUserById,
} from '../redux/asyncActions';
import { actions } from '../redux/slice';

import {
  Charts,
  Filters,
  Navbar,
  Pagination,
  ProductsTable,
  ReviewsTable,
  Sales,
  Sidebar,
  UsersTable,
} from '../components/index';

import { AddIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Spinner,
} from '@chakra-ui/react';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminProducts = useSelector((state) => state.adminProducts);
  const filteredAdminProducts = useSelector((state) => state.filteredAdminProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const allUsers = useSelector((state) => state.allUsers);
  const filteredUsers = useSelector((state) => state.filteredUsers);
  const chartData = useSelector((state) => state.chartData);
  const allPurchases = useSelector((state) => state.allPurchases);
  const selectedPurchase = useSelector((state) => state.selectedPurchase);
  const allReviews = useSelector((state) => state.allReviews);

  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('products');
  const [clearSearch, setClearSearch] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getAdminProducts());
      await dispatch(actions.filterAdminProducts());
      dispatch(getCategories());
      dispatch(getSeasons());
      dispatch(getGenders());
      dispatch(getAllPurchases());
      dispatch(getAllReviews());
      dispatch(getChartData());
      setLoading(false);
    };
    const fetchUsers = async () => {
      await dispatch(getUsers());
      await dispatch(actions.filterUsers());
    };
    fetchProducts();
    fetchUsers();
  }, [dispatch, selectedPurchase]);

  useEffect(() => {
    if (selectedOption === 'charts') {
      dispatch(getChartData());
    }
  }, [dispatch, selectedOption]);

  const totalPages = Math.ceil(filteredAdminProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAdminProducts?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(actions.setCurrentPage(pageNumber));
  };

  const handleReset = async () => {
    await dispatch(actions.resetFilters());
    dispatch(actions.filterAdminProducts());
    setClearSearch(true);
    changePage(1);
  };

  const handleSidebarOption = (option) => {
    setSelectedOption(option);
  };

  const handleEditProduct = (productId) => {
    navigate(`/dashboard/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    await dispatch(deleteProductById(productId));
    await dispatch(getAdminProducts());
    await dispatch(actions.filterAdminProducts());
  };

  const handleSuspendProduct = async ({ productId, updatedProduct }) => {
    await dispatch(updateProductById({ productId, updatedProduct }));
    await dispatch(getAdminProducts());
    await dispatch(actions.filterAdminProducts());
  };

  const handleDeleteUser = async (userId) => {
    await dispatch(deleteUserById(userId));
    await dispatch(getUsers());
    await dispatch(actions.filterUsers());
  };

  const handleSuspendUser = async ({ userId, updatedUser }) => {
    await dispatch(updateUserById({ userId, updatedUser }));
    await dispatch(getUsers());
    await dispatch(actions.filterUsers());
  };

  const handleSuspendReview = async ({ reviewId, updatedReview }) => {
    await dispatch(updateReviewById({ reviewId, updatedReview }));
    await dispatch(getAllReviews());
  };

  const handleDeleteReview = async (reviewId) => {
    await dispatch(deleteReviewById(reviewId));
    await dispatch(getAllReviews());
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Flex /*flex="1"*/>
        <Sidebar handleSidebarOption={handleSidebarOption} selectedOption={selectedOption} />
        <Box /*flex="1"*/ width="100%" overflow="auto">
          <Box padding="4">
            {selectedOption === 'products' && (
              <Filters
                changePage={changePage}
                allProducts={adminProducts}
                clearSearch={clearSearch}
                setClearSearch={setClearSearch}
              />
            )}
          </Box>

          {!adminProducts?.length ? (
            <>
              <Box display="grid" placeItems="center" height="60vh">
                <Spinner size="xl" color="blue.500" />
              </Box>
            </>
          ) : !loading && !filteredAdminProducts?.length ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="auto"
              height="60vh"
            >
              <Alert
                status="warning"
                textAlign="center"
                maxWidth="md"
                mx="auto"
                display="flex"
                justifyContent="center"
              >
                <Flex flexDirection="column" alignItems="center">
                  <Flex>
                    <AlertIcon />
                    <AlertTitle>Oops! No results found</AlertTitle>
                  </Flex>
                  <AlertDescription mt="2">
                    Please change your filters and try again
                  </AlertDescription>
                </Flex>
              </Alert>
              <Box display="flex" alignItems="center" justifyContent="center" mt="4">
                <Button onClick={handleReset} variant="solid" colorScheme="blue">
                  Reset Filters
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {selectedOption === 'products' && (
                <ProductsTable
                  products={currentProducts}
                  editProduct={handleEditProduct}
                  deleteProduct={handleDeleteProduct}
                  suspendProduct={handleSuspendProduct}
                />
              )}

              {selectedOption === 'users' && (
                <UsersTable
                  users={allUsers}
                  filteredUsers={filteredUsers}
                  deleteUser={handleDeleteUser}
                  suspendUser={handleSuspendUser}
                />
              )}

              {selectedOption === 'charts' && <Charts dataCharts={chartData} />}
              {selectedOption === 'sales' && <Sales salesData={allPurchases} />}

              {selectedOption === 'reviews' && (
                <ReviewsTable
                  allReviews={allReviews}
                  suspendReview={handleSuspendReview}
                  deleteReview={handleDeleteReview}
                />
              )}

              {selectedOption === 'products' && (
                <Box display="flex" justifyContent="center" mt="4">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    changePage={changePage}
                  />
                </Box>
              )}
            </>
          )}

          {selectedOption === 'products' && (
            <Box display="flex" alignItems="center" justifyContent="center" ml="4">
              <Button
                colorScheme="blue"
                borderRadius="full"
                position="fixed"
                size="2xl"
                boxSize="60px"
                boxShadow="lg"
                zIndex="999"
                p={4}
                bottom="6"
                right="6"
                onClick={() => navigate('/dashboard/create')}
              >
                <AddIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
