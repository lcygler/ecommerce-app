import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createPaymentLink,
  createPurchase,
  deletePurchaseById,
  deleteUserCart,
  getAllProducts,
  sendPurchaseFailure,
  updateUserCart,
} from '../redux/asyncActions';
import { actions } from '../redux/slice';
import store from '../redux/store';

import { motion } from 'framer-motion';
import { Navbar } from '../components/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AddIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';
import emptyCartImage from '../assets/images/empty-cart.png';

let navigateTimeoutId = null;

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelRef = useRef();
  const {
    isOpen: isRemoveAlertOpen,
    onOpen: onRemoveAlertOpen,
    onClose: onRemoveAlertClose,
  } = useDisclosure();
  const {
    isOpen: isEmptyCartAlertOpen,
    onOpen: onEmptyCartAlertOpen,
    onClose: onEmptyCartAlertClose,
  } = useDisclosure();

  const userId = useSelector((state) => state.userId);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const selectedUser = useSelector((state) => state.selectedUser);
  const selectedPurchase = useSelector((state) => state.selectedPurchase);
  const cartProducts = useSelector((state) => state.cartProducts);
  const cartTotal = useSelector((state) => state.cartTotal);

  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [removeProductId, setRemoveProductId] = useState(null);
  const [renderCart, setRenderCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getAllProducts());
      dispatch(actions.updateCartStock());
      setRenderCart(false);
    };
    fetchProducts();
    return () => {
      clearTimeout(navigateTimeoutId);
    };
  }, [dispatch, renderCart]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payment_id = searchParams.get('payment_id');
    const storedURL = localStorage.getItem('mpErrorURL');
    const currentURL = window.location.href;

    if (payment_id && payment_id === 'null' && storedURL !== currentURL) {
      dispatch(deletePurchaseById(selectedPurchase?.id));
      dispatch(sendPurchaseFailure({ email: selectedUser.user.email })); // Send purchase failure email
      // dispatch(actions.deletePurchase());
      toast.error('Purchase unsuccessful');
      localStorage.setItem('mpErrorURL', currentURL);
    }
  }, [dispatch, selectedPurchase, selectedUser]);

  const handleIncreaseItem = (productId) => {
    const product = cartProducts?.find((product) => product.id === productId);

    if (product.quantity < product.stock) {
      dispatch(actions.increaseProduct(productId));

      const updatedCartProducts = cartProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
      dispatch(updateUserCart({ userId, products: updatedCartProducts }));
    } else {
      toast.error('Quantity exceeds available stock');
    }
  };

  const isIncreaseDisabled = (productId) => {
    const product = cartProducts.find((product) => product.id === productId);
    return product.quantity === product.stock;
  };

  const handleDecreaseItem = (productId) => {
    const prod = cartProducts?.find((product) => product.id === productId);

    if (prod.quantity === 1) {
      // const confirmed = window.confirm('Are you sure you want to remove this product?');
      // if (confirmed) {
      // dispatch(actions.decreaseProduct(productId));
      // const updatedCartProducts = cartProducts.filter((p) => p.id !== productId);
      // dispatch(updateUserCart({ userId, products: updatedCartProducts }));
      // toast.success('Product removed from cart!');
      // }
      setRemoveProductId(productId);
      onRemoveAlertOpen();
    } else {
      dispatch(actions.decreaseProduct(productId));

      const updatedCartProducts = cartProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
      dispatch(updateUserCart({ userId, products: updatedCartProducts }));
    }
  };

  const isDecreaseDisabled = (productId) => {
    const product = cartProducts.find((product) => product.id === productId);
    return product.quantity === 1;
  };

  const handleUpdateItem = (productId, quantity) => {
    const product = cartProducts?.find((product) => product.id === productId);
    const newQuantity = parseInt(quantity);

    if (newQuantity > product.stock) {
      // toast.error('Quantity exceeds available stock');
      return;
    }

    dispatch(actions.updateProduct({ productId, quantity }));
    const updatedCartProducts = cartProducts.map((p) =>
      p.id === productId ? { ...p, quantity: newQuantity } : p
    );
    dispatch(updateUserCart({ userId, products: updatedCartProducts }));
  };

  const handleRemoveItem = (productId) => {
    // const confirmed = window.confirm('Are you sure you want to remove this product?');
    // if (confirmed) {
    dispatch(actions.removeProduct(productId));
    const updatedCartProducts = cartProducts.filter((p) => p.id !== productId);
    dispatch(updateUserCart({ userId, products: updatedCartProducts }));
    toast.error('Product removed from cart!');
    // }
  };

  const handleClearCart = () => {
    // const confirmed = window.confirm('Are you sure you want to clear the cart?');
    // if (confirmed) {
    dispatch(actions.clearCart());
    dispatch(deleteUserCart(userId));
    toast.success('Your cart was cleared!');
    // }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to your account to proceed with checkout');
      navigate('/login');
      return;
    }

    if (!selectedUser?.user?.address || selectedUser?.user?.address === '') {
      toast.error('Please complete your profile to proceed with checkout');
      navigate('/profile/edit');
      return;
    }

    if (cartProducts?.length !== 0) {
      setIsLoading(true);
      await dispatch(getAllProducts());
      const allProducts = store.getState().allProducts;

      const isValidQuantity = cartProducts.every((product) => {
        const matchedProduct = allProducts.find((p) => p.id === product.id);
        return matchedProduct && product.quantity <= matchedProduct.stock;
      });

      if (isValidQuantity) {
        const response = await dispatch(createPaymentLink(cartProducts));
        if (response.payload) {
          dispatch(createPurchase({ userId, products: cartProducts }));
          // dispatch(actions.createPurchase(cartProducts));

          navigateTimeoutId = setTimeout(() => {
            setIsLoading(false);
            window.location.href = response.payload;
          }, 2000);
        } else {
          setIsLoading(false);
          toast.error('Checkout process failed');
          setRenderCart(true);
        }
      } else {
        setIsLoading(false);
        toast.error('Quantity exceeds available stock');
        setRenderCart(true);
      }
    }
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
              w="700px"
              // minHeight="550px"
              // width="100%"
              // maxW="3xl"
              boxSizing="border-box"
            >
              <Heading size="lg" mb={6} textAlign="center">
                Shopping Cart
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
                        <AlertTitle>Oops! Your cart is empty</AlertTitle>
                      </Flex>
                      <AlertDescription mt="2">Please login to add some products</AlertDescription>
                    </Flex>
                  </Alert>
                  {/* Login to add products */}
                  <Fade in={isImageLoaded}>
                    <Box mt={4} display="flex" justifyContent="center">
                      <Image
                        src={emptyCartImage}
                        alt="Empty Cart"
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
              ) : cartProducts?.length === 0 ? (
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
                        <AlertTitle>Oops! Your cart is empty</AlertTitle>
                      </Flex>
                      <AlertDescription mt="2">Let's add some products!</AlertDescription>
                    </Flex>
                  </Alert>
                  {/* Your cart is empty */}
                  <Fade in={isImageLoaded}>
                    <Box mt={4} display="flex" justifyContent="center">
                      <Image
                        src={emptyCartImage}
                        alt="Empty Cart"
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
                            $
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

                      <Flex alignItems="flex-end" flexDirection="column">
                        <Flex alignItems="center" marginTop={{ base: 2, md: 0 }}>
                          <Text>Quantity:</Text>

                          <Button
                            onClick={() => handleDecreaseItem(product.id)}
                            size="sm"
                            marginLeft={2}
                            isDisabled={isDecreaseDisabled(product.id)}
                          >
                            <MinusIcon fontSize="8px" />
                          </Button>

                          <Input
                            type="number"
                            value={product.quantity}
                            min={1}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity === 0) {
                                handleRemoveItem(product.id);
                              } else if (!isNaN(newQuantity) && newQuantity > 0) {
                                handleUpdateItem(product.id, newQuantity);
                              }
                            }}
                            size="sm"
                            width="50px"
                            textAlign="center"
                          />

                          <Button
                            onClick={() => handleIncreaseItem(product.id)}
                            size="sm"
                            isDisabled={isIncreaseDisabled(product.id)}
                          >
                            <AddIcon fontSize="8px" />
                          </Button>

                          {/* <Button onClick={() => handleRemoveItem(product.id)} size="sm" marginLeft={2}> */}
                          <Button
                            onClick={() => {
                              setRemoveProductId(product.id);
                              onRemoveAlertOpen();
                            }}
                            size="sm"
                            marginLeft={2}
                          >
                            <CloseIcon fontSize="8px" />
                          </Button>
                        </Flex>

                        {product.stock === 1 ? (
                          <Badge colorScheme="red" variant="subtle" mt={3}>
                            Last unit!
                          </Badge>
                        ) : product.stock > 1 && product.stock <= 5 ? (
                          <Badge colorScheme="red" variant="subtle" mt={3}>
                            Last {product.stock} units!
                          </Badge>
                        ) : (
                          <Badge colorScheme="green" variant="subtle" mt={3}>
                            {product.stock} units left
                          </Badge>
                        )}
                        {/* <Text fontWeight="normal" fontSize="sm" mt="4">
                      {product.stock === 1
                        ? 'Last unit!'
                        : product.stock > 1 && product.stock <= 5
                        ? `Last ${product.stock} units!`
                        : `${product.stock} units left`}
                    </Text> */}
                      </Flex>
                    </Box>
                  ))}

                  <Box my={6} p={2} bg="gray.100" borderRadius="md" textAlign="right">
                    <Text fontSize="lg" fontWeight="bold" mr="4" mb="0" py="1">
                      Total: ${cartTotal.toFixed(2)}
                    </Text>
                  </Box>

                  <Flex flexDirection="column" alignItems="center" width="100%">
                    <Stack direction="row" spacing={4} justifyContent="center" width="100%">
                      <Button
                        width="30%"
                        onClick={() => {
                          navigate(-1);
                          // window.history.back();
                        }}
                        isDisabled={isLoading}
                      >
                        Go Back
                      </Button>

                      <Button
                        colorScheme="blue"
                        isLoading={isLoading}
                        loadingText="Checking out..."
                        width="30%"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </Stack>

                    <Button
                      colorScheme="red"
                      variant="ghost"
                      // onClick={handleClearCart}
                      onClick={onEmptyCartAlertOpen}
                      width="30%"
                      mt="6"
                    >
                      Empty Cart
                    </Button>
                  </Flex>
                </>
              )}
            </Box>
          </Box>

          <AlertDialog
            isOpen={isRemoveAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onRemoveAlertClose}
          >
            <AlertDialogOverlay backgroundColor="transparent">
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Remove Item
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onRemoveAlertClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleRemoveItem(removeProductId);
                      onRemoveAlertClose();
                    }}
                    ml={3}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <AlertDialog
            isOpen={isEmptyCartAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onEmptyCartAlertClose}
          >
            <AlertDialogOverlay backgroundColor="transparent">
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Empty Cart
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onEmptyCartAlertClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleClearCart();
                      onEmptyCartAlertClose();
                    }}
                    ml={3}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </motion.div>
    </>
  );
}

export default Cart;
