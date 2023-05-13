import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProducts,
  resetFilters,
  updateCategoryFilter,
  updateDiscountFilter,
  updateGenderFilter,
  updateOrder,
  updateSeasonFilter,
} from '../redux/slice';

import { Box, Button, Flex, Select } from '@chakra-ui/react';

function Filters({ changePage, allProducts }) {
  const dispatch = useDispatch();

  // const categories = useSelector((state) => state.categories);
  const discount = useSelector((state) => state.discount);
  const gender = useSelector((state) => state.gender);
  const season = useSelector((state) => state.season);
  const category = useSelector((state) => state.category);
  const order = useSelector((state) => state.order);

  const categorySelect = useRef(null);
  const discountSelect = useRef(null);
  const seasonSelect = useRef(null);
  const genderSelect = useRef(null);
  const orderSelect = useRef(null);

  const categories = allProducts
    .reduce((acc, product) => {
      product.categories.forEach((category) => {
        const index = acc.findIndex((c) => c.id === category.id && c.name === category.name);
        if (index === -1) {
          acc.push({ id: category.id, name: category.name });
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

  const seasons = allProducts
    .reduce((acc, product) => {
      product.seasons.forEach((season) => {
        const index = acc.findIndex((s) => s.id === season.id && s.name === season.name);
        if (index === -1) {
          acc.push({ id: season.id, name: season.name });
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

  const genders = allProducts
    .reduce((acc, product) => {
      if (!acc.includes(product.gender)) {
        acc.push(product.gender);
      }
      return acc;
    }, [])
    .sort((a, b) => a.localeCompare(b));

  const discounts = allProducts
    .reduce((acc, product) => {
      if (product.discount > 0 && !acc.includes(product.discount)) {
        acc.push(product.discount);
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
  }, [category, discount, season, gender, order]);

  const handleFilters = (e) => {
    const { name: selectName, value: selectValue } = e.target;
    if (selectName === 'categorySelect') {
      dispatch(updateCategoryFilter(selectValue));
    } else if (selectName === 'discountSelect') {
      dispatch(updateDiscountFilter(selectValue));
    } else if (selectName === 'seasonSelect') {
      dispatch(updateSeasonFilter(selectValue));
    } else if (selectName === 'genderSelect') {
      dispatch(updateGenderFilter(selectValue));
    } else if (selectName === 'orderSelect') {
      dispatch(updateOrder(selectValue));
    }
    dispatch(filterProducts());
    changePage(1);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(filterProducts());
    changePage(1);
  };

  return (
    <Flex alignItems="center" justifyContent="center" mt="8">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Select
          defaultValue="All"
          name="categorySelect"
          ref={categorySelect}
          onChange={handleFilters}
        >
          <option value="All">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4">
        <Select defaultValue="All" name="genderSelect" ref={genderSelect} onChange={handleFilters}>
          <option value="All">All Genders</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4">
        <Select defaultValue="All" name="seasonSelect" ref={seasonSelect} onChange={handleFilters}>
          <option value="All">All Seasons</option>
          {seasons.map((season, index) => (
            <option key={index} value={season.name}>
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
          {discounts.map((discount) => (
            <option key={discount} value={discount}>
              {`${discount * 100}% OFF`}
            </option>
          ))}
        </Select>
      </Box>

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
          Reset
        </Button>
      </Box>
    </Flex>
  );
}

export default Filters;
