import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { getUserFavorites, getUserOrders, loginUser } from '../redux/asyncActions';
import { validateLogin } from '../utils/validateForm';

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
let navigateTimeoutId = null;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      if (response) {
        setSuccess('Login successful!');
        // dispatch(getUserFavorites());
        // dispatch(getUserOrders());
        setFormData({
          email: '',
          password: '',
        });
        navigateTimeoutId = setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
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
      <Box bg="white" boxShadow="lg" borderRadius="md" width="sm" mx="auto" p={6}>
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
          <Stack spacing={4}>
            <FormControl isRequired isInvalid={errors.email !== ''}>
              <FormLabel htmlFor="email">Email address</FormLabel>
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
                loadingText="Logging in..."
                width="100%"
              >
                Log in
              </Button>
            </Stack>

            <Box textAlign="center" marginTop={4} fontSize="sm">
              <Text>
                Not registered yet?{' '}
                <Link as={RouterLink} to="/register" color="blue.500" textDecoration="underline">
                  Click here to register
                </Link>
              </Text>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
