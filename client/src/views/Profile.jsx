import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@chakra-ui/react';

function Profile() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box>Profile Page</Box>
      <Button colorScheme="blue" onClick={() => navigate('/profile/edit')}>
        Edit Profile
      </Button>
    </Box>
  );
}

export default Profile;
