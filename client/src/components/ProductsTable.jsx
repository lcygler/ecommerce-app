import { SettingsIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

function ProductTable({
  products,
  editProduct,
  deleteProduct,
  suspendProduct,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
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
              <Tr key={id} _hover={{ backgroundColor: "whitesmoke" }}>
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
                <Td>
                  {!disable ? (
                    <Switch
                      onChange={() => suspendProduct({ id: id, disable: true })}
                      isChecked
                    />
                  ) : (
                    <Switch
                      onChange={() =>
                        suspendProduct({ id: id, disable: false })
                      }
                    />
                  )}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <SettingsIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => editProduct(id)}>Edit</MenuItem>
                      <MenuItem colorScheme="red" onClick={onOpen}>
                        Delete
                      </MenuItem>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay backgroundColor="transparent">
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Product
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  deleteProduct(id);
                                  onClose();
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
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
