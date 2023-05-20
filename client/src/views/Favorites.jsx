import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getGenders, getSeasons } from '../redux/asyncActions';
import { actions } from '../redux/slice';

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
  const favorites = useSelector((state) => state.favorites);
  const filteredFavorites = useSelector((state) => state.filteredFavorites);
  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(actions.filterFavorites());
    dispatch(getCategories());
    dispatch(getSeasons());
    dispatch(getGenders());
  }, [dispatch]);

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
    changePage(1);
  };

  return (
    <Box flexDirection="column" height="100vh" overflow="auto">
      <Navbar width="100%" />
      <Filters changePage={changePage} allProducts={favorites} />
      {!favorites?.length ? (
        <Box display="grid" placeItems="center" width="auto" height="60vh">
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
              <Box display="flex" alignItems="center" justifyContent="center" mt="4">
                <Button onClick={handleReset} variant="outline" colorScheme="yellow">
                  Reset filters
                </Button>
              </Box>
            </Flex>
          </Alert>
        </Box>
      ) : (
        <>
          <Products currentProducts={currentProducts} />
          <Box display="flex" justifyContent="center">
            <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Favorites;
