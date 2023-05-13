import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge, Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Detail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.allProducts);
  const product = allProducts?.find((product) => product.id === parseInt(productId));
  const { name, image, categories, discount, price, seasons, size, gender, description } = product;

  if (!product) {
    return (
      <Box display="grid" placeItems="center">
        Product not found
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box maxW="800px" bg="white" borderRadius="lg" p="10">
        <Flex flexDirection="column" alignItems="center">
          <Flex flexDirection="row">
            <Image
              src={image}
              alt={name}
              objectFit="contain"
              h="500px"
              w="auto"
              mr="4"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />

            <Flex flexDirection="column" justifyContent="space-between" ml="5">
              <Box>
                <Box mt="4" d="flex" justifyContent="space-between" alignItems="baseline">
                  <Heading as="h2" size="lg">
                    {name}
                  </Heading>

                  <Flex alignItems="baseline">
                    <Text fontWeight="bold" fontSize="2xl" mt="2" mr="2">
                      ${discount === 0 ? price.toFixed(2) : (price * (1 - discount)).toFixed(2)}
                    </Text>

                    {discount > 0 && (
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        color="gray.500"
                        textDecoration="line-through"
                        mr="2"
                      >
                        ${(price * 1.2).toFixed(2)}
                      </Text>
                    )}

                    {discount > 0 && (
                      <Text fontWeight="bold" fontSize="md" color="green.400">
                        {discount * 100}% OFF
                      </Text>
                    )}
                  </Flex>
                </Box>

                <Box mt="4" d="flex" alignItems="center">
                  <Text fontSize="md">{description}</Text>
                </Box>

                <Box mt="4" d="flex" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="normal" fontSize="md">
                    Size: {size}
                  </Text>

                  <Text fontWeight="normal" fontSize="md">
                    Gender: {gender}
                  </Text>

                  <Text fontWeight="normal" fontSize="md">
                    Category:{' '}
                    {categories.map((category) => (
                      <Badge key={category.id} colorScheme="purple" mr="1">
                        {category.name}
                      </Badge>
                    ))}
                  </Text>

                  <Text fontWeight="normal" fontSize="md">
                    Season:{' '}
                    {seasons.map((season) => (
                      <Badge
                        key={season.id}
                        colorScheme={
                          season.name.toLowerCase() === 'verano'
                            ? 'yellow'
                            : season.name.toLowerCase() === 'invierno'
                            ? 'blue'
                            : season.name.toLowerCase() === 'otoño'
                            ? 'orange'
                            : 'green'
                        }
                        mr="1"
                      >
                        {season.name}
                      </Badge>
                    ))}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>

          <Stack direction="row" spacing={4} mt="8">
            <Button
              onClick={() => {
                navigate('/home');
              }}
              colorScheme="gray"
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
