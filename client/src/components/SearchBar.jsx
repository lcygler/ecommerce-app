import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions } from '../redux/slice';

import { Flex, Input /* Button */ } from '@chakra-ui/react';

function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (location.pathname === '/home') {
      dispatch(actions.filterProducts(searchTerm));
    } else if (location.pathname === '/favorites') {
      dispatch(actions.filterFavorites(searchTerm));
    } else if (location.pathname === '/dashboard') {
      dispatch(actions.filterAdminProducts(searchTerm));
    }
  }, [dispatch, searchTerm, location]);

  // const handleSearch = () => {
  //   dispatch(actions.filterProducts(searchTerm));
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Flex align="center" justify="center" /* mb={4} w="100%" */>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        // onKeyPress={handleKeyPress}
        // mr={2}
      />

      {/* <Button onClick={handleSearch} colorScheme="blue">
        Search
      </Button> */}
    </Flex>
  );
}

export default SearchBar;
