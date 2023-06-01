import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories, getGenders, getSeasons, getUserFavorites } from '../redux/asyncActions';
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
} from '@chakra-ui/react';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId);
  const favorites = useSelector((state) => state.favorites);
  const filteredFavorites = useSelector((state) => state.filteredFavorites);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const currentPage = useSelector((state) => state.currentPage);

  const [itemsPerPage] = useState(10);
  const [clearSearch, setClearSearch] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      await dispatch(getUserFavorites(userId));
      dispatch(actions.filterFavorites());
    };
    fetchFavorites();
    dispatch(getCategories());
    dispatch(getSeasons());
    dispatch(getGenders());
  }, [dispatch, userId]);

  const totalPages = Math.ceil(filteredFavorites?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredFavorites?.slice(startIndex, endIndex);

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
        allProducts={favorites}
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
        {!isAuthenticated ? (
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
                <AlertDescription mt="2">Please login to add some favorites</AlertDescription>
              </Flex>
            </Alert>
            <Box display="flex" alignItems="center" justifyContent="center" mt="4">
              <Button onClick={() => navigate('/login')} variant="solid" colorScheme="blue">
                Login Now
              </Button>
            </Box>
          </Box>
        ) : !favorites?.length ? (
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
                <AlertDescription mt="2">Please add some favorites and try again</AlertDescription>
              </Flex>
            </Alert>
            <Box display="flex" alignItems="center" justifyContent="center" mt="4">
              <Button onClick={() => navigate('/home')} variant="solid" colorScheme="blue">
                Browse Products
              </Button>
            </Box>
          </Box>
        ) : !filteredFavorites?.length ? (
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

export default Favorites;
