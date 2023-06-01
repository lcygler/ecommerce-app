import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  deleteUserCart,
  getUserPurchases,
  sendPurchaseSuccess,
  updateProductsStock,
} from '../redux/asyncActions';
import { actions } from '../redux/slice';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Navbar } from '../components/index';

import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../assets/images/background.jpg';
import emptyCartImage from '../assets/images/empty-cart.png';

function Purchases() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId);
  const selectedUser = useSelector((state) => state.selectedUser);
  const cartProducts = useSelector((state) => state.cartProducts);
  const purchases = useSelector((state) => state.purchases);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserPurchases(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payment_id = searchParams.get('payment_id');
    const storedURL = localStorage.getItem('mpSuccessURL');
    const currentURL = window.location.href;

    // If purchase was successful, then:
    if (payment_id && payment_id !== 'null' && storedURL !== currentURL) {
      dispatch(updateProductsStock(cartProducts)); // Update products stock in DB
      dispatch(deleteUserCart(userId)); // Clear user cart in DB
      dispatch(actions.clearCart()); // Clear user cart in state
      dispatch(sendPurchaseSuccess({ email: selectedUser.user.email })); // Send purchase success email

      localStorage.setItem('mpSuccessURL', currentURL);

      toast.success('Your purchase was successful!');
    }
  }, [dispatch, cartProducts, userId, selectedUser]);

  const handlePurchaseDetail = (id) => {
    navigate(`/purchases/${id}`);
  };

  return (
    <>
      <Navbar />
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
          flexDirection="column"
          // minHeight="100vh"
          height={`calc(100vh - 70px)`}
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          backgroundRepeat="no-repeat"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            my="10"
          >
            <Box
              bg="white"
              boxShadow="lg"
              borderRadius="md"
              mx="auto"
              p={8}
              width="700px"
              boxSizing="border-box"
            >
              <Heading size="lg" mb={6} textAlign="center">
                Purchases
              </Heading>

              {!isAuthenticated ? (
                <Box textAlign="center" fontSize="lg" fontWeight="normal">
                  <Alert
                    status="warning"
                    textAlign="center"
                    maxWidth="sm"
                    mx="auto"
                    display="flex"
                    justifyContent="center"
                    fontSize="md"
                    mt="10"
                  >
                    <Flex flexDirection="column" alignItems="center">
                      <Flex>
                        <AlertIcon />
                        <AlertTitle>Oops! Your purchases list is empty</AlertTitle>
                      </Flex>
                      <AlertDescription mt="2">
                        Please login to view your purchases
                      </AlertDescription>
                    </Flex>
                  </Alert>
                  {/* Login to view your purchases */}
                  <Fade in={isImageLoaded}>
                    <Box mt={4} display="flex" justifyContent="center">
                      <Image
                        src={emptyCartImage}
                        alt="Empty Purchases"
                        width="300px"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                    </Box>
                  </Fade>
                  <Box mt={4}>
                    <Button colorScheme="blue" onClick={() => navigate('/login')}>
                      Login Now
                    </Button>
                  </Box>
                </Box>
              ) : // ) : purchases?.length === 0 ? (
              purchases?.length === 0 ||
                purchases?.every((purchase) => purchase.status === 'Canceled') ? (
                <Box textAlign="center" fontSize="lg" fontWeight="normal">
                  <Alert
                    status="warning"
                    textAlign="center"
                    maxWidth="sm"
                    mx="auto"
                    display="flex"
                    justifyContent="center"
                    fontSize="md"
                    mt="10"
                  >
                    <Flex flexDirection="column" alignItems="center">
                      <Flex>
                        <AlertIcon />
                        <AlertTitle>Oops! Your purchases list is empty</AlertTitle>
                      </Flex>
                      <AlertDescription mt="2">Time to make some purchases!</AlertDescription>
                    </Flex>
                  </Alert>
                  {/* No purchases found */}
                  <Fade in={isImageLoaded}>
                    <Box mt={4} display="flex" justifyContent="center">
                      <Image
                        src={emptyCartImage}
                        alt="Empty Purchases"
                        width="300px"
                        height="300px"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                    </Box>
                  </Fade>
                  <Box mt={4}>
                    <Button colorScheme="blue" onClick={() => navigate('/home')}>
                      Browse Products
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box bg="gray.100" borderRadius="md" p={4} mb={4}>
                    <Flex
                      alignItems="center"
                      justifyContent={{ base: 'flex-start', md: 'space-between' }}
                      fontWeight="bold"
                      mb={2}
                    >
                      <Text flex="1" pr={4}>
                        Purchase ID
                      </Text>
                      <Text flex="1" pr={4}>
                        Date
                      </Text>
                      <Text flex="1" pr={4}>
                        Status
                      </Text>
                      <Text flex="1" pr={4}>
                        Total
                      </Text>
                      <Text flex="1" pr={4}>
                        Actions
                      </Text>
                    </Flex>
                  </Box>

                  {/* {purchases?.map((purchase) => ( */}
                  {purchases
                    ?.filter((purchase) => purchase.status !== 'Canceled')
                    .map((purchase) => (
                      <Box
                        key={purchase.id}
                        borderBottom="1px solid gray"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDirection={{ base: 'column', md: 'row' }}
                        marginY={2}
                        paddingY={4}
                      >
                        <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                          <Text flex="1" ml="4">
                            {purchase.id}
                          </Text>
                        </Flex>

                        <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                          <Text flex="1">{purchase.date}</Text>
                        </Flex>

                        <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                          <Text flex="1">{purchase.status}</Text>
                        </Flex>

                        <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                          <Text flex="1">${purchase.total.toFixed(2)}</Text>
                        </Flex>

                        <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                          <Button
                            size="sm"
                            width="100px"
                            colorScheme="blue"
                            onClick={() => handlePurchaseDetail(purchase.id)}
                          >
                            View Detail
                          </Button>
                        </Flex>
                      </Box>
                    ))}

                  <Flex flexDirection="column" alignItems="center" mt="10">
                    <Stack direction="row" spacing={4} justifyContent="center" width="100%">
                      <Button
                        width="30%"
                        onClick={() => {
                          navigate(-1);
                          // window.history.back();
                        }}
                      >
                        Go Back
                      </Button>
                    </Stack>
                  </Flex>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}

export default Purchases;
