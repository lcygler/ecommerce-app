import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Image, Text, Badge } from '@chakra-ui/react';
import { getUserById } from '../redux/asyncActions';
import { Link } from 'react-router-dom';

import { Navbar } from '../components/index';

import { AddIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';
import backgroundImage from '../assets/images/background.jpg';

function Profile() {
  const userID = localStorage.getItem('userId');
  const selectedUser = useSelector((state) => state.selectedUser);
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
      return (
        <Image src={image} alt="User Profile" borderRadius="full" boxSize="150px" mb="2" />
      );
    } else {
      return (
        <Box width="150px" height="150px" borderRadius="full" backgroundColor="gray.200" mb="2" />
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my="10"
      >
        <Box
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          mx="auto"
          p={8}
          width="90%"
          maxWidth="700px"
          boxSizing="border-box"
        >
          <Heading size="lg" mb={6} textAlign="center">
            User Profile
          </Heading>

         <Box display='flex' justifyContent='center'>
         <Flex flexDirection="column"  alignItems="center" p="4" >
            {renderProfileImage()}
          <Flex>
          <Box mr="150px" >
           <Text fontWeight="bold" fontSize="xl" mb="2">
              {name} {lastname}
            </Text>
            <Text fontSize="md" mb="2">
              <strong>Email:</strong> <Badge colorScheme='teal'>{email}</Badge>
            </Text>
            <Text fontSize="md" mb="2">
              <strong>Birthdate:</strong> <Badge colorScheme="teal">{birthdate ? formatDate(birthdate) : ''}</Badge>
            </Text>
            
            <Text fontSize="md" mb="2">
              <strong>Phone Number:</strong> <Badge colorScheme='teal'>{phoneNumber}</Badge>
            </Text>
           </Box>
           <Box>
           <Text fontWeight="bold" fontSize="xl" >
            Address
          </Text>
          <Text fontSize="md" mb="2">
            <strong>street:</strong> <Badge colorScheme='teal'>{address}</Badge>
          </Text>
          <Text fontSize="md" mb="4">
            <strong>Postal Code:</strong> <Badge colorScheme='teal'>{postalCode}</Badge>
          </Text>
          <Text fontSize="md" mb="2">
              <strong>Country:</strong> <Badge colorScheme='teal'>{country}</Badge>
            </Text>
           </Box>
          </Flex>
          </Flex>

         </Box>
         
          <Flex justifyContent="center" mt="4">
            <Button as={Link} to="/home" margin={"0 12px 0 0"} colorScheme="teal" variant="outline">
              Go Back
            </Button>
            <Button as={Link} to="/profile/edit" colorScheme="blue" onClick={handleEditAddress}>
              Edit Address
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;