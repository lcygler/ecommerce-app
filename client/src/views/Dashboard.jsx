import { CreateProduct } from '../components/index';

import { Navbar } from '../components/index';

import { Box } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Dashboard() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Navbar />
      <CreateProduct />
    </Box>
  );
}

export default Dashboard;
