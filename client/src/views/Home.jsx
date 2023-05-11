import { Box } from '@chakra-ui/react';
import { Navbar, Products } from '../components/index';

function Home() {
  return (
    <Box flexDirection="column">
      <Navbar width="100%" />
      <Products />
    </Box>
  );
}

export default Home;
