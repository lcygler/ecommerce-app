import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createUser } from '../redux/asyncActions';
import { validateRegisterData } from '../utils/validateForm';

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

let timeoutId = null;

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

    validateRegisterData(formFields, errors, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.name && Object.values(errors).every((error) => error === '')) {
      const newUser = {
        name: formData.name.trim().charAt(0).toUpperCase() + formData.name.trim().slice(1),
        lastname:
          formData.lastname.trim().charAt(0).toUpperCase() + formData.lastname.trim().slice(1),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        birthdate: formData.birthdate,
        phoneNumber: formData.phoneNumber.trim(),
        address: formData.address.trim(),
        postalCode: Math.floor(formData.postalCode),
        state: formData.state.trim(),
        country: formData.country.trim(),
      };

      const response = await dispatch(createUser(newUser));
      console.log('response');
      console.log(response);
      console.log('response DATA');
      console.log(response);

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        if (response) {
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
          navigate('/home');
          console.log('Register successful');
        } else {
          setError('Invalid user data');
        }
      }, 2000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
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
    >
      <Box bg="white" boxShadow="lg" borderRadius="md" mx="auto" p={6} maxW="lg">
        <form onChange={handleForm} onSubmit={handleSubmit}>
          {error && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.name !== ''}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired isInvalid={errors.lastname !== ''}>
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
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
                />
              </FormControl>

              <FormControl isRequired isInvalid={errors.email !== ''}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
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
                />
              </FormControl>

              <FormControl isRequired isInvalid={errors.passwordCheck !== ''}>
                <FormLabel htmlFor="passwordCheck">Confirm password</FormLabel>
                <Input
                  id="passwordCheck"
                  name="passwordCheck"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequired isInvalid={errors.birthdate !== ''}>
                <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  placeholder="Enter your birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired isInvalid={errors.phoneNumber !== ''}>
                <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
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
                />
              </FormControl>

              <FormControl isRequired isInvalid={errors.postalCode !== ''}>
                <FormLabel htmlFor="postalCode">Postal code</FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="number"
                  placeholder="Enter your postal code"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={4}>
              <FormControl isRequiisRequired isInvalid={errors.state !== ''} red>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                />
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
        </form>
      </Box>
    </Box>
  );
}

export default Register;
