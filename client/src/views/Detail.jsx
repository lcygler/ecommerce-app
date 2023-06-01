import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getProductById, updateUserCart } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { CreateReview, Navbar, StarRating } from '../components/index';

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
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.jpg';

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [isInCart, setIsInCart] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewsPerPage = 4;

  const userId = useSelector((state) => state.userId);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const cartProducts = useSelector((state) => state.cartProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const selectedProduct = useSelector((state) => state.selectedProduct);
  const selectedReview = useSelector((state) => state.selectedReview);

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
  }, [dispatch, productId, selectedReview]);

  useEffect(() => {
    const productExists = cartProducts?.find((product) => product.id === parseInt(productId));
    setIsInCart(!!productExists);
  }, [cartProducts, productId]);

  const isPrevDisabled = (productId) => {
    const index = filteredProducts.findIndex((product) => product.id === parseInt(productId));
    return index < 1;
  };

  const isNextDisabled = (productId) => {
    const index = filteredProducts.findIndex((product) => product.id === parseInt(productId));
    return index === -1 || index >= filteredProducts.length - 1;
  };

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
        <>
          <Navbar width="100%" />
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
              height={`calc(100vh - 70px)`}
              backgroundImage={`url(${backgroundImage})`}
              backgroundSize="cover"
              backgroundPosition="center"
            >
              <Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Flex alignItems="center">
                    <Box maxW="800px" bg="white" borderRadius="lg" boxShadow="md" p="10">
                      <Flex flexDirection="column" alignItems="center">
                        <Flex flexDirection="row">
                          <Image
                            src={image}
                            alt={name}
                            objectFit="contain"
                            h="500px"
                            maxW="350px"
                            mr="4"
                            // transition="transform 0.2s ease-in-out"
                            // _hover={{ transform: 'scale(1.05)' }}
                          />

                          <Flex flexDirection="column" justifyContent="space-between" ml="5">
                            <Box>
                              <Box
                                mt="4"
                                d="flex"
                                justifyContent="space-between"
                                alignItems="baseline"
                              >
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
                                {/* <Text fontWeight="bold">Description</Text> */}
                                <Text fontSize="md" mb="2">
                                  {description}
                                </Text>
                              </Box>

                              {stock === 0 ? (
                                <Badge
                                  fontWeight="normal"
                                  fontSize="md"
                                  colorScheme="red"
                                  mr="2"
                                  mt="2"
                                >
                                  No stock
                                </Badge>
                              ) : stock <= 5 ? (
                                <>
                                  <Badge
                                    fontWeight="normal"
                                    fontSize="md"
                                    colorScheme="red"
                                    mr="2"
                                    mt="2"
                                  >
                                    Last units!
                                  </Badge>
                                </>
                              ) : (
                                <Badge
                                  fontWeight="normal"
                                  fontSize="md"
                                  colorScheme="gray"
                                  mr="2"
                                  mt="2"
                                >
                                  Stock: {stock}
                                </Badge>
                              )}

                              <Box mt="4">
                                <Box mb="3">
                                  <Text fontWeight="bold" mb="2">
                                    Size
                                  </Text>
                                  <Badge fontWeight="normal" fontSize="md" colorScheme="gray">
                                    {size}
                                  </Badge>
                                </Box>

                                <Box mb="3">
                                  <Text fontWeight="bold" mb="2">
                                    Gender
                                  </Text>
                                  <Badge fontWeight="normal" fontSize="md" colorScheme="gray">
                                    {gender}
                                  </Badge>
                                </Box>

                                <Box mb="3">
                                  <Text fontWeight="bold" mb="2">
                                    Category
                                  </Text>
                                  {Categories?.map((category) => (
                                    <Badge
                                      key={`category-${category.id}`}
                                      fontWeight="normal"
                                      fontSize="md"
                                      colorScheme="gray"
                                      mr="2"
                                    >
                                      {category.name}
                                    </Badge>
                                  ))}
                                </Box>

                                <Box>
                                  <Text fontWeight="bold" mb="2">
                                    Season
                                  </Text>
                                  {Seasons?.map((season) => (
                                    <Badge
                                      key={`season-${season.id}`}
                                      fontWeight="normal"
                                      fontSize="md"
                                      mr="2"
                                      colorScheme="gray"
                                    >
                                      {season.name}
                                    </Badge>
                                  ))}
                                </Box>
                              </Box>
                            </Box>
                          </Flex>
                        </Flex>

                        <Stack direction="row" spacing={4} mt="8">
                          <Button
                            onClick={() => {
                              navigate(-1);
                              // window.history.back();
                            }}
                            colorScheme="gray"
                            width="150px"
                          >
                            Go Back
                          </Button>

                          {/* Write Review */}
                          {isAuthenticated && <CreateReview productId={productId} />}

                          {isAuthenticated && (
                            <Button
                              colorScheme="blue"
                              width="150px"
                              onClick={handleAddToCart}
                              isDisabled={isInCart}
                            >
                              {isInCart ? 'In Cart' : 'Add to Cart'}
                            </Button>
                          )}
                        </Stack>
                      </Flex>
                    </Box>
                  </Flex>

                  {/* Botones prev y next debajo de card */}
                  {/* <Flex mt="4">
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
                  </Flex> */}
                </Flex>

                <Flex flexDirection="row" justifyContent="center" alignItems="flex-start" ml="10">
                  <Flex flexDirection="column" alignItems="center" w="350px">
                    <Text
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl"
                      w="100%"
                      // bg="white"
                      bg="#e5e5e5"
                      borderRadius="md"
                      p="10"
                      boxShadow="md"
                      mb="4"
                    >
                      Customer Reviews
                      {/* Check out other client reviews! */}
                    </Text>

                    <Box d="flex" flexDirection="column" alignItems="center" width="100%">
                      {Reviews?.filter((review) => review.disable === false)
                        .slice(currentReviewIndex, currentReviewIndex + reviewsPerPage)
                        .map((review) => (
                          <Box
                            key={review.id}
                            bg="white"
                            borderRadius="md"
                            p="4"
                            mb="2"
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

                    {/* 
                  {Reviews?.slice(currentReviewIndex, currentReviewIndex + reviewsPerPage).map(
                    (review) => {
                      return (
                        <ReviewCard
                          key={review.id}
                          comment={review.comment}
                          punctuation={review.punctuation}
                        />
                      );
                    }
                  )} */}
                  </Flex>

                  {Reviews && Reviews.length > reviewsPerPage && (
                    <Flex flexDirection="column" alignItems="center" ml="2" mt="4">
                      <Button
                        colorScheme="blue"
                        variant="ghost"
                        size="md"
                        rounded="full"
                        onClick={() =>
                          setCurrentReviewIndex((prevIndex) =>
                            Math.max(prevIndex - reviewsPerPage, 0)
                          )
                        }
                        isDisabled={currentReviewIndex === 0}
                      >
                        <Icon as={FaChevronUp} />
                      </Button>

                      <Button
                        colorScheme="blue"
                        variant="ghost"
                        size="md"
                        rounded="full"
                        onClick={() =>
                          setCurrentReviewIndex((prevIndex) =>
                            Math.min(prevIndex + reviewsPerPage, Reviews.length - reviewsPerPage)
                          )
                        }
                        isDisabled={currentReviewIndex >= Reviews.length - reviewsPerPage}
                      >
                        <Icon as={FaChevronDown} />
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Flex>

              <Button
                colorScheme="blue"
                variant="ghost"
                size="md"
                rounded="full"
                onClick={handlePrev}
                position="absolute"
                top="90px"
                left="20px"
                isDisabled={isPrevDisabled(productId)}
              >
                <Icon as={FaChevronLeft} mr="2" /> Previous Product
              </Button>

              <Button
                colorScheme="blue"
                variant="ghost"
                size="md"
                rounded="full"
                onClick={handleNext}
                position="absolute"
                top="90px"
                right="20px"
                isDisabled={isNextDisabled(productId)}
              >
                Next Product <Icon as={FaChevronRight} ml="2" />
              </Button>
            </Box>
          </motion.div>
        </>
      )}
    </>
  );
}

export default Detail;
