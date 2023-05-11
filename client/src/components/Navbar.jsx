import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaBars, FaHeart, FaList, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" px={4} py={2}>
      <Flex alignItems="center">
        <Link href="/" color="white" fontSize="xl" fontWeight="bold">
          Khaki Store
        </Link>
        <Spacer />

        <Box display={{ base: 'none', md: 'flex' }}>
          <Link href="/cart" mr={4}>
            <Button leftIcon={<FaShoppingCart />} colorScheme="teal" variant="outline">
              Cart
            </Button>
          </Link>

          <Link href="/favorites" mr={4}>
            <Button leftIcon={<FaHeart />} colorScheme="teal" variant="outline">
              Favorites
            </Button>
          </Link>

          <Link href="/purchases" mr={4}>
            <Button leftIcon={<FaList />} colorScheme="teal" variant="outline">
              Purchases
            </Button>
          </Link>

          <Menu>
            <MenuButton as={Button} leftIcon={<FaUser />} colorScheme="teal" variant="outline">
              Login
            </MenuButton>

            <MenuList>
              <Link href="/login">
                <MenuItem>Login</MenuItem>
              </Link>

              <Link href="/register">
                <MenuItem>Register</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>

        <Box display={{ base: 'flex', md: 'none' }}>
          <IconButton icon={<FaBars />} variant="outline" onClick={onOpen} colorScheme="teal" />
          <Box
            pos="absolute"
            top="0"
            right="0"
            w={isOpen ? 'full' : '0'}
            bg="gray.800"
            transition="width 0.3s ease"
            overflow="hidden"
          >
            <Flex direction="column" alignItems="center" p={4}>
              <Link href="/cart" w="full" mb={4}>
                <Button w="full" leftIcon={<FaShoppingCart />} colorScheme="teal" variant="outline">
                  Cart
                </Button>
              </Link>

              <Link href="/favorites" w="full" mb={4}>
                <Button w="full" leftIcon={<FaHeart />} colorScheme="teal" variant="outline">
                  Favorites
                </Button>
              </Link>

              <Link href="/purchases" w="full" mb={4}>
                <Button w="full" leftIcon={<FaList />} colorScheme="teal" variant="outline">
                  Purchases
                </Button>
              </Link>

              <Menu>
                <MenuButton
                  as={Button}
                  w="full"
                  colorScheme="teal"
                  variant="outline"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" justifyContent="center">
                    <FaUser />
                    <Text ml={2}>Login</Text>
                  </Box>
                </MenuButton>

                <MenuList>
                  <Link href="/login">
                    <MenuItem>Login</MenuItem>
                  </Link>

                  <Link href="/register">
                    <MenuItem>Register</MenuItem>
                  </Link>
                </MenuList>
              </Menu>

              {isOpen && (
                <IconButton
                  icon={<FaTimes />}
                  variant="outline"
                  onClick={onClose}
                  colorScheme="teal"
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
