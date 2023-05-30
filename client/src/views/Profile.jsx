import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
  const handleEditProfile = () => {
    // Lógica para editar el perfil del usuario
  };

  const handleEditAddress = () => {
    // Lógica para editar la dirección del usuario
  };

  const handleHelp = () => {
    // Lógica para acceder a la sección de ayuda
  };

  const renderProfileImage = () => {
    if (user && user.photo) {
      return <Image src={user.photo} alt="User Profile" borderRadius="full" boxSize="150px" mb="2" />;
    } else {
      return (
        <Box
          width="150px"
          height="150px"
          borderRadius="full"
          backgroundColor="gray.200"
          mb="2"
        ></Box>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop="4">
      <Flex flexDirection="column" alignItems="center">
        {renderProfileImage()}
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {user ? user.name : 'Name'}
        </Text>
        <Text fontSize="md" mb="2">
          Email: {user ? user.email : ''}
        </Text>
        <Button colorScheme="blue" onClick={handleEditProfile} mb="2">
          Edit Profile
        </Button>
      </Flex>

      <Box mt="4">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          Address
        </Text>
        <Text fontSize="md" mb="2">
          {user ? user.address : ''}
        </Text>
        <Button colorScheme="blue" onClick={handleEditAddress} mb="2">
          Edit Address
        </Button>
      </Box>

      <Box mt="4">
        <Button colorScheme="blue" onClick={handleHelp}>
          Help
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;