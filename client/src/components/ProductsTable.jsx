import { useDispatch } from 'react-redux';
import { deleteProductById, updateProductById } from '../redux/asyncActions';

import { SettingsIcon } from '@chakra-ui/icons';
import {
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
  const dispatch = useDispatch();
  const handleEdit = (id) => {
    // TODO hacer logica aqui
  }

  const handleDelete = (id) => {
    dispatch(deleteProductById(id))
  }

  const handleSuspend = (id, status) => {
    dispatch(updateProductById(id, {disable: !status}))
  }

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
              disable,
            }) => (
              <Tr key={id} _hover={{ backgroundColor: 'whitesmoke' }}>
                <Td>
                  <Image
                    boxSize="100px"
                    objectFit="contain"
                    src={image}
                    fallbackSrc="https://via.placeholder.com/100"
                    alt={name}
                  />
                </Td>
                <Td>{name}</Td>
                <Td>{description}</Td>
                <Td>{size}</Td>
                <Td>{stock}</Td>
                <Td isNumeric>${price.toFixed(2)}</Td>
                <Td>{discounts * 100}%</Td>
                <Td>{disable ? <Switch onChange={() => handleSuspend(id, disable)} /> : <Switch onChange={() => handleSuspend(id,disable)} isChecked/>}</Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <SettingsIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
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
