import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Navbar } from '../components/index';

import backgroundImage from '../assets/images/background.jpg';

function PurchaseDetail() {
  const { purchaseId } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders);
  const order = orders?.find((order) => order.id === parseInt(purchaseId));

  useEffect(() => {
    if (!order) {
      // Handle case when order is not found
      navigate('/purchases');
    }
  }, [order, navigate]);

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
          w="700px"
          boxSizing="border-box"
        >
          <Heading size="lg" mb={6} textAlign="center">
            Purchase Detail
          </Heading>

          {order ? (
            <Flex flexDirection="column" alignItems="center">
              <Box bg="gray.100" borderRadius="md" p={4} width="100%">
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
                </Flex>

                <Box
                  key={order.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection={{ base: 'column', md: 'row' }}
                  marginY={2}
                  paddingY={2}
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
                </Box>
              </Box>

              <Box mb={6} p={2} bg="white" borderRadius="md">
                {order?.products
                  .slice()
                  .sort((a, b) => a.id - b.id)
                  .map((product) => (
                    <Box
                      key={product.id}
                      borderBottom="1px solid gray"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      marginY={2}
                      paddingY={2}
                    >
                      <Flex alignItems="center" marginBottom={2}>
                        <Text fontWeight="bold" fontSize="xl" marginRight={4}>
                          {product.id}
                        </Text>
                        <Image
                          src={product.image}
                          alt={product.name}
                          boxSize="100px"
                          objectFit="contain"
                          marginRight={4}
                        />
                      </Flex>

                      <Flex flexDirection="column" justifyContent="flex-start" flex="1">
                        <Box
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '300px',
                            textAlign: 'left',
                          }}
                        >
                          {product.name}
                        </Box>

                        <Flex alignItems="center" marginTop={{ base: 2, md: 0 }} mr="10">
                          <Text>Quantity: {product.quantity}</Text>
                        </Flex>
                      </Flex>

                      <Flex
                        flexDirection="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        // flex="1"
                        mr="6"
                      >
                        <Flex alignItems="center">
                          {product.discounts > 0 && (
                            <Text
                              fontWeight="bold"
                              fontSize="md"
                              color="gray.500"
                              textDecoration="line-through"
                              marginRight={2}
                            >
                              ${product.price.toFixed(2)}
                            </Text>
                          )}

                          <Text fontWeight="bold" fontSize="lg">
                            $
                            {product.discounts === 0
                              ? product.price.toFixed(2)
                              : (product.price * (1 - product.discounts)).toFixed(2)}
                          </Text>
                        </Flex>

                        {product.discounts > 0 && (
                          <Text fontWeight="bold" color="green.400">
                            {product.discounts * 100}% OFF
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  ))}
              </Box>

              <Button
                colorScheme="gray"
                width="30%"
                mb={4}
                onClick={() => {
                  navigate('/purchases');
                }}
              >
                Go Back
              </Button>
            </Flex>
          ) : (
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Order not found!
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PurchaseDetail;