import { Box, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

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

        <Button colorScheme="blue" onClick={handleClick}>
          Home
        </Button>
      </Box>
    </Box>
  );
}

export default Landing;
