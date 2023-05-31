import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { StarRating } from './index';

function ReviewCard({ comment, punctuation }) {
  return (
    <Box bg="white" borderRadius="md" p="4" my="2" boxShadow="md" width="100%">
      <Box color="blue.500" fontWeight="bold" fontSize="lg" mb="2">
        <StarRating value={punctuation} />
      </Box>
      <Text color="gray.600" fontSize="sm">
        {comment}
      </Text>
    </Box>
  );
}

export default ReviewCard;
