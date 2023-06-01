import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../redux/slice';
import { Pagination } from './index';

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
} from '@chakra-ui/react';

function ReviewsTable({ allReviews, suspendReview, deleteReview }) {
  const dispatch = useDispatch();
  const [reviewId, setReviewId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const currentPage = useSelector((state) => state.currentPage);
  const [itemsPerPage] = useState(10);

  const totalPages = Math.ceil(allReviews?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = allReviews?.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(actions.setCurrentPage(pageNumber));
  };

  const handleDeleteReview = () => {
    deleteReview(reviewId);
    onClose();
  };

  return (
    <>
      <TableContainer marginTop={5} overflowY="auto">
        <Table variant="simple">
          <TableCaption marginBottom="4">Reviews table</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Comment</Th>
              <Th>Punctuation</Th>
              <Th>Status</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentReviews?.map(({ id, comment, punctuation, disable }) => (
              <Tr key={id} _hover={{ backgroundColor: 'whitesmoke' }}>
                <Td>{id}</Td>
                <Td>{comment}</Td>
                <Td>{punctuation.toFixed(1)}</Td>
                <Td>
                  <Switch
                    isChecked={!disable}
                    onChange={() => {
                      suspendReview({ reviewId: id, updatedReview: { disable: !disable } });
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
                          setReviewId(id);
                          onOpen();
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay backgroundColor="transparent">
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Review
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteReview} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt="4">
        <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
      </Box>
    </>
  );
}

export default ReviewsTable;
