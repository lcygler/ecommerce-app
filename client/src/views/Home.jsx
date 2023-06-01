import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategories, getGenders, getSeasons } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { motion } from 'framer-motion';
import { Filters, Navbar, Pagination, Products } from '../components/index';

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

function Home() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const currentPage = useSelector((state) => state.currentPage);

  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [clearSearch, setClearSearch] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getAllProducts());
      await dispatch(actions.filterProducts());
      dispatch(getCategories());
      dispatch(getSeasons());
      dispatch(getGenders());
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(actions.setCurrentPage(pageNumber));
  };

  const handleReset = () => {
    dispatch(actions.resetFilters());
    dispatch(actions.filterProducts());
    dispatch(actions.filterFavorites());
    dispatch(actions.filterAdminProducts());
    setClearSearch(true);
    changePage(1);
  };

  return (
    <Box flexDirection="column" height="100vh" overflow="auto">
      <Navbar width="100%" />
      <Filters
        changePage={changePage}
        allProducts={allProducts}
        clearSearch={clearSearch}
        setClearSearch={setClearSearch}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          easing: 'ease-in-out',
        }}
      >
        {!allProducts?.length ? (
          <>
            <Box display="grid" placeItems="center" height="60vh">
              <Spinner size="xl" color="blue.500" />
            </Box>
          </>
        ) : !loading && !filteredProducts?.length ? (
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
                <AlertDescription mt="2">Please change your filters and try again</AlertDescription>
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
            <Products currentProducts={currentProducts} />
            <Box display="flex" justifyContent="center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={changePage}
              />
            </Box>
          </>
        )}
      </motion.div>
    </Box>
  );
}

export default Home;
