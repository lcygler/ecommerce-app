import {
  Navbar,
  Filters,
  ProductsTable,
  Pagination,
} from "../components/index";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getCategories,
  getGenders,
  getSeasons,
} from "../redux/asyncActions";
import { actions } from "../redux/slice";

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

import { AddIcon } from "@chakra-ui/icons";

function Dashboard() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

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
    changePage(1);
  };
  const isAdmin = useSelector((state) => state.isAdmin);

  if (!isAdmin) {
    return <Box></Box>;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Navbar />
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Filters changePage={changePage} allProducts={allProducts} />

        <Button leftIcon={<AddIcon />} colorScheme="blue">
          Create product
        </Button>
      </Box>

      <Box display="flex" flexDirection="column">
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
              <Button onClick={handleReset} variant="solid" colorScheme="blue">
                Reset Filters
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <ProductsTable products={currentProducts} />
            <Box display="flex" justifyContent="center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={changePage}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
