import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';

import {
  getChartData,
  getUserCart,
  getUserFavorites,
  getUserPurchases,
  loginGoogle,
  loginUser,
} from '../redux/asyncActions';
import { validateLogin } from '../utils/validateForm';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
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

const clientId = process.env.REACT_APP_CLIENT_ID;
let timeoutId = null;
let navigateTimeoutId = null;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientId,
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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

    validateLogin(formFields, errors, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = { email: formData.email, password: formData.password };
    const response = await dispatch(loginUser(user));

    timeoutId = setTimeout(() => {
      setIsLoading(false);

      if (response.payload) {
        if (response.payload.user.disable) {
          setSuccess('');
          setError('Your account has been disabled.\nPlease reach out to our support team.');
          return;
        }

        dispatch(getUserCart(response.payload.user.id));
        dispatch(getUserPurchases(response.payload.user.id));
        dispatch(getUserFavorites(response.payload.user.id));

        if (response.payload.user.isAdmin === 'true') {
          dispatch(getChartData());
        }

        setError('');
        setSuccess('Login successful!');

        setFormData({
          email: '',
          password: '',
        });

        navigateTimeoutId = setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setSuccess('');
        setError('Invalid email or password');
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(navigateTimeoutId);
    };
  }, []);

  //* Google Login
  const onSuccess = async (response) => {
    const user = {
      googleId: response.profileObj.googleId,
      email: response.profileObj.email,
      name: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      fullname: response.profileObj.name,
      image: response.profileObj.imageUrl,
    };

    //* Login (back)
    const res = await dispatch(loginGoogle(user));
    if (res.payload) {
      if (res.payload.user.disable) {
        setSuccess('');
        setError('Your account has been disabled.\nPlease reach out to our support team.');
        return;
      }

      const userId = res.payload.user.id;
      dispatch(getUserCart(userId));
      dispatch(getUserPurchases(userId));
      dispatch(getUserFavorites(userId));

      setError('');
      setSuccess('Google login successful!');

      navigateTimeoutId = setTimeout(() => {
        navigate('/home');
      }, 2000);

      // Por si quisiéramos redirigir al usuario a completar su perfil
      // navigateTimeoutId = setTimeout(() => {
      //   if (res.payload.registered) {
      //     navigate('/home');
      //   } else {
      //     navigate('/profile/edit');
      //   }
      // }, 2000);
    } else {
      setSuccess('');
      setError('Google login failed');
    }

    //* Login (front)
    // await dispatch(actions.loginGoogle(user));
    // setError('');
    // setSuccess('Google login successful!');
    // navigateTimeoutId = setTimeout(() => {
    //   navigate('/home');
    // }, 2000);
  };

  const onFailure = (error) => {
    console.error('Google login failed:', error);
    setSuccess('');
    setError('Google login failed');
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
      position="relative"
    >
      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        width="md"
        mx="auto"
        p={8}
        boxSizing="border-box"
      >
        <Heading size="lg" mb="6" w="100%" textAlign="center">
          Login
        </Heading>

        <form onChange={handleForm} onSubmit={handleSubmit}>
          {error && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              <Box whiteSpace="pre-line">{error}</Box>
            </Alert>
          )}

          {success && (
            <Alert status="success" marginBottom={4}>
              <AlertIcon />
              {success}
            </Alert>
          )}

          <Stack spacing={4}>
            <FormControl isRequired isInvalid={errors.email !== ''}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              {/* <Tooltip label={errors.email} isOpen={errors.email !== ''} placement="bottom"> */}
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
              {/* </Tooltip> */}
              {/* <FormErrorMessage>{errors.email}</FormErrorMessage> */}
            </FormControl>

            <FormControl isRequired isInvalid={errors.password !== ''}>
              <FormLabel htmlFor="password">Password</FormLabel>
              {/* <Tooltip label={errors.password} isOpen={errors.password !== ''} placement="bottom"> */}
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
              {/* </Tooltip> */}
              {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
            </FormControl>

            <Stack direction="row" alignItems="center" /* spacing={4} */>
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

              <Flex justifyContent="center" width="50%">
                <GoogleLogin
                  clientId={clientId}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </Flex>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Logging in..."
                width="50%"
              >
                Login
              </Button>
            </Stack>

            <Box textAlign="center" mt="2" fontSize="sm">
              <Text mb="0">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/register" color="blue.500" textDecoration="underline">
                  Register now
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
        onClick={() => navigate('/register')}
        position="absolute"
        top="20px"
        right="20px"
        isDisabled={isLoading}
      >
        Register <Icon as={FaChevronRight} ml="2" />
      </Button>
    </Box>
  );
}

export default Login;
