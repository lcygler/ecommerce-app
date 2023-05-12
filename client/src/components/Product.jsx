import { Badge, Box, Button, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Product({
  id,
  name,
  price,
  category,
  description,
  gender,
  season,
  size,
  image,
  discount,
}) {
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
          <Image src={image} alt={name} h="100%" w="100%" objectFit="contain" />
          {discount > 0 && (
            <Badge colorScheme="red" position="absolute" top="0" right="0" m="2" fontSize="sm">
              Sale
            </Badge>
          )}
        </Box>
        <Box p="6">
          <Heading as="h2" size="md" mb="2">
            {name}
          </Heading>
          <Text fontSize="md">{description}</Text>
          <Box d="flex" alignItems="baseline">
            <Text fontWeight="bold" fontSize="2xl" mt="2" mr="2">
              ${discount === 0 ? price.toFixed(2) : (price * (1 - discount)).toFixed(2)}
            </Text>
            {discount > 0 && (
              <Text fontWeight="bold" fontSize="md" color="gray.500" textDecoration="line-through">
                ${(price * 1.2).toFixed(2)}
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
