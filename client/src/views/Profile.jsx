import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../redux/asyncActions';

import { Navbar } from '../components/index';

import { Badge, Box, Button, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/background.jpg';
import defaultProfileImage from '../assets/images/default-profile.png';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = localStorage.getItem('userId');
  const selectedUser = useSelector((state) => state.selectedUser);

  const {
    name,
    lastname,
    email,
    birthdate,
    phoneNumber,
    image,
    address,
    postalCode,
    state,
    country,
  } = selectedUser.user || {};

  useEffect(() => {
    if (userID) {
      dispatch(getUserById(userID));
    }
  }, [dispatch, userID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const renderProfileImage = () => {
    if (image && image !== '') {
      return (
        <Image
          src={image}
          alt="Avatar"
          borderRadius="full"
          boxSize="150px"
          mb="12"
          boxShadow="lg"
        />
      );
    } else {
      return (
        <Image
          src={defaultProfileImage}
          alt="Avatar"
          borderRadius="full"
          boxSize="150px"
          mb="12"
          boxShadow="lg"
        />
        // <Box width="150px" height="150px" borderRadius="full" backgroundColor="gray.200" mb="6" />
      );
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          easing: 'ease-in-out',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          // minHeight="100vh"
          height={`calc(100vh - 70px)`}
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          backgroundRepeat="no-repeat"
        >
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
              minWidth="xl"
              // maxWidth="700px"
              boxSizing="border-box"
            >
              <Heading size="lg" mb={6} textAlign="center">
                User Profile
              </Heading>

              <Box display="flex" justifyContent="center">
                <Flex flexDirection="column" alignItems="center" p="4">
                  {renderProfileImage()}

                  <Flex justifyContent="center" alignItems="center" mb="4">
                    <Box>
                      {/* <Text fontWeight="bold" fontSize="xl">
                        User Information
                      </Text> */}

                      <Badge colorScheme="blue" fontSize="md" mb="4">
                        User Information
                      </Badge>

                      <Text fontSize="md" mb="4">
                        <strong>Name:</strong> {name ? name : 'N/A'}{' '}
                        {name && lastname ? lastname : ''}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>Email:</strong> {email ? email : 'N/A'}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>Birthdate:</strong> {birthdate ? formatDate(birthdate) : 'N/A'}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>Phone Number:</strong> {phoneNumber ? phoneNumber : 'N/A'}
                      </Text>
                    </Box>

                    <Divider orientation="vertical" mx="8" />

                    <Box>
                      {/* <Text fontWeight="bold" fontSize="xl">
                        Location
                      </Text> */}

                      <Badge colorScheme="blue" fontSize="md" mb="4">
                        Location
                      </Badge>

                      <Text fontSize="md" mb="4">
                        <strong>Address:</strong> {address ? address : 'N/A'}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>Postal Code:</strong> {postalCode ? postalCode : 'N/A'}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>State:</strong> {state ? state : 'N/A'}
                      </Text>

                      <Text fontSize="md" mb="4">
                        <strong>Country:</strong> {country ? country : 'N/A'}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>

              <Flex justifyContent="center">
                <Button margin={'0 12px 0 0'} w="150px" onClick={() => navigate(-1)}>
                  Go Back
                </Button>

                <Button colorScheme="blue" w="150px" onClick={() => navigate('/profile/edit')}>
                  Edit Profile
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}

export default Profile;
