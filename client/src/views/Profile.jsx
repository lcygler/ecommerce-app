import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Image, Text, Badge } from '@chakra-ui/react';
import { getUserById } from '../redux/asyncActions';
import { Link } from 'react-router-dom';

function Profile() {
  const userID = localStorage.getItem('userId');
  const selectedUser = useSelector(state => state.selectedUser);

  const dispatch = useDispatch();
  const { name, email, image, address, birthdate, country, lastname, phoneNumber, postalCode } = selectedUser;

  useEffect(() => {
    if (userID) {
      dispatch(getUserById(userID));
    }
  }, [userID, dispatch]);

  const handleEditProfile = () => {
    // Lógica para editar el perfil del usuario
  };

  const handleEditAddress = () => {
    // Lógica para editar la dirección del usuario
  };

  const handleHelp = () => {
    // Lógica para acceder a la sección de ayuda
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const renderProfileImage = () => {
    if (image && image) {
      return <Image src={image} alt="User Profile" borderRadius="full" boxSize="150px" mb="2" />;
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
      <Flex flexDirection="column" alignItems="center" p="4" borderWidth="1px" borderRadius="md">
        {renderProfileImage()}
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {name} {lastname}
        </Text>
        <Text fontSize="md" mb="2">
          Email: {email}
        </Text>
        <Text fontSize="md" mb="2">
          Birthdate: <Badge colorScheme="teal">{birthdate ? formatDate(birthdate) : ''}</Badge>
        </Text>
        <Text fontSize="md" mb="2">
          Country: {country}
        </Text>
        <Text fontSize="md" mb="2">
          Phone Number: {phoneNumber}
        </Text>
        <Button colorScheme="blue" onClick={handleEditProfile} mb="2">
          Edit Profile
        </Button>
      </Flex>

      <Box mt="4" p="4" borderWidth="1px" borderRadius="md">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          Address
        </Text>
        <Text fontSize="md" mb="2">
          {address}
        </Text>
        <Text fontSize="md" mb="2">
          Postal Code: {postalCode}
        </Text>
        <Button colorScheme="blue" onClick={handleEditAddress} mb="2">
          <Link to={'/profile/edit'}>Edit Address</Link>
        </Button>
      </Box>

      <Box mt="4">
        <Button colorScheme="blue" onClick={handleHelp}>
          Help
        </Button>
        <Button colorScheme="blue" margin={"12px"}><Link to={'/home'}>Home</Link></Button>
      </Box>
    </Box>
  );
}

export default Profile;
