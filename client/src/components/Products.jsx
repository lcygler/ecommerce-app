import { Box, Grid, Heading, Image, Text } from '@chakra-ui/react';
import data from '../data.json';
import { Product } from './index';

function Products() {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={6} p={10}>
      {data.map((item) => (
        // <Product key={item.id} item={item} />
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={item.id}>
          <Image src={item.image} alt={item.name} />
          <Box p="6">
            <Heading as="h2" size="md">
              {item.name}
            </Heading>
            <Text mt="2" fontSize="md">
              {item.description}
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default Products;
