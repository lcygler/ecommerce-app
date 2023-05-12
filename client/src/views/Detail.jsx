import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

function Detail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const catalogProducts = useSelector((state) => state.catalog.catalog);
  const product = catalogProducts?.find((product) => product.id === parseInt(productId));

  if (!product) {
    return (
      <Box display="grid" placeItems="center">
        Product not found
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box maxW="800px">
        <Flex flexDirection="column" alignItems="center">
          <Flex flexDirection="row">
            <Image
              src={product.image}
              alt={product.name}
              objectFit="contain"
              h="500px"
              w="auto"
              mr="4"
            />

            <Flex flexDirection="column" justifyContent="space-between">
              <Box>
                <Box mt="4" d="flex" justifyContent="space-between" alignItems="baseline">
                  <Heading as="h2" size="lg">
                    {product.name}
                  </Heading>

                  <Text fontWeight="bold" fontSize="2xl">
                    ${product.price.toFixed(2)}
                  </Text>
                </Box>

                <Box mt="4" d="flex" alignItems="center">
                  <Text fontSize="md">{product.description}</Text>
                </Box>

                <Box mt="4" d="flex" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" fontSize="md">
                    Size: {product.size}
                  </Text>

                  <Text fontWeight="bold" fontSize="md">
                    Gender: {product.gender}
                  </Text>

                  <Text fontWeight="bold" fontSize="md">
                    Season: {product.seasons.map((season) => season.name).join(', ')}
                  </Text>

                  <Text fontWeight="bold" fontSize="md">
                    Category: {product.categories.map((category) => category.name).join(', ')}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>

          <Stack direction="row" spacing={4} mt="auto">
            <Button
              onClick={() => {
                navigate('/home');
              }}
              width="150px"
            >
              Go back
            </Button>

            <Button colorScheme="blue" width="150px">
              Add to Cart
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}

export default Detail;
