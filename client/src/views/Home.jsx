import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, getProducts, setCurrentPage } from '../redux/slice';

import { Filters, Navbar, Pagination, Products } from '../components/index';

import { Box, Spinner } from '@chakra-ui/react';

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
      dispatch(filterProducts());
    };
    fetchProducts();
    // dispatch(getCategories());
  }, [dispatch]);

  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <Box flexDirection="column">
      <Navbar width="100%" />
      {!allProducts.length ? (
        <>
          <Box display="grid" placeItems="center" height="700px">
            <Spinner size="xl" color="blue.500" />
          </Box>
        </>
      ) : (
        <>
          <Filters changePage={changePage} allProducts={allProducts} />
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
