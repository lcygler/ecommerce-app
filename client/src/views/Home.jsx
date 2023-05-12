import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalog } from '../redux/slices/catalogSlice';
import { setCurrentPage } from '../redux/slices/filterSlice';

import { Filters, Navbar, Pagination, Products } from '../components/index';

import { Box } from '@chakra-ui/react';

function Home() {
  const dispatch = useDispatch();
  const catalogProducts = useSelector((state) => state.catalog.catalog);
  const filteredProducts = useSelector((state) => state.filters.filteredProducts);
  const currentPage = useSelector((state) => state.filters.currentPage);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getCatalog());
  }, [dispatch]);

  // const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const totalPages = Math.ceil(catalogProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentProducts = filteredProducts?.slice(startIndex, endIndex);
  const currentProducts = catalogProducts?.slice(startIndex, endIndex);

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
