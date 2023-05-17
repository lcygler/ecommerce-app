import { Product } from './index';

import { Grid } from '@chakra-ui/react';

function Products({ currentProducts }) {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }} gap={6} p={10}>
      {currentProducts?.map(
        ({ id, name, price, Categories, description, gender, Seasons, size, image, discounts }) => (
          <Product
            key={id}
            id={id}
            name={name}
            price={price}
            Categories={Categories}
            description={description}
            gender={gender}
            Seasons={Seasons}
            size={size}
            image={image}
            discounts={discounts}
          />
        )
      )}
    </Grid>
  );
}

export default Products;
