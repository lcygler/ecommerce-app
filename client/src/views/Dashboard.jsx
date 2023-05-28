import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';

import { deleteProductById, getAdminProducts, getCategories, getGenders, getSeasons, updateProductById } from '../redux/asyncActions';
import { actions } from '../redux/slice';
import { Filters, Navbar, Pagination, ProductsTable, Charts, Sidebar } from '../components/index';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const adminProducts = useSelector((state) => state.adminProducts);
  const filteredAdminProducts = useSelector((state) => state.filteredAdminProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('products');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(getAdminProducts());
      dispatch(actions.filterAdminProducts());
      dispatch(getCategories());
      dispatch(getSeasons());
      dispatch(getGenders());
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  const totalPages = Math.ceil(filteredAdminProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAdminProducts?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(actions.setCurrentPage(pageNumber));
  };

  const handleReset = () => {
    dispatch(actions.resetFilters());
    dispatch(actions.filterAdminProducts());
    changePage(1);
  };

  const handleSidebarOption = (option) => {
    setSelectedOption(option);
  };

  const handleEditProduct = (id) => {
    navigate("/edit/"+ id)
  }

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductById(id))
  }

  const handleSuspendProduct = (productData) => {
    dispatch(updateProductById(productData))
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar handleSidebarOption={handleSidebarOption} selectedOption={selectedOption} />
        <Box flex="1" overflow="auto">
          <Box padding="4">
            <Filters changePage={changePage} allProducts={adminProducts} />
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
              {selectedOption === 'products' && <ProductsTable products={currentProducts} editProduct={handleEditProduct} deleteProduct={handleDeleteProduct} suspendProduct={handleSuspendProduct}/>}
              {selectedOption === 'charts' && <Charts />}
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
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
