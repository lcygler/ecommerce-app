import React from 'react';

import { Box, Button, Image, Text } from '@chakra-ui/react';

const SalesDetails = ({ saleData, onClose }) => {
  console.log('saleData', saleData);
  const { id, PurchaseDetails, User } = saleData;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      p={4}
      w="900px"
      mx="auto"
      boxSizing="border-box"
    >
      <Box bg="white" boxShadow="lg" borderRadius="md" p={8} w="600px" boxSizing="border-box">
        <Text fontSize="xx-large" mb={4} textAlign="center" fontWeight="bold">
          Sales Details
        </Text>

        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Sale ID: {id}
        </Text>

        <Box>
          {PurchaseDetails.map(({ id, Product, quantity }) => (
            <Box
              key={id}
              borderBottom="1px solid gray"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              my={2}
              py={2}
            >
              <Box
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '300px',
                  textAlign: 'left',
                }}
              >
                <Text fontWeight="bold">{Product.name}</Text>
                <Text>Price: ${Product.price.toFixed(2)}</Text>
                <Text>Quantity: {quantity}</Text>
                <Text>Total: ${(Product.price * quantity).toFixed(2)}</Text>
              </Box>
              <Image
                src={Product.image}
                alt={Product.name}
                marginRight={4}
                boxSize="100px"
                objectFit="contain"
              />
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={6}>
          <Button colorScheme="gray" onClick={onClose} w="150px">
            Go Back
          </Button>
        </Box>
      </Box>

      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        p={4}
        w="300px"
        boxSizing="border-box"
        ml={4}
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          User Details
        </Text>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Name:
          </Text>
          <Text>{User.name}</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mt={2}>
            Last Name:
          </Text>
          <Text>{User.lastname}</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mt={2}>
            Email:
          </Text>
          <Text>{User.email}</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mt={2}>
            Phone Number:
          </Text>
          <Text>{User.phoneNumber}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SalesDetails;
