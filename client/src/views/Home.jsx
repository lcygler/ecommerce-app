import { Navbar, Products } from '../components/index';

import { Box } from '@chakra-ui/react';

function Home() {
  return (
    <Box flexDirection="column">
      <Navbar width="100%" />
      <Products />
    </Box>
  );
}

export default Home;
