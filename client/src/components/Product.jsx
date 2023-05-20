import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { addCartItem, addFavorite, deleteFavorite, getProductById } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Badge, Box, Button, Flex, Heading, IconButton, Image, Link, Text } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Product({
  id,
  name,
  price,
  Categories,
  description,
  gender,
  Seasons,
  size,
  image,
  discounts,
}) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const { user } = useSelector((state) => state.selectedUser);
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(id));
    } else {
      setIsFav(true);
      dispatch(
        addFavorite({
          id,
          name,
          price,
          Categories,
          description,
          gender,
          Seasons,
          size,
          image,
          discounts,
          addFavorite,
          deleteFavorite,
        })
      );
    }
  };

  // const handleAddToCart = (e) => {
  //   e.preventDefault();
  //   dispatch(getProductById(id)).then(() => {
  //     if (selectedProduct && Object.keys(selectedProduct).length !== 0) {
  //       dispatch(actions.addProduct({ ...selectedProduct, quantity: 1 }));
  //     }
  //   });
  // };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      actions.addProduct({
        id,
        name,
        price,
        Categories,
        description,
        gender,
        size,
        image,
        discounts,
        quantity: 1,
      })
    );

    toast.success('Product added to cart!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <Link
      as={RouterLink}
      to={`/home/${id}`}
      _hover={{
        textDecoration: 'none',
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w="350px"
        h="500px"
        position="relative"
      >
        <Box h="300px" overflow="hidden" position="relative">
          {discounts > 0 && (
            <Badge colorScheme="green" position="absolute" top="2" left="2" m="2" fontSize="sm">
              Sale
            </Badge>
          )}

          {isAuthenticated && (
            <Box position="absolute" top="0" right="0" m="2">
              {isFav ? (
                <IconButton
                  variant="ghost"
                  colorScheme="blue"
                  icon={<AiFillHeart />}
                  size="md"
                  onClick={handleFavorite}
                />
              ) : (
                <IconButton
                  variant="ghost"
                  colorScheme="blue"
                  icon={<AiOutlineHeart />}
                  size="md"
                  onClick={handleFavorite}
                />
              )}
            </Box>
          )}

          <Image src={image} alt={name} h="100%" w="100%" objectFit="contain" />
        </Box>

        <Box p="6">
          <Heading
            as="h2"
            size="md"
            mb="2"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {name}
          </Heading>

          {/* <Text fontSize="md">{description}</Text> */}

          <Box d="flex" alignItems="baseline">
            <Flex alignItems="baseline">
              <Text fontWeight="bold" fontSize="2xl" mt="2" mr="2">
                ${discounts === 0 ? price.toFixed(2) : (price * (1 - discounts)).toFixed(2)}
              </Text>

              {discounts > 0 && (
                <Text fontWeight="bold" color="green.400">
                  {discounts * 100}% OFF
                </Text>
              )}
            </Flex>

            {discounts > 0 && (
              <Text fontWeight="bold" fontSize="md" color="gray.500" textDecoration="line-through">
                ${price.toFixed(2)}
              </Text>
            )}
          </Box>

          <Box position="absolute" bottom="20px" left="0" right="0" textAlign="center">
            <Button colorScheme="blue" mt="4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default Product;
