import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserById, updateUserById } from '../redux/asyncActions';
import { validateEditProfile } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import backgroundImage from '../assets/images/background.jpg';

let timeoutId = null;
let navigateTimeoutId = null;

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId);
  const selectedUser = useSelector((state) => state.selectedUser);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(getUserById(userId));
      setIsLoadingData(false);
    };
    fetchProduct();
  }, [dispatch, userId]);

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

  useEffect(() => {
    if (!isLoadingData && selectedUser) {
      const {
        name,
        lastname,
        username,
        email,
        birthdate,
        phoneNumber,
        address,
        postalCode,
        state,
        country,
      } = selectedUser.user || selectedUser;

      let formattedBirthdate = '';

      if (birthdate) {
        formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
      }

      setFormData({
        name,
        lastname,
        username,
        email,
        password: '',
        passwordCheck: '',
        birthdate: formattedBirthdate,
        phoneNumber,
        address,
        postalCode,
        state,
        country,
      });
    }
  }, [isLoadingData, selectedUser]);

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

    validateEditProfile(formFields, errors, setErrors);
    // const formErrors = validateEditProfile(formFields);
    // setErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      Object.values(formData).some((field) => field !== '') &&
      Object.values(errors).every((error) => error === '')
    ) {
      const updatedUser = {};

      if (formData.name.trim() !== '') {
        updatedUser.name =
          formData.name
            .trim()
            .charAt(0)
            .toUpperCase() + formData.name.trim().slice(1);
      }
      if (formData.lastname.trim() !== '') {
        updatedUser.lastname =
          formData.lastname
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1);
      }
      if (formData.username.trim() !== '') {
        updatedUser.username = formData.username.trim();
      }
      if (formData.email.trim() !== '') {
        updatedUser.email = formData.email.trim();
      }
      if (formData.password.trim() !== '') {
        updatedUser.password = formData.password.trim();
      }
      if (formData.birthdate !== '') {
        updatedUser.birthdate = formData.birthdate;
      }
      if (formData.phoneNumber !== '') {
        updatedUser.phoneNumber = formData.phoneNumber.trim();
      }
      if (formData.address !== '') {
        updatedUser.address = formData.address.trim();
      }
      if (formData.postalCode !== '') {
        updatedUser.postalCode = formData.postalCode.trim();
      }
      if (formData.state !== '') {
        updatedUser.state =
          formData.state
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1);
      }
      if (formData.country !== '') {
        updatedUser.country =
          formData.country
            .trim()
            .charAt(0)
            .toUpperCase() + formData.lastname.trim().slice(1);
      }

      const response = await dispatch(updateUserById({ userId, updatedUser }));

      timeoutId = setTimeout(() => {
        setIsLoading(false);
        if (response.payload) {
          setError('');
          setSuccess('Profile updated successfully!');
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
            navigate('/profile');
          }, 2000);
        } else {
          setSuccess('');
          setError('Error updating profile');
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

  if (isLoadingData || !selectedUser) {
    return (
      <Box display="grid" placeItems="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

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
          Update Profile
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
              <FormControl /* isRequired */ isInvalid={errors.name !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.lastname !== ''}>
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
              <FormControl /* isRequired */ isInvalid={errors.username !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.email !== ''}>
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
              <FormControl /* isRequired */ isInvalid={errors.password !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.passwordCheck !== ''}>
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
              <FormControl /* isRequired */ isInvalid={errors.birthdate !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.phoneNumber !== ''}>
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
              <FormControl /* isRequired */ isInvalid={errors.address !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.postalCode !== ''}>
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
              <FormControl /* isRequired */ isInvalid={errors.state !== ''}>
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

              <FormControl /* isRequired */ isInvalid={errors.country !== ''}>
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

          <Stack direction="column" spacing={4} mt="20px">
            <Stack direction="row" spacing={4}>
              <Button
                width="100%"
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Go Back
              </Button>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Updating..."
                width="100%"
              >
                Update
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default EditProfile;
