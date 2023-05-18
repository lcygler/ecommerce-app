import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategories, getGenders, getSeasons } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { Filters, Navbar, Pagination, Products } from '../components/index';

import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Spinner } from '@chakra-ui/react';

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getAllProducts());
      dispatch(actions.filterProducts());
      dispatch(getCategories());
      dispatch(getSeasons());
      dispatch(getGenders());
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

  return (
    <Box flexDirection="column">
      <Navbar width="100%" />
      <Filters changePage={changePage} allProducts={allProducts} />
      {!allProducts?.length ? (
        <>
          <Box display="grid" placeItems="center" height="50vh">
            <Spinner size="xl" color="blue.500" />
          </Box>
        </>
      ) : !filteredProducts?.length ? (
        <Box display="grid" placeItems="center" width="100" mt="10">
          <Alert status="warning" textAlign="center" maxWidth="xl" mx="auto">
            <AlertIcon />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>
              There are no results that match your selected filters.
            </AlertDescription>
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

export default Home;
