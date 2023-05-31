import { Flex, Text } from '@chakra-ui/react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return (
    <Flex alignItems="center">
      <Text mb="0" mr="2">
        {value}
      </Text>
      <Flex>{stars}</Flex>
    </Flex>
  );
};

export default StarRating;
