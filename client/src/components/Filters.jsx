import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation /*useNavigate*/ } from 'react-router-dom';
import { removeUserFavorites } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { SearchBar } from '../components/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { AddIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Select,
  useDisclosure,
} from '@chakra-ui/react';

function Filters({ changePage, allProducts, clearSearch, setClearSearch }) {
  const stocksInProducts = [...new Set(allProducts.map((product) => product.stock))].sort(function(
    a,
    b
  ) {
    return a - b;
  });

  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = useSelector((state) => state.userId);
  const categories = useSelector((state) => state.categories);
  const seasons = useSelector((state) => state.seasons);
  const genders = useSelector((state) => state.genders);

  const category = useSelector((state) => state.category);
  const gender = useSelector((state) => state.gender);
  const season = useSelector((state) => state.season);
  const discount = useSelector((state) => state.discount);
  const order = useSelector((state) => state.order);
  const stock = useSelector((state) => state.stock);

  const categorySelect = useRef(null);
  const discountSelect = useRef(null);
  const seasonSelect = useRef(null);
  const genderSelect = useRef(null);
  const orderSelect = useRef(null);
  const stockSelect = useRef(null);

  const discounts = allProducts
    .reduce((acc, product) => {
      if (product.discounts > 0 && !acc.includes(product.discounts)) {
        acc.push(product.discounts);
      }
      return acc;
    }, [])
    .sort((a, b) => b - a);

  useEffect(() => {
    categorySelect.current.value = category;
    discountSelect.current.value = discount;
    seasonSelect.current.value = season;
    genderSelect.current.value = gender;
    orderSelect.current.value = order;

    if (stockSelect.current) {
      stockSelect.current.value = stock;
    }
  }, [category, discount, season, gender, order, stock]);

  // Sino probar con este useEffect para el stock
  // useEffect(() => {
  //   if (stockSelect.current) {
  //     stockSelect.current.value = stock;
  //   }
  // }, [stock, stockSelect]);

  useEffect(() => {
    if (clearSearch) {
      setSearchTerm('');
      setClearSearch(false);
    }
  }, [clearSearch, setClearSearch]);

  const handleFilters = (e) => {
    const { name: selectName, value: selectValue } = e.target;
    if (selectName === 'categorySelect') {
      dispatch(actions.updateCategoryFilter(selectValue));
    } else if (selectName === 'discountSelect') {
      dispatch(actions.updateDiscountFilter(selectValue));
    } else if (selectName === 'seasonSelect') {
      dispatch(actions.updateSeasonFilter(selectValue));
    } else if (selectName === 'genderSelect') {
      dispatch(actions.updateGenderFilter(selectValue));
    } else if (selectName === 'orderSelect') {
      dispatch(actions.updateOrder(selectValue));
    } else if (selectName === 'stockSelect') {
      dispatch(actions.updateStockFilter(selectValue));
    }
    dispatch(actions.filterProducts());
    dispatch(actions.filterFavorites());
    dispatch(actions.filterAdminProducts());
    changePage(1);
  };

  const handleReset = () => {
    dispatch(actions.resetFilters());
    dispatch(actions.filterProducts());
    dispatch(actions.filterFavorites());
    dispatch(actions.filterAdminProducts());
    setSearchTerm('');
    changePage(1);
  };

  const handleClearFavorites = () => {
    if (allProducts.length !== 0) {
      dispatch(actions.clearFavorites());
      dispatch(removeUserFavorites(userId));
      toast.success('All favorites were cleared!');
    }
  };

  // const handleClearFavorites = () => {
  //   if (allProducts.length !== 0) {
  //     const confirmed = window.confirm('Are you sure you want to clear all favorites?');
  //     if (confirmed) {
  //       dispatch(actions.clearFavorites());
  //       dispatch(removeUserFavorites(userId));
  //       toast.success('All favorites were cleared!');
  //     }
  //   }
  // };

  return (
    <Flex
      bg="white"
      h="70px"
      alignItems="center"
      justifyContent="center"
      position="sticky"
      top="70px"
      zIndex={1}
    >
      <Flex flexDirection="row" alignItems="center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Flex>
          <Box display="flex" alignItems="center" ml="4">
            <Select
              defaultValue="All"
              name="categorySelect"
              ref={categorySelect}
              onChange={handleFilters}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" ml="4">
            <Select
              defaultValue="All"
              name="genderSelect"
              ref={genderSelect}
              onChange={handleFilters}
            >
              <option value="All">All Genders</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.name}>
                  {gender.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" ml="4">
            <Select
              defaultValue="All"
              name="seasonSelect"
              ref={seasonSelect}
              onChange={handleFilters}
            >
              <option value="All">All Seasons</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.name}>
                  {season.name}
                </option>
              ))}
            </Select>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" ml="4">
            <Select
              defaultValue="All"
              name="discountSelect"
              ref={discountSelect}
              onChange={handleFilters}
            >
              <option value="All">All Offers</option>
              <option value="Discounts">Discounts</option>
              {discounts.map((discount) => (
                <option key={discount} value={discount}>
                  {`${discount * 100}% OFF`}
                </option>
              ))}
            </Select>
          </Box>

          {location.pathname === '/dashboard' && (
            <Box display="flex" alignItems="center" justifyContent="center" ml="4">
              <Select
                defaultValue="All"
                name="stockSelect"
                ref={stockSelect}
                onChange={handleFilters}
              >
                <option value="All">All Stocks</option>
                {stocksInProducts.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          <Box display="flex" alignItems="center" justifyContent="center" ml="4">
            <Select
              defaultValue="Default"
              name="orderSelect"
              ref={orderSelect}
              onChange={handleFilters}
            >
              <option value="Default">Sort By</option>
              <option value="Price (Asc)">Price (Asc)</option>
              <option value="Price (Desc)">Price (Desc)</option>
            </Select>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" ml="4">
            <Button onClick={handleReset} variant="outline">
              Reset Filters
            </Button>
          </Box>

          {location.pathname === '/favorites' && allProducts.length !== 0 && (
            <Box display="flex" alignItems="center" justifyContent="center" ml="4">
              {/* <Button colorScheme="red" variant="ghost" onClick={handleClearFavorites}> */}
              <Button colorScheme="red" variant="ghost" onClick={onOpen}>
                Clear Favorites
              </Button>
            </Box>
          )}

          {/* {location.pathname === '/dashboard' && (
            <Box display="flex" alignItems="center" justifyContent="center" ml="4">
              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                position="absolute"
                right="100px"
                onClick={() => navigate('/dashboard/create')}
              >
                Create Product
              </Button>
            </Box>
          )} */}
        </Flex>
      </Flex>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay backgroundColor="transparent">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clear Favorites
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleClearFavorites();
                  onClose();
                }}
                ml={3}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default Filters;
