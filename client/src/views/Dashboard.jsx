import { Navbar } from '../components/index';

import { Box } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Dashboard() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Navbar />
      
    </Box>
  );
}

export default Dashboard;
