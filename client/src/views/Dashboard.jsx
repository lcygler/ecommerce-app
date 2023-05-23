import { useSelector } from 'react-redux';

import { CreateProduct, Navbar } from '../components/index';

import { Box } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Dashboard() {
  const isAdmin = useSelector((state) => state.isAdmin);

  if (!isAdmin) {
    return <Box></Box>;
  }

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
