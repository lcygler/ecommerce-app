import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { StarRating } from './index';

function ReviewCard({ punctuation, comment }) {
  return (
    <Box bg="white" borderRadius="md" p="4" mb="4" boxShadow="md" width="50%" mx="auto">
      <Box color="blue.500" fontWeight="bold" fontSize="lg" mb="2">
        <StarRating value={punctuation}/>
      </Box>
      <Text color="gray.600" fontSize="sm">
        {comment}
      </Text>
    </Box>
  );
}

export default ReviewCard;
