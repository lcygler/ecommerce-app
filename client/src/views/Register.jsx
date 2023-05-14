import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/asyncActions';
import { validateForm } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import backgroundImage from '../assets/images/background.jpg';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    birthdate: '',
    phone: '',
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
    phone: '',
    address: '',
    postalCode: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = (e) => {
    const { form } = e.target;

    const formFields = {};
    for (const element of form.elements) {
      if (element.name) {
        formFields[element.name] = element.value;
      }
    }

    validateForm(formFields, errors, setErrors);
    // validateForm(formFields, errors, setErrors, AllProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && Object.values(errors).every((error) => error === '')) {
      const newUser = {
        name: formData.name.trim().charAt(0).toUpperCase() + formData.name.trim().slice(1),
        lastname:
          formData.lastname.trim().charAt(0).toUpperCase() + formData.lastname.trim().slice(1),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        passwordCheck: formData.passwordCheck.trim(),
        birthdate: formData.birthdate,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        postalCode: Math.floor(formData.postalCode),
        state: formData.state.trim(),
        country: formData.country.trim(),
      };

      dispatch(createUser(newUser));

      setFormData({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordCheck: '',
        birthdate: '',
        phone: '',
        address: '',
        postalCode: '',
        state: '',
        country: '',
      });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration successful');
      navigate('/home');
    }, 2000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box bg="white" boxShadow="lg" borderRadius="md" mx="auto" p={6} maxW="lg">
        {error && (
          <Alert status="error" marginBottom={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Stack direction="column" spacing={4}>
          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your first name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.passwordCheck}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Birthdate</FormLabel>
              <Input
                type="date"
                placeholder="Enter your birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Postal code</FormLabel>
              <Input
                type="number"
                placeholder="Enter your postal code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
        </Stack>

        <Stack direction="column" spacing={4} mt="20px">
          <Stack direction="row" spacing={4}>
            <Button
              width="100%"
              onClick={() => {
                navigate('/home');
              }}
            >
              Go back
            </Button>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Registering..."
              width="100%"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Stack>

          <Box textAlign="center" marginTop={4} fontSize="sm">
            <Text>
              Already registered?{' '}
              <Link as={RouterLink} to="/login" color="blue.500" textDecoration="underline">
                Click here to log in
              </Link>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Register;
