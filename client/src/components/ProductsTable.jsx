import { useEffect, useState } from 'react';

import { SettingsIcon } from '@chakra-ui/icons';
import {
  Fade,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

function ProductTable({ products }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [products]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <TableContainer marginTop={5} overflowY="auto">
      <Table variant="simple">
        <TableCaption marginBottom="4">Products table</TableCaption>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Size</Th>
            <Th>Stock</Th>
            <Th isNumeric>Price</Th>
            <Th>Discount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map(
            ({
              id,
              name,
              price,
              Categories,
              description,
              gender,
              Seasons,
              size,
              image,
              discounts,
              stock,
              status,
            }) => (
              <Tr key={id} _hover={{ backgroundColor: 'whitesmoke' }}>
                <Td>
                  <Fade in={isImageLoaded}>
                    <Image
                      boxSize="100px"
                      objectFit="contain"
                      src={image}
                      fallbackSrc="https://via.placeholder.com/100"
                      alt={name}
                      onLoad={handleImageLoad}
                    />
                  </Fade>
                </Td>
                <Td>{name}</Td>
                <Td>{description}</Td>
                <Td>{size}</Td>
                <Td>{stock}</Td>
                <Td isNumeric>${price.toFixed(2)}</Td>
                <Td>{discounts * 100}%</Td>
                <Td>{status ? <Switch isChecked /> : <Switch />}</Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <SettingsIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                      <MenuItem>Suspend</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
