import { Box, Button } from '@chakra-ui/react';
import React from 'react';

function Sidebar({ handleSidebarOption, selectedOption }) {
  return (
    <Box width="200px" backgroundColor="white" padding="4" display="flex" flexDirection="column">
      <Button
        mb="6"
        onClick={() => handleSidebarOption('products')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'products' ? 'blue.100' : 'gray.150'}
      >
        Products
      </Button>

      <Button
        mb="6"
        onClick={() => handleSidebarOption('users')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'users' ? 'blue.100' : 'gray.150'}
      >
        Users
      </Button>

      <Button
        mb="6"
        onClick={() => handleSidebarOption('sales')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'sales' ? 'blue.100' : 'gray.150'}
      >
        Sales
      </Button>

      <Button
        mb="6"
        onClick={() => handleSidebarOption('reviews')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'reviews' ? 'blue.100' : 'gray.150'}
      >
        Reviews
      </Button>

      <Button
        mb="6"
        onClick={() => handleSidebarOption('charts')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'charts' ? 'blue.100' : 'gray.150'}
      >
        Metrics
      </Button>
    </Box>
  );
}

export default Sidebar;
