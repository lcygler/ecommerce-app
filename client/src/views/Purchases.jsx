import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions } from '../redux/slice';

import { Box, Button, Fade, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Navbar } from '../components/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImage from '../assets/images/background.jpg';
import emptyCartImage from '../assets/images/empty-cart.png';

function Purchases() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payment_id = searchParams.get('payment_id');

    const storedURL = localStorage.getItem('mpSuccessURL');
    const currentURL = window.location.href;

    if (payment_id && payment_id !== 'null' && storedURL !== currentURL) {
      dispatch(actions.clearCart());

      toast.success('Your purchase was successful!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });

      localStorage.setItem('mpSuccessURL', currentURL);
    }
  }, []);

  const handlePurchaseDetail = (id) => {
    navigate(`/purchases/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
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

          {orders?.length === 0 ? (
            <Box textAlign="center" fontSize="lg" fontWeight="normal">
              No purchases found
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
                    Order
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

              {orders?.map((order) => (
                <Box
                  key={order.id}
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
                      {order.id}
                    </Text>
                  </Flex>

                  <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                    <Text flex="1">{order.date}</Text>
                  </Flex>

                  <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                    <Text flex="1">{order.status}</Text>
                  </Flex>

                  <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                    <Text flex="1">${order.total.toFixed(2)}</Text>
                  </Flex>

                  <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                    <Button
                      size="sm"
                      width="100px"
                      colorScheme="blue"
                      onClick={() => handlePurchaseDetail(order.id)}
                    >
                      View Detail
                    </Button>
                  </Flex>
                </Box>
              ))}

              <Flex flexDirection="column" alignItems="center" mt="10">
                <Stack direction="row" spacing={4} justifyContent="center" width="100%">
                  <Button width="30%" onClick={() => navigate('/home')}>
                    Go Back
                  </Button>
                </Stack>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Purchases;
