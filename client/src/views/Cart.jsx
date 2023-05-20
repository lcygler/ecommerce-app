import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserCart } from '../redux/asyncActions';
import { actions } from '../redux/slice';

import { Navbar } from '../components/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AddIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';
import emptyCartImage from '../assets/images/empty-cart.png';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cartProducts = useSelector((state) => state.cartProducts);
  const cartTotal = useSelector((state) => state.cartTotal);

  useEffect(() => {
    // dispatch(getUserCart(user.id));
  }, [dispatch]);

  const handleIncrease = (productId) => {
    dispatch(actions.increaseProduct(productId));
  };

  const handleDecrease = (productId) => {
    const prod = cartProducts?.find((product) => product.id === productId);

    if (prod.quantity === 1) {
      const confirmed = window.confirm('Are you sure you want to remove this product?');

      if (confirmed) {
        dispatch(actions.decreaseProduct(productId));

        toast.success('Product removed from cart!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    } else {
      dispatch(actions.decreaseProduct(productId));
    }
  };

  const handleUpdate = (productId, quantity) => {
    dispatch(actions.updateProduct({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    const confirmed = window.confirm('Are you sure you want to remove this product?');
    if (confirmed) {
      dispatch(actions.removeProduct(productId));

      toast.success('Product removed from cart!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear the cart?');
    if (confirmed) {
      dispatch(actions.clearCart());

      toast.success('Cart was cleared!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleCheckout = () => {};

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
          // width="100%"
          // maxW="3xl"
          boxSizing="border-box"
        >
          <Heading size="lg" mb={6} textAlign="center">
            Shopping Cart
          </Heading>

          {cartProducts?.length === 0 ? (
            <Box textAlign="center" fontSize="lg" fontWeight="normal">
              Your cart is empty.
              <Box mt={4} display="flex" justifyContent="center">
                <Image src={emptyCartImage} alt="Empty Cart" width="300px" />
              </Box>
              <Box mt={4}>
                <Button colorScheme="blue" onClick={() => navigate('/home')}>
                  Continue Shopping
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {cartProducts?.map((product, index) => (
                <Box
                  key={product.id}
                  borderBottom={index !== cartProducts.length - 1 && '1px solid gray'}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection={{ base: 'column', md: 'row' }}
                  marginY={2}
                  paddingY={2}
                >
                  <Flex alignItems="center" marginBottom={{ base: 2, md: 0 }}>
                    <Text fontWeight="bold" fontSize="xl" marginRight={4}>
                      {index + 1}
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
                        width: '240px',
                        // maxWidth: '200px',
                        textAlign: 'left',
                      }}
                    >
                      {product.name}
                    </Box>

                    <Flex alignItems="center" marginTop={2}>
                      <Text fontWeight="bold" fontSize="lg" marginRight={2}>
                        {product.discounts === 0
                          ? product.price.toFixed(2)
                          : (product.price * (1 - product.discounts)).toFixed(2)}
                      </Text>

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

                      {product.discounts > 0 && (
                        <Text fontWeight="bold" color="green.400">
                          {product.discounts * 100}% OFF
                        </Text>
                      )}
                    </Flex>
                  </Flex>

                  <Flex alignItems="center">
                    <Flex alignItems="center" marginTop={{ base: 2, md: 0 }}>
                      <Text>Quantity:</Text>

                      <Button onClick={() => handleDecrease(product.id)} size="sm" marginLeft={2}>
                        <MinusIcon fontSize="8px" />
                      </Button>

                      <Input
                        type="number"
                        value={product.quantity}
                        min={1}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity === 0) {
                            handleRemove(product.id);
                          } else if (!isNaN(newQuantity) && newQuantity > 0) {
                            handleUpdate(product.id, newQuantity);
                          }
                        }}
                        size="sm"
                        width="50px"
                        textAlign="center"
                      />

                      <Button onClick={() => handleIncrease(product.id)} size="sm">
                        <AddIcon fontSize="8px" />
                      </Button>

                      <Button onClick={() => handleRemove(product.id)} size="sm" marginLeft={2}>
                        <CloseIcon fontSize="8px" />
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))}

              <Box my={6} p={2} bg="gray.100" borderRadius="md" textAlign="right">
                <Text fontSize="lg" fontWeight="bold" mr="4">
                  Total: ${cartTotal.toFixed(2)}
                </Text>
              </Box>

              <Flex flexDirection="column" alignItems="center">
                <Stack direction="row" spacing={4} justifyContent="center" width="100%">
                  <Button
                    width="100%"
                    onClick={() => {
                      navigate('/home');
                    }}
                  >
                    Go back
                  </Button>

                  <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="Checking out..."
                    width="100%"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Stack>

                <Button colorScheme="red" variant="ghost" onClick={handleClear} mt="6">
                  Clear cart
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
