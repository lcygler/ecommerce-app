import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import ChartBar from './ChartBar';
import ChartLine from './ChartLine';

function Charts({ dataCharts }) {
  const { salesPerMonth, monthlyUserRegistration } = dataCharts;

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" mt="9">
      <Box mx="10" my="10" width="700px" height="500px">
        <Text fontSize="xl" mb="6">
          Sales Per Month:
        </Text>
        <ChartBar data={salesPerMonth} />
      </Box>

      <Box mx="10" my="10" width="700px" height="500px">
        <Text fontSize="xl" mb="6">
          Monthly User Registration:
        </Text>
        <ChartLine data={monthlyUserRegistration} />
      </Box>
    </Box>
  );
}

export default Charts;
