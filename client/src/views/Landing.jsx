import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { StarRating } from '../components/index';
import { getAllProducts } from '../redux/asyncActions';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { ChevronUpIcon } from '@chakra-ui/icons';
import bannerRopa from '../assets/images/banner-ropa.jpg';
// import ropa from '../assets/images/gestionropa.png';

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
  const navigate = useNavigate();

  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [users, setUsers] = useState({
    name: '',
    image: '',
    comment: '',
  });

  const allProducts = useSelector((state) => state.allProducts);
  const saleProducts = allProducts?.filter((product) => product.discounts > 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentResponse = (await axios.get('https://dummyjson.com/comments')).data;
        const response = (await axios.get('https://randomuser.me/api/?results=2')).data;
        // console.log(response.results);
        // console.log(response.results.map((e)=> e.name.first));
        // console.log(response.results.map((e)=> e.picture.large));
        const comments = commentResponse.comments.map((e) => e.body);
        // console.log(comments);
        setUsers({
          name: response.results.map((e) => e.name.first),
          image: response.results.map((e) => e.picture.large),
          comment: comments,
        });
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(users.name[0]);
  // console.log(users.image[0]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      padding={8}
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
          width="100%"
          textAlign="center"
          p="100"
        >
          <Button
            colorScheme="blue"
            variant="solid"
            size="lg"
            position="fixed"
            top="16"
            right="16"
            zIndex="999"
            boxShadow="lg"
            onClick={() => navigate('/home')}
          >
            Shop Now
          </Button>

          <Fade in={isLogoLoaded}>
            <Box mb={12} height="150px">
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

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            h={400}
            mt={8}
            position="relative"
          >
            <Box
              flex="1"
              ml={4}
              maxWidth="50%"
              padding="32px"
              fontSize="20px"
              borderRadius="lg"
              background="#e5e5e5"
              boxShadow="lg"
              // boxShadow="10px 10px 47px -17px"
            >
              <Text textAlign="left" fontFamily="Montserrat, sans-serif">
                Bienvenido a <strong>Modern Fashion</strong>, el destino definitivo para los{' '}
                <strong>amantes de la moda</strong>. Nuestra tienda online te ofrece una{' '}
                <strong>experiencia de compra única</strong>, donde podrás descubrir y vivir las{' '}
                <strong>últimas tendencias en ropa y accesorios</strong>. Desde prendas de vestir
                elegantes hasta accesorios modernos, nuestra colección cuidadosamente seleccionada
                te hará lucir increíble en cualquier ocasión. Con un diseño visual impactante y una{' '}
                <strong>amplia gama de estilos</strong>, estamos aquí para satisfacer tus
                necesidades de moda y llevar tu estilo al siguiente nivel.
              </Text>
            </Box>

            <Box flex="1">
              <Image
                src={bannerRopa}
                alt="Random Image"
                // borderRadius="full"
                // boxSize="325px"
                h="310px"
                objectFit="contain"
                boxShadow="lg"
                borderRadius="lg"
                ml="180px"
              />

              {/* <Image
                src={ropa}
                alt="Random Image"
                borderRadius="full"
                boxSize="325px"
                objectFit="contain"
                boxShadow="lg"
                // boxShadow="10px 10px 15px -7px"
              /> */}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-evenly" h="400px" mt={8}>
            <Box flex="1" ml="120px">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5523.05660636086!2d-58.3849768743303!3d-34.60342720755168!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sar!4v1685502793381!5m2!1sen!2sar"
                width="85%"
                height="310px"
                // frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </Box>

            <Box
              flex="1"
              ml={4}
              maxWidth="50%"
              padding="32px"
              fontSize="20px"
              borderRadius="lg"
              background=" #e5e5e5"
              boxShadow="lg"
              // boxShadow="10px 10px 47px  -17px"
            >
              <Text textAlign="left" fontFamily="Montserrat, sans-serif">
                En <strong>Modern Fashion</strong>, creemos en la importancia de la calidad y el
                estilo. Cada prenda que encontrarás en nuestra tienda ha sido seleccionada
                cuidadosamente para garantizar la <strong>máxima calidad y satisfacción</strong>.
                Nuestro compromiso con la excelencia se refleja en cada costura y detalle de
                nuestras prendas. Desde los <strong>materiales de alta calidad</strong> hasta los{' '}
                <strong>diseños vanguardistas</strong>, cada artículo ha sido elegido pensando en
                ofrecerte lo mejor de la moda actual. Estamos orgullosos de brindarte una
                experiencia de compra excepcional y productos que te harán sentir confianza y
                elegancia.
              </Text>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={8} h={400}>
            <Box
              flex="1"
              ml={4}
              maxWidth="50%"
              padding="32px"
              fontSize="20px"
              borderRadius="lg"
              background="#e5e5e5"
              boxShadow="lg"
              // boxShadow="10px 10px 47px -17px"
            >
              <Text textAlign="left" fontFamily="Montserrat, sans-serif">
                Explora nuestra colección de moda y déjate cautivar por nuestra{' '}
                <strong>amplia variedad de estilos</strong>. Ya sea que busques un atuendo casual y
                relajado, una elegante noche de gala o prendas cómodas para el día a día, tenemos{' '}
                <strong>todo lo que necesitas</strong>. Nuestros productos van desde vestidos y
                blusas hasta pantalones, faldas y accesorios de moda. Cada artículo ha sido{' '}
                <strong>cuidadosamente seleccionado</strong> para ofrecerte las últimas tendencias y
                los diseños más atractivos. En <strong>Modern Fashion</strong>, la moda es más que
                ropa, es una expresión de tu personalidad y estilo único.
              </Text>
            </Box>

            <Box flex="1" ml={4} display="flex">
              {/* Review 1 */}
              <Box flex="1" mr={2}>
                <Box
                  // bg="white"
                  bg="rgba(240, 240, 240, 0.8)"
                  borderRadius="md"
                  boxShadow="md"
                  padding={4}
                  textAlign="center"
                  position="relative"
                  // left="20%"
                  ml="6"
                  w="350px"
                  h="200px"
                >
                  <Box display="flex" alignItems="center">
                    <Image
                      src={users.image[0]}
                      alt="User Image"
                      borderRadius="full"
                      w="70px"
                      h="70px"
                      objectFit="cover"
                      // position="absolute"
                      // top={4}
                      // left={4}
                    />

                    <Text mb="0" ml="4">
                      {users.name[0]}
                    </Text>

                    <Box
                      display="flex"
                      position="absolute"
                      right="4"
                      color="blue.500"
                      fontWeight="bold"
                    >
                      <StarRating value={5} />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box>
                      <Box mt="6" ml="4">
                        <Text mb="0" textAlign="left">
                          {users.comment[0]}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Review 2 */}
              <Box flex="1" ml={2}>
                <Box
                  // bg="white"
                  bg="rgba(240, 240, 240, 0.8)"
                  borderRadius="md"
                  boxShadow="md"
                  padding={4}
                  textAlign="center"
                  position="relative"
                  ml="4"
                  // right="-10%"
                  w="350px"
                  h="200px"
                >
                  <Box display="flex" alignItems="center">
                    <Image
                      src={users.image[1]}
                      alt="User Image"
                      borderRadius="full"
                      w="70px"
                      h="70px"
                      objectFit="cover"
                      // position="absolute"
                      // top={4}
                      // left={4}
                    />

                    <Text mb="0" ml="4">
                      {users.name[1]}
                    </Text>

                    <Box
                      display="flex"
                      position="absolute"
                      right="4"
                      color="blue.500"
                      fontWeight="bold"
                    >
                      <StarRating value={5} />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box>
                      <Box mt="6" ml="4">
                        <Text mb="0" textAlign="left">
                          {users.comment[1]}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Button
        onClick={handleScrollToTop}
        variant="solid"
        colorScheme="blue"
        borderRadius="full"
        size="xl"
        position="fixed"
        bottom="16"
        right="16"
        boxShadow="lg"
        zIndex="999"
        p={4}
      >
        <ChevronUpIcon boxSize={6} />
      </Button>
    </Box>
  );
}

export default Landing;
