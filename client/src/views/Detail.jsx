import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getProductById } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.jpg';

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const { name, image, Categories, discounts, price, Seasons, size, gender, description } =
    selectedProduct || {};

  useEffect(() => {
    dispatch(getProductById(productId));
    return () => {
      dispatch(actions.clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const handlePrev = () => {
    const index = filteredProducts.findIndex((product) => product.id === selectedProduct?.id);
    if (index > 0) {
      const prevProduct = filteredProducts[index - 1];
      navigate(`/home/${prevProduct.id}`);
    }
  };

  const handleNext = () => {
    const index = filteredProducts.findIndex((product) => product.id === selectedProduct?.id);
    if (index !== -1 && index < filteredProducts.length - 1) {
      const nextProduct = filteredProducts[index + 1];
      navigate(`/home/${nextProduct.id}`);
    }
  };

  if (!selectedProduct) {
    return (
      <Box display="grid" placeItems="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
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
      <Flex alignItems="center">
        <Button
          colorScheme="blue"
          variant="ghost"
          size="lg"
          rounded="full"
          mr="4"
          onClick={handlePrev}
        >
          <Icon as={FaChevronLeft} />
        </Button>
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
                        ${discounts === 0 ? price.toFixed(2) : (price * (1 - discounts)).toFixed(2)}
                      </Text>

                      {discounts > 0 && (
                        <Text fontWeight="bold" fontSize="md" color="green.400">
                          {discounts * 100}% OFF
                        </Text>
                      )}
                    </Flex>

                    {discounts > 0 && (
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        color="gray.500"
                        textDecoration="line-through"
                        mr="2"
                      >
                        ${(price * (1 + discounts)).toFixed(2)}
                      </Text>
                    )}
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
                      {Categories?.map((category) => (
                        <Badge key={category.id} colorScheme="purple" mr="1">
                          {category.name}
                        </Badge>
                      ))}
                    </Text>

                    <Text fontWeight="normal" fontSize="md">
                      Season:{' '}
                      {Seasons?.map((season) => (
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

        <Button
          colorScheme="blue"
          variant="ghost"
          size="lg"
          rounded="full"
          ml="4"
          onClick={handleNext}
        >
          <Icon as={FaChevronRight} />
        </Button>
      </Flex>
    </Box>
  );
}

export default Detail;
