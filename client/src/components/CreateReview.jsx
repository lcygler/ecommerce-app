import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createReview } from '../redux/asyncActions';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  // ModalFooter,
  // ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

function CreateReview({ productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Obtener el ID de usuario del localStorage si está disponible
    const userId = localStorage.getItem('userId');
    const reviewData = {
      comment,
      punctuation: rating,
      userId,
      productId, // Agregar el ID del producto al objeto de datos de la reseña
    };

    dispatch(createReview(reviewData));

    // Limpiar el formulario después de enviar la reseña
    setComment('');
    setRating(0);
    onClose();
  };

  const isButtonDisabled = !comment || rating < 1;

  return (
    <>
      <Button onClick={onOpen} width="150px" colorScheme="blue" variant="outline">
        Write Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center" alignItems="center" /* minHeight="10vh" */>
              <Box width="100%" bg="white" borderRadius="lg" p="4">
                <Heading as="h2" size="lg" my="4" textAlign="center">
                  Write Review
                </Heading>

                <Stack spacing="4">
                  <Flex alignItems="center" my="2">
                    <Box mr="4">
                      <Text mb="0">Rating:</Text>
                    </Box>

                    <Box>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Icon
                          key={value}
                          as={FaStar}
                          boxSize={6}
                          color={value <= rating ? 'blue.500' : 'gray.300'}
                          cursor="pointer"
                          onClick={() => handleRatingChange(value)}
                          mr="2px"
                        />
                      ))}
                    </Box>
                  </Flex>

                  <Flex flexDirection="column" alignItems="center">
                    <Textarea
                      value={comment}
                      placeholder="Write your comment..."
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <Button
                      colorScheme="blue"
                      onClick={handleSubmit}
                      width="150px"
                      isDisabled={isButtonDisabled}
                      mt="6"
                    >
                      Submit Review
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateReview;
