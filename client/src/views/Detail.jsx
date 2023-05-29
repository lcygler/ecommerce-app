import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getProductById, updateUserCart } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.jpg';
import { CreateReview, StarRating } from '../components/index';

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const userId = useSelector((state) => state.userId);
  const cartProducts = useSelector((state) => state.cartProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const {
    name,
    image,
    Categories,
    discounts,
    price,
    Seasons,
    size,
    gender,
    description,
    Reviews,
    stock,
  } = selectedProduct || {};

  useEffect(() => {
    dispatch(getProductById(productId));
    return () => {
      dispatch(actions.clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const handleAddToCart = (e) => {
    const productExists = cartProducts?.find((product) => product.id === parseInt(productId));

    if (productExists) {
      toast.error('Product already exists in cart!');
    } else {
      const newProduct = {
        id: parseInt(productId),
        name,
        price,
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

      toast.success('Product added to cart!');
    }
  };

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

  return (
    <>
      {!name ? (
        <>
          <Box display="grid" placeItems="center" height="100vh">
            <Spinner size="xl" color="blue.500" />
          </Box>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            easing: 'ease-in-out',
          }}
        >
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
                      maxW="350px"
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
                              $
                              {discounts === 0
                                ? price.toFixed(2)
                                : (price * (1 - discounts)).toFixed(2)}
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

                        {stock === 0 ? (
                          <Badge fontWeight="normal" fontSize="md" colorScheme="red" mr="2" mt="4">
                            Sin stock
                          </Badge>
                        ) : stock < 6 ? (
                          <Badge fontWeight="normal" fontSize="md" colorScheme="red" mr="2" mt="4">
                            ¡Últimas unidades!
                          </Badge>
                        ) : (
                          <Badge fontWeight="normal" fontSize="md" colorScheme="gray" mr="2" mt="4">
                            Stock: {stock}
                          </Badge>
                        )}

                        <Box mt="4" d="flex" justifyContent="space-between" alignItems="center">
                          <Badge fontWeight="normal" fontSize="md" colorScheme="gray" mr="2">
                            {size}
                          </Badge>

                          <Badge fontWeight="normal" fontSize="md" colorScheme="gray" mr="2">
                            {gender}
                          </Badge>

                          {Categories?.map((category) => (
                            <Badge
                              key={category.id}
                              fontWeight="normal"
                              fontSize="md"
                              colorScheme="gray"
                              mr="2"
                            >
                              {category.name}
                            </Badge>
                          ))}

                          <Box fontWeight="normal" fontSize="md" mt="2">
                            {Seasons?.map((season) => (
                              <Badge
                                key={season.id}
                                fontWeight="normal"
                                fontSize="md"
                                colorScheme={
                                  season.name.toLowerCase() === 'verano'
                                    ? 'yellow'
                                    : season.name.toLowerCase() === 'invierno'
                                    ? 'blue'
                                    : season.name.toLowerCase() === 'otoño'
                                    ? 'orange'
                                    : 'green'
                                }
                                mr="2"
                              >
                                {season.name}
                              </Badge>
                            ))}
                          </Box>
                        </Box>

                        <Box mt="4" d="flex" flexDirection="column" alignItems="center">
                          {Reviews?.map((review) => (
                            <Box
                              key={review.id}
                              bg="white"
                              borderRadius="md"
                              p="4"
                              mb="4"
                              boxShadow="md"
                            >
                              <Box color="blue.500" fontWeight="bold" fontSize="lg" mb="2">
                                <StarRating value={review.punctuation} />
                              </Box>
                              <Text color="gray.600" fontSize="sm">
                                {review.comment}
                              </Text>
                            </Box>
                          ))}
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
                      Go Back
                    </Button>

                    <Button colorScheme="blue" width="150px" onClick={handleAddToCart}>
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
              <CreateReview productId={productId} />
            </Flex>
          </Box>
        </motion.div>
      )}
    </>
  );
}

export default Detail;
