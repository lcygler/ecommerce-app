import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../redux/asyncActions';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Icon, 
  Stack, 
  Text, 
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
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
      <Button onClick={onOpen}>leave comment</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center" alignItems="center" minHeight="10vh">
              <Box maxW="400px" width="100%" bg="white" borderRadius="lg" p="10">
                <Heading as="h2" size="lg" mb="4" textAlign="center">
                  Create a Review
                </Heading>
                <Stack spacing="4">
                  <Flex alignItems="center">
                    <Text h="30px">Rating:</Text>
                    <Box ml="5">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Icon
                          key={value}
                          as={FaStar}
                          w="20px"
                          h="20px"
                          color={
                            value <= rating
                              ? value === 1
                                ? 'red.400'
                                : value === 2
                                ? 'orange.500'
                                : value === 3
                                ? 'yellow.500'
                                : value === 4
                                ? 'green.200'
                                : 'green.500'
                              : 'gray.300'
                          }
                          cursor="pointer"
                          onClick={() => handleRatingChange(value)}
                        />
                      ))}
                    </Box>
                  </Flex>
                  <Textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    width="100%"
                    isDisabled={isButtonDisabled}
                  >
                    Submit Review
                  </Button>
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
