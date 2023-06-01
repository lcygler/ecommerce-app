import React, { useEffect, useRef, useState } from 'react';

import { SettingsIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/slice';
import { Pagination } from './index';

const UsersTable = ({ users, filteredUsers, deleteUser, suspendUser }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userId, setUserId] = useState(null);

  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);

  const totalPages = Math.ceil((filteredUsers || users)?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = (filteredUsers || users)?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(actions.setCurrentPage(pageNumber));
  };

  const handleDeleteUser = () => {
    deleteUser(userId);
    onClose();
  };
  return (
    <>
      <UserFilters users={users} changePage={changePage} />
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
              <Th>Status</Th>
              <Th>Admin</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers?.map(
              ({
                id,
                name,
                lastname,
                username,
                email,
                birthdate,
                phoneNumber,
                disable,
                isAdmin,
              }) => (
                <Tr key={id} _hover={{ backgroundColor: 'whitesmoke' }}>
                  <Td>{name}</Td>
                  <Td>{lastname}</Td>
                  <Td>{username}</Td>
                  <Td>{email}</Td>
                  <Td>{new Date(birthdate).toLocaleDateString('es-AR')}</Td>
                  <Td isNumeric>{phoneNumber}</Td>
                  <Td>
                    <Switch
                      isChecked={!disable}
                      onChange={() => {
                        suspendUser({
                          userId: id,
                          updatedUser: { disable: !disable },
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

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
      <Flex justifyContent={'center'}>
        <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
      </Flex>
    </>
  );
};

export default UsersTable;

const UserFilters = ({ users, changePage }) => {
  const dispatch = useDispatch();
  const namesInUsers = [...new Set(users.map((user) => user.name))];
  const lastnamesInUsers = [...new Set(users.map((user) => user.lastname))];
  const emailsInusers = [...new Set(users.map((user) => user.email))];
  const usernamesInUsers = [...new Set(users.map((user) => user.username))];
  const birthdatesInUsers = [...new Set(users.map((user) => user.birthdate))];
  const phonenumbersInUsers = [...new Set(users.map((user) => user.phoneNumber))];
  // const statusInUsers = [...new Set(users.map((user) => user.disable))];
  // const adminsInUsers = [...new Set(users.map((user) => user.isAdmin))];

  const name = useSelector((state) => state.name);
  const lastname = useSelector((state) => state.lastname);
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const birthdate = useSelector((state) => state.birthdate);
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const disable = useSelector((state) => state.disable);
  const admin = useSelector((state) => state.admin);

  const nameSelect = useRef(null);
  const lastnameSelect = useRef(null);
  const usernameSelect = useRef(null);
  const emailSelect = useRef(null);
  const birthdateSelect = useRef(null);
  const phoneNumberSelect = useRef(null);
  const statusSelect = useRef(null);
  const adminSelect = useRef(null);

  useEffect(() => {
    nameSelect.current.value = name;
    lastnameSelect.current.value = lastname;
    usernameSelect.current.value = username;
    emailSelect.current.value = email;
    birthdateSelect.current.value = birthdate;
    phoneNumberSelect.current.value = phoneNumber;
    statusSelect.current.value = disable;
    adminSelect.current.value = admin;
  }, [name, lastname, username, email, birthdate, phoneNumber, disable, admin]);

  const handleFilters = (e) => {
    const { name: selectName, value: selectValue } = e.target;
    if (selectName === 'name') {
      dispatch(actions.updateNameFilter(selectValue));
    } else if (selectName === 'lastname') {
      dispatch(actions.updateLastnameFilter(selectValue));
    } else if (selectName === 'username') {
      dispatch(actions.updateUsernameFilter(selectValue));
    } else if (selectName === 'email') {
      dispatch(actions.updateEmailFilter(selectValue));
    } else if (selectName === 'birthdate') {
      dispatch(actions.updateBirthdateFilter(selectValue));
    } else if (selectName === 'phoneNumber') {
      dispatch(actions.updatePhoneNumberFilter(selectValue));
    } else if (selectName === 'status') {
      dispatch(actions.updateStatusFilter(selectValue));
    } else if (selectName === 'admin') {
      dispatch(actions.updateAdminFilter(selectValue));
    }
    dispatch(actions.filterUsers());
    changePage(1);
  };

  const handleReset = () => {
    dispatch(actions.resetUsersFilters());
    dispatch(actions.filterUsers());
    changePage(1);
  };

  return (
    <Flex justifyContent={'center'}>
      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={nameSelect} name="name" onChange={handleFilters}>
          <option value="">All Names</option>
          {namesInUsers.map((item, id) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="160px">
        <Select ref={lastnameSelect} name="lastname" onChange={handleFilters}>
          <option value="">All Last Names</option>
          {lastnamesInUsers.map((item, id) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={usernameSelect} name="username" onChange={handleFilters}>
          <option value="">All Usernames</option>
          {usernamesInUsers.map((item, id) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={emailSelect} name="email" onChange={handleFilters}>
          <option value="">All Emails</option>
          {emailsInusers.map((item, id) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={birthdateSelect} name="birthdate" onChange={handleFilters}>
          <option value="">All Birthdates</option>
          {birthdatesInUsers.map((item, id) => (
            <option key={id} value={item}>
              {new Date(item).toLocaleDateString('es-AR')}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={phoneNumberSelect} name="phoneNumber" onChange={handleFilters}>
          <option value="">All Phones</option>
          {phonenumbersInUsers.map((item, id) => (
            <option key={id} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={statusSelect} name="status" onChange={handleFilters}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </Select>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" ml="4" maxW="150px">
        <Select ref={adminSelect} name="admin" onChange={handleFilters}>
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </Select>
      </Box>

      {/* <Box display="flex" alignItems="center" justifyContent="center" ml="4">
        <Select ref={statusSelect} name="state" onChange={handleFilters}>
          <option value="">All status</option>
          {statusInUsers.map((item, id) => {
            if (item) {
              return (
                <option key={id} value={item}>
                  Active
                </option>
              );
            } else {
              return (
                <option key={id} value={item}>
                  Not active
                </option>
              );
            }
          })}
        </Select>
      </Box> */}

      {/* <Box display="flex" alignItems="center" justifyContent="center" ml="4">
        <Select ref={adminSelect} name="admin" onChange={handleFilters}>
          <option value="">All roles</option>
          {adminsInUsers.map((item, id) => (
            <option key={id} value={item}>
              {item ? 'User' : 'Admin'}
            </option>
          ))}
        </Select>
      </Box> */}

      <Box display="flex" alignItems="center" justifyContent="center" ml="4">
        <Button onClick={handleReset} variant="outline">
          Reset Filters
        </Button>
      </Box>
    </Flex>
  );
};
