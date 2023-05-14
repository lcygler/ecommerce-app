import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Heading, Link } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Landing() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={4}
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      // bgGradient="linear(to bottom right, #1D4ED8, #34D399)"
    >
      <Box
        textAlign="center"
        bg="white"
        borderRadius="md"
        boxShadow="md"
        px={8}
        py={12}
        maxW="lg"
        w="full"
      >
        <Heading as="h1" size="xl" mb="10" color="black">
          Welcome to Khaki Store!
        </Heading>
        <Link as={RouterLink} to="/home">
          <Button colorScheme="blue" size="lg">
            Shop Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Landing;
