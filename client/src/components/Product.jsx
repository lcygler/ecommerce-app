import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { addFavorite, deleteFavorite } from '../redux/asyncActions';

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
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="sm" height="auto">
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
                  aria-label="add to favorites"
                  variant="ghost"
                  colorScheme="blue"
                  icon={<AiFillHeart />}
                  size="md"
                  onClick={handleFavorite}
                />
              ) : (
                <IconButton
                  aria-label="add to favorites"
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
          <Heading as="h2" size="md" mb="2">
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

          <Button colorScheme="blue" mt="4">
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Link>
  );
}

export default Product;
