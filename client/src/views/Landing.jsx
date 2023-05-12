import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Heading, Link } from '@chakra-ui/react';

function Landing() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, cyan.300, blue.500)"
      minHeight="100vh"
    >
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb="4" color="white">
          Bienvenido
        </Heading>

        <Link as={RouterLink} to="/home">
          <Button colorScheme="blue">Home</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Landing;
