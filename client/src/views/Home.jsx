import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slices/filterSlice';
import { getProducts } from '../redux/slices/productSlice';

import { Filters, Navbar, Pagination, Products } from '../components/index';

import { Box } from '@chakra-ui/react';

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const currentPage = useSelector((state) => state.filters.currentPage);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const totalPages = Math.ceil(allProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentProducts = filteredProducts?.slice(startIndex, endIndex);
  const currentProducts = allProducts?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <Box flexDirection="column">
      <Navbar width="100%" />
      <Filters changePage={changePage} />
      <Products currentProducts={currentProducts} />
      <Box display="flex" justifyContent="center">
        <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
      </Box>
    </Box>
  );
}

export default Home;
