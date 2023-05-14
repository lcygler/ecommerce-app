import { Product } from './index';

import { Grid } from '@chakra-ui/react';
// import data from '../data.json';

function Products({ currentProducts }) {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }} gap={6} p={10}>
      {currentProducts?.map(
        ({ id, name, price, category, description, gender, season, size, image, discount }) => (
          <Product
            key={id}
            id={id}
            name={name}
            price={price}
            category={category}
            description={description}
            gender={gender}
            season={season}
            size={size}
            image={image}
            discount={discount}
          />
        )
      )}
    </Grid>
  );
}

export default Products;
