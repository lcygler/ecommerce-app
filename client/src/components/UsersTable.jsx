import { useRef, useState } from "react";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
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

const UsersTable = ({ users, deleteUser, suspendUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userId, setUserId] = useState(null);

  const handleDeleteUser = () => {
    deleteUser(userId);
    onClose();
  };
  return (
    <TableContainer marginTop={5} overflowY="auto">
      <Table variant="simple">
        <TableCaption marginBottom="4">Users table</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Last Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Birthdate</Th>
            <Th isNumeric>Phone Number</Th>
            <Th>State</Th>
            <Th>Admin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map(
            ({
              id,
              name,
              lastname,
              username,
              email,
              birthdate,
              phoneNumber,
              state,
              isAdmin,
            }) => (
              <Tr key={id} _hover={{ backgroundColor: "whitesmoke" }}>
                <Td>{name}</Td>
                <Td>{lastname}</Td>
                <Td>{username}</Td>
                <Td>{email}</Td>
                <Td>{new Date(birthdate).toLocaleDateString("es-AR")}</Td>
                <Td isNumeric>${phoneNumber}</Td>
                <Td>
                  <Switch
                    isChecked={state}
                    onChange={() => {
                      suspendUser({
                        userId: id,
                        updatedUser: { state: !state },
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Switch
                    isChecked={isAdmin}
                    onChange={() => {
                      suspendUser({
                        userId: id,
                        updatedUser: { isAdmin: !isAdmin },
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as="button">
                      <SettingsIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        colorScheme="red"
                        onClick={() => {
                          setUserId(id);
                          onOpen();
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay backgroundColor="transparent">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </TableContainer>
  );
};

export default UsersTable;
