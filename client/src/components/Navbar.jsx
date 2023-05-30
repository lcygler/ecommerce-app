import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { actions } from '../redux/slice';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaBars,
  FaHeart,
  FaList,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTags,
  FaTimes,
  FaUser,
  FaUserCog,
} from 'react-icons/fa';
import logo from '../assets/icons/logo_modern.png';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const isAdmin = useSelector((state) => state.isAdmin);
  const cartProducts = useSelector((state) => state.cartProducts);

  const handleLogout = () => {
    dispatch(actions.logoutUser());
  };

  return (
    <Box bg="white" h="70px" px={4} py={2} pt="15px" position="sticky" top={0} zIndex={1}>
      <Flex alignItems="center">
        <Link as={RouterLink} to="/" display="flex" alignItems="center">
          <Image src={logo} alt="Logo" w={150} h={10} mr={2} />
        </Link>
        <Spacer />

        <Box display={{ base: 'none', md: 'flex' }}>
          <Link as={RouterLink} to="/home" mr={4}>
            <Button
              leftIcon={<FaTags />}
              colorScheme="blue"
              variant="ghost"
              backgroundColor={location.pathname === '/home' ? 'blue.50' : 'white'}
            >
              Catalog
            </Button>
          </Link>

          <Link as={RouterLink} to="/favorites" mr={4}>
            <Button
              leftIcon={<FaHeart />}
              colorScheme="blue"
              variant="ghost"
              backgroundColor={location.pathname === '/favorites' ? 'blue.50' : 'white'}
            >
              Favorites
            </Button>
          </Link>

          <Link as={RouterLink} to="/cart" mr={4}>
            <Button
              leftIcon={<FaShoppingCart />}
              colorScheme="blue"
              variant="ghost"
              backgroundColor={location.pathname === '/cart' ? 'blue.50' : 'white'}
            >
              Cart {cartProducts?.length ? `(${cartProducts.length})` : ''}
            </Button>
          </Link>

          <Link as={RouterLink} to="/purchases" mr={4}>
            <Button
              leftIcon={<FaList />}
              colorScheme="blue"
              variant="ghost"
              backgroundColor={location.pathname === '/purchases' ? 'blue.50' : 'white'}
            >
              Purchases
            </Button>
          </Link>

          {isAuthenticated && isAdmin && (
            <Link as={RouterLink} to="/dashboard" mr={4}>
              <Button
                leftIcon={<FaUserCog />}
                colorScheme="blue"
                variant="ghost"
                backgroundColor={location.pathname === '/dashboard' ? 'blue.50' : 'white'}
              >
                Dashboard
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Link as={RouterLink} to="/profile" mr={4}>
              <Button
                leftIcon={<FaUser />}
                colorScheme="blue"
                variant="ghost"
                backgroundColor={location.pathname === '/profile' ? 'blue.50' : 'white'}
              >
                Profile
              </Button>
            </Link>
          )}

          {!isAuthenticated ? (
            <Link as={RouterLink} to="/login" mr={4}>
              <Button
                leftIcon={<FaSignInAlt />}
                colorScheme="blue"
                variant="ghost"
                backgroundColor={location.pathname === '/login' ? 'blue.50' : 'white'}
              >
                Login
              </Button>
            </Link>
          ) : (
            <>
              {/* <Link as={RouterLink} to="/profile" w="full" mb={4}>
                <Button
                  w="full"
                  leftIcon={<FaUser />}
                  colorScheme="blue"
                  variant="ghost"
                  backgroundColor={location.pathname === '/profile' ? 'blue.50' : 'white'}
                >
                  Profile
                </Button>
              </Link> */}

              <Link as={RouterLink} to="/" mr={4}>
                <Button
                  leftIcon={<FaSignOutAlt />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            </>
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
                <Button
                  w="full"
                  leftIcon={<FaTags />}
                  colorScheme="blue"
                  variant="ghost"
                  backgroundColor={location.pathname === '/home' ? 'blue.50' : 'white'}
                >
                  Catalog
                </Button>
              </Link>

              <Link as={RouterLink} to="/favorites" w="full" mb={4}>
                <Button
                  w="full"
                  leftIcon={<FaHeart />}
                  colorScheme="blue"
                  variant="ghost"
                  backgroundColor={location.pathname === '/favorites' ? 'blue.50' : 'white'}
                >
                  Favorites
                </Button>
              </Link>

              <Link as={RouterLink} to="/cart" w="full" mb={4}>
                <Button
                  w="full"
                  leftIcon={<FaShoppingCart />}
                  colorScheme="blue"
                  variant="ghost"
                  backgroundColor={location.pathname === '/cart' ? 'blue.50' : 'white'}
                >
                  Cart {cartProducts?.length ? `(${cartProducts.length})` : ''}
                </Button>
              </Link>

              <Link as={RouterLink} to="/purchases" w="full" mb={4}>
                <Button
                  w="full"
                  leftIcon={<FaList />}
                  colorScheme="blue"
                  variant="ghost"
                  backgroundColor={location.pathname === '/purchases' ? 'blue.50' : 'white'}
                >
                  Purchases
                </Button>
              </Link>

              {isAuthenticated && isAdmin && (
                <Link as={RouterLink} to="/dashboard" w="full" mb={4}>
                  <Button
                    w="full"
                    leftIcon={<FaUserCog />}
                    colorScheme="blue"
                    variant="ghost"
                    backgroundColor={location.pathname === '/dashboard' ? 'blue.50' : 'white'}
                  >
                    Dashboard
                  </Button>
                </Link>
              )}

              {isAuthenticated && (
                <Link as={RouterLink} to="/profile" w="full" mb={4}>
                  <Button
                    w="full"
                    leftIcon={<FaUser />}
                    colorScheme="blue"
                    variant="ghost"
                    backgroundColor={location.pathname === '/profile' ? 'blue.50' : 'white'}
                  >
                    Profile
                  </Button>
                </Link>
              )}

              {!isAuthenticated ? (
                <Link as={RouterLink} to="/login" w="full" mb={4}>
                  <Button
                    w="full"
                    leftIcon={<FaSignInAlt />}
                    colorScheme="blue"
                    variant="ghost"
                    backgroundColor={location.pathname === '/login' ? 'blue.50' : 'white'}
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <>
                  {/* <Link as={RouterLink} to="/profile" w="full" mb={4}>
                    <Button
                      w="full"
                      leftIcon={<FaUser />}
                      colorScheme="blue"
                      variant="ghost"
                      backgroundColor={location.pathname === '/profile' ? 'blue.50' : 'white'}
                    >
                      Profile
                    </Button>
                  </Link> */}

                  <Link as={RouterLink} to="/" w="full" mb={4}>
                    <Button
                      w="full"
                      leftIcon={<FaSignOutAlt />}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Link>
                </>
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
