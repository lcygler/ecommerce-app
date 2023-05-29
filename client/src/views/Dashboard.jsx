import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Charts,
  Filters,
  Navbar,
  Pagination,
  ProductsTable,
  Sidebar,
  UsersTable,
} from "../components/index";
import {
  deleteProductById,
  getAdminProducts,
  getCategories,
  getChartData,
  getGenders,
  getSeasons,
  getUsers,
  updateProductById,
} from "../redux/asyncActions";
import { actions } from "../redux/slice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminProducts = useSelector((state) => state.adminProducts);
  const filteredAdminProducts = useSelector(
    (state) => state.filteredAdminProducts
  );
  const currentPage = useSelector((state) => state.currentPage);
  const allUsers = useSelector((state) => state.allUsers)

  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("products");
  const chartData = useSelector((state) => state.chartData);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getAdminProducts());
      await dispatch(actions.filterAdminProducts());
      dispatch(getCategories());
      dispatch(getSeasons());
      dispatch(getGenders());
      setLoading(false);
    };
    const fetchUsers = async () => {
      await dispatch(getUsers());
    }
    fetchProducts();
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (selectedOption === "charts" && !chartData) {
      dispatch(getChartData());
    }
  }, [dispatch, selectedOption, chartData]);

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

  const handleDeleteUser = async () => {}

  const handleSuspendUser = async () => {}

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar
          handleSidebarOption={handleSidebarOption}
          selectedOption={selectedOption}
        />
        <Box flex="1" overflow="auto">
          <Box padding="4">
            {selectedOption === "products" && (
              <Filters changePage={changePage} allProducts={adminProducts} />
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt="4"
              >
                <Button
                  onClick={handleReset}
                  variant="solid"
                  colorScheme="blue"
                >
                  Reset Filters
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {selectedOption === "products" && (
                <ProductsTable
                  products={currentProducts}
                  editProduct={handleEditProduct}
                  deleteProduct={handleDeleteProduct}
                  suspendProduct={handleSuspendProduct}
                />
              )}

              {selectedOption === "users" && (
                <UsersTable
                  users={allUsers}
                  deleteUser={handleDeleteUser}
                  suspendUser={handleSuspendUser}
                />
              )}

              {selectedOption === "charts" && chartData && (
                <Charts dataCharts={chartData} />
              )}

              {selectedOption === "products" && (
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
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
