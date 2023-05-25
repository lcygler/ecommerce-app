import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { updateUserCart } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Badge,
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
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
  stock,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const cartProducts = useSelector((state) => state.cartProducts);
  const favorites = useSelector((state) => state.favorites);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setIsFav(favorites?.some((fav) => fav.id === id));
  }, [favorites, id]);

  // useEffect(() => {
  //   if (cartProducts?.length > 0) {
  //     console.log('Product.jsx - Products:');
  //     dispatch(updateUserCart({ userId, products: cartProducts }));
  //   }
  // }, [dispatch, userId, cartProducts]);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (isFav) {
      setIsFav(false);

      dispatch(actions.removeFavorite(id));
      dispatch(actions.filterFavorites());

      toast.success('Product removed from favorites!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } else {
      setIsFav(true);

      dispatch(
        actions.addFavorite({
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
          stock,
        })
      );
      dispatch(actions.filterFavorites());

      toast.success('Product added to favorites!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const productExists = cartProducts?.find((product) => product.id === id);

    if (productExists) {
      toast.error('Product already exists in cart!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    } else {
      const newProduct = {
        id,
        name,
        price,
        Categories,
        description,
        gender,
        size,
        image,
        discounts,
        stock,
        quantity: 1,
      };

      dispatch(actions.addProduct(newProduct));

      const updatedCartProducts = [...cartProducts, newProduct];
      dispatch(updateUserCart({ userId, products: updatedCartProducts }));

      toast.success('Product added to cart!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
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
                <Fade in={!loading}>
                  <IconButton
                    variant="ghost"
                    colorScheme="blue"
                    icon={<AiFillHeart style={{ fontSize: '18px' }} />}
                    size="md"
                    onClick={handleFavorite}
                  />
                </Fade>
              ) : (
                <IconButton
                  variant="ghost"
                  colorScheme="blue"
                  icon={<AiOutlineHeart style={{ fontSize: '18px' }} />}
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
