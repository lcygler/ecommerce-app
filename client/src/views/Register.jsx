import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/asyncActions';
import { validateRegister } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.jpg';

let timeoutId = null;
let navigateTimeoutId = null;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    birthdate: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    state: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    birthdate: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleForm = (e) => {
    const { form } = e.target;

    const formFields = {};
    for (const element of form.elements) {
      if (element.name) {
        formFields[element.name] = element.value;
      }
    }

    validateRegister(formFields, errors, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.name && Object.values(errors).every((error) => error === '')) {
      const newUser = {
        name:
          formData.name
            .trim()
            .charAt(0)
            .toUpperCase() + formData.name.trim().slice(1),
        lastname:
          formData.lastname
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        birthdate: formData.birthdate,
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
        postalCode: formData.postalCode.trim(),
        state:
          formData.state
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1),
        country:
          formData.country
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1),
      };

      const response = await dispatch(createUser(newUser));

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        if (response.payload) {
          setError('');
          setSuccess('Registration successful!');
          setFormData({
            name: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            passwordCheck: '',
            birthdate: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            state: '',
            country: '',
          });
          navigateTimeoutId = setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setSuccess('');
          setError('Registration error');
        }
      }, 2000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(navigateTimeoutId);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
    >
      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        mx="auto"
        p={8}
        maxW="lg"
        boxSizing="border-box"
      >
        <Heading size="lg" mb="6" w="100%" textAlign="center">
          Register
        </Heading>
        <form onChange={handleForm} onSubmit={handleSubmit}>
          {error && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          {success && (
            <Alert status="success" marginBottom={4}>
              <AlertIcon />
              {success}
            </Alert>
          )}
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.name !== ''}>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.name}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.lastname !== ''}>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.lastname}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.username !== ''}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.username}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.email !== ''}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.email}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.password !== ''}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.passwordCheck !== ''}>
                <FormLabel htmlFor="passwordCheck">Confirm Password</FormLabel>
                <Input
                  id="passwordCheck"
                  name="passwordCheck"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.passwordCheck}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.birthdate !== ''}>
                <FormLabel htmlFor="birthdate">Date of Birth</FormLabel>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  placeholder="Enter your birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.birthdate}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.phoneNumber !== ''}>
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.address !== ''}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.address}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.postalCode !== ''}>
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Enter your postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.postalCode}</FormErrorMessage> */}
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.state !== ''}>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.state}</FormErrorMessage> */}
              </FormControl>

              <FormControl isRequired isInvalid={errors.country !== ''}>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  _focus={{ borderColor: 'blue.500', borderWidth: '2px', boxShadow: 'none' }}
                  _invalid={{ borderColor: 'red.500', borderWidth: '2px', boxShadow: 'none' }}
                />
                {/* <FormErrorMessage>{errors.country}</FormErrorMessage> */}
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="column" mt="25px" /* spacing={4} */>
            <Stack direction="row" justifyContent="center" /* spacing={4} */>
              {/* <Button
                width="100%"
                onClick={() => {
                  navigate(-1);
                  // window.history.back();
                }}
                isDisabled={isLoading}
              >
                Go Back
              </Button> */}

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Registering..."
                width="40%"
              >
                Register
              </Button>
            </Stack>

            <Box textAlign="center" mt={2} fontSize="sm">
              <Text mb="0">
                Have an account?{' '}
                <Link as={RouterLink} to="/login" color="blue.500" textDecoration="underline">
                  Login here
                </Link>
              </Text>
            </Box>
          </Stack>
        </form>
      </Box>

      <Button
        colorScheme="blue"
        variant="ghost"
        size="md"
        rounded="full"
        onClick={() => navigate(-1)}
        position="absolute"
        top="20px"
        left="20px"
        isDisabled={isLoading}
      >
        <Icon as={FaChevronLeft} mr="2" /> Go Back
      </Button>

      <Button
        colorScheme="blue"
        variant="ghost"
        size="md"
        rounded="full"
        onClick={() => navigate('/login')}
        position="absolute"
        top="20px"
        right="20px"
        isDisabled={isLoading}
      >
        Login <Icon as={FaChevronRight} ml="2" />
      </Button>
    </Box>
  );
}

export default Register;
