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
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

function CrearReviews({ productId }) {
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

    console.log(reviewData);

    dispatch(createReview(reviewData));

    // Limpiar el formulario después de enviar la reseña
    setComment('');
    setRating(0);
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Box maxW="400px" width="100%" bg="white" borderRadius="lg" p="10">
        <Heading as="h2" size="lg" mb="4" textAlign="center">
          Create a Review
        </Heading>
        <Stack spacing="4">
          <Flex alignItems="center">
            <Text>Rating:</Text>
            <Box ml="2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Icon
                  key={value}
                  as={FaStar}
                  color={value <= rating ? 'blue.500' : 'gray.300'}
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
          <Button colorScheme="blue" onClick={handleSubmit} width="100%">
            Submit Review
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export default CrearReviews;
