import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { actions } from '../redux/slice';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBars, FaHeart, FaHome, FaList, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import logo from '../assets/icons/logo.png';

function Navbar() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleLogout = () => {
    dispatch(actions.logoutUser());
  };

  return (
    <Box bg="transparent" px={4} py={2} pt="15px">
      <Flex alignItems="center">
        <Link as={RouterLink} to="/" display="flex" alignItems="center">
          <Image src={logo} alt="Logo" w={100} h={10} mr={2} />
        </Link>
        <Spacer />

        <Box display={{ base: 'none', md: 'flex' }}>
          <Link as={RouterLink} to="/home" mr={4}>
            <Button leftIcon={<FaHome />} colorScheme="blue" variant="outline">
              Home
            </Button>
          </Link>

          <Link as={RouterLink} to="/cart" mr={4}>
            <Button leftIcon={<FaShoppingCart />} colorScheme="blue" variant="outline">
              Cart
            </Button>
          </Link>

          <Link as={RouterLink} to="/favorites" mr={4}>
            <Button leftIcon={<FaHeart />} colorScheme="blue" variant="outline">
              Favorites
            </Button>
          </Link>

          <Link as={RouterLink} to="/purchases" mr={4}>
            <Button leftIcon={<FaList />} colorScheme="blue" variant="outline">
              Purchases
            </Button>
          </Link>

          {!isAuthenticated ? (
            <Menu>
              <MenuButton as={Button} leftIcon={<FaUser />} colorScheme="blue" variant="outline">
                Login
              </MenuButton>

              <MenuList>
                <Link as={RouterLink} to="/login">
                  <MenuItem>Login</MenuItem>
                </Link>

                <Link as={RouterLink} to="/register">
                  <MenuItem>Register</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          ) : (
            <Link as={RouterLink} to="/" mr={4}>
              <Button
                leftIcon={<FaUser />}
                colorScheme="blue"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Link>
          )}
        </Box>

        <Box display={{ base: 'flex', md: 'none' }}>
          <IconButton icon={<FaBars />} variant="outline" onClick={onOpen} colorScheme="blue" />
          <Box
            pos="absolute"
            top="0"
            right="0"
            w={isOpen ? 'full' : '0'}
            bg="white"
            transition="width 0.3s ease"
            overflow="hidden"
            zIndex="1"
          >
            <Flex direction="column" alignItems="center" p={4}>
              <Link as={RouterLink} to="/home" w="full" mb={4}>
                <Button w="full" leftIcon={<FaHome />} colorScheme="blue" variant="outline">
                  Home
                </Button>
              </Link>

              <Link as={RouterLink} to="/cart" w="full" mb={4}>
                <Button w="full" leftIcon={<FaShoppingCart />} colorScheme="blue" variant="outline">
                  Cart
                </Button>
              </Link>

              <Link as={RouterLink} to="/favorites" w="full" mb={4}>
                <Button w="full" leftIcon={<FaHeart />} colorScheme="blue" variant="outline">
                  Favorites
                </Button>
              </Link>

              <Link as={RouterLink} to="/purchases" w="full" mb={4}>
                <Button w="full" leftIcon={<FaList />} colorScheme="blue" variant="outline">
                  Purchases
                </Button>
              </Link>

              {!isAuthenticated ? (
                <Menu>
                  <MenuButton as={Button} w="full" colorScheme="blue" variant="outline">
                    <Box display="flex" justifyContent="center">
                      <FaUser />
                      <Text ml={2}>Login</Text>
                    </Box>
                  </MenuButton>

                  <MenuList>
                    <Link as={RouterLink} to="/login">
                      <MenuItem>Login</MenuItem>
                    </Link>

                    <Link as={RouterLink} to="/register">
                      <MenuItem>Register</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              ) : (
                <Link as={RouterLink} to="/" w="full" mb={4}>
                  <Button
                    w="full"
                    leftIcon={<FaUser />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Link>
              )}

              {isOpen && (
                <IconButton
                  icon={<FaTimes />}
                  variant="outline"
                  onClick={onClose}
                  colorScheme="blue"
                  mt={4}
                  isRound
                  w="1"
                />
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
