import React from 'react';
import { Box, Button } from '@chakra-ui/react';

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
        onClick={() => handleSidebarOption('create-admin')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'create-admin' ? 'blue.100' : 'gray.150'}
      >
        Create Admin
      </Button>
      <Button
        mb="6"
        onClick={() => handleSidebarOption('ventas')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'ventas' ? 'blue.100' : 'gray.150'}
      >
        Ventas
      </Button>
      <Button
        mb="6"
        onClick={() => handleSidebarOption('charts')}
        colorScheme="blue"
        variant="outline"
        backgroundColor={selectedOption === 'charts' ? 'blue.100' : 'gray.150'}
      >
        Charts
      </Button>
    </Box>
  );
}

export default Sidebar;
