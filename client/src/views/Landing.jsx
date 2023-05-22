import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getAllProducts } from '../redux/asyncActions';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {
  Badge,
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Image,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import logoImage from '../assets/icons/logo_modern_2.jpg';
import backgroundImage from '../assets/images/background.jpg';

function Landing() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const saleProducts = allProducts?.filter((product) => product.discounts > 0);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Box
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      overflowX="hidden"
    >
      {!allProducts?.length ? (
        <>
          <Box display="grid" placeItems="center" height="60vh">
            <Spinner size="xl" color="blue.500" />
          </Box>
        </>
      ) : (
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          padding={8}
          // maxWidth="2xl"
          width="80%"
          textAlign="center"
          marginTop={8}
        >
          <Fade in={isLogoLoaded}>
            <Box my={4} height="120px">
              <Image
                src={logoImage}
                alt="Modern Fashion"
                h="100%"
                w="100%"
                objectFit="contain"
                onLoad={() => setIsLogoLoaded(true)}
              />
            </Box>
          </Fade>

          <Carousel
            bg="white"
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            autoPlay={true}
            interval={5000}
            stopOnHover={false}
            infiniteLoop={true}
            swipeable={false}
            emulateTouch={false}
            centerMode={true}
            centerSlidePercentage={20}
            // width="80%"
          >
            {saleProducts?.map((product) => (
              <Link
                as={RouterLink}
                to={`/home/${product.id}`}
                _hover={{ textDecoration: 'none' }}
                key={product.id}
              >
                <Box
                  width="250px"
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  paddingX={2}
                  paddingY={4}
                  bg="white"
                  h="420px"
                  w="280px"
                  my={4}
                  borderRadius="md"
                  position="relative"
                  cursor="pointer"
                  style={{ transition: 'transform 0.2s ease-in-out' }}
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Badge
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme="green"
                    borderRadius="md"
                    px={2}
                    py={1}
                    fontWeight="bold"
                  >
                    {Math.round(product.discounts * 100)}% OFF
                  </Badge>

                  <Box mb={4} height="300px">
                    <Image
                      src={product.image}
                      alt={product.name}
                      h="100%"
                      w="100%"
                      objectFit="contain"
                    />
                  </Box>
                  <Flex justifyContent="center" flexDirection="column" alignItems="center" mr="2">
                    <Heading
                      as="h3"
                      size="sm"
                      color="black"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      maxW="220px"
                    >
                      {product.name}
                    </Heading>

                    <Flex alignItems="center" mt={2}>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="gray.500"
                        textDecoration="line-through"
                        mr="1"
                      >
                        ${product.price.toFixed(2)}
                      </Text>

                      <Text fontSize="lg" fontWeight="bold" color="black.500" ml="1">
                        ${(product.price * (1 - product.discounts)).toFixed(2)}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Link>
            ))}
          </Carousel>

          <Link as={RouterLink} to="/home">
            <Button colorScheme="blue" size="lg" mb={4}>
              Shop Now
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default Landing;
