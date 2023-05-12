import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import backgroundImage from '../assets/images/background.jpg';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulación de registro, acá va la lógica
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
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={passwordCheck}
                onChange={(event) => setPasswordCheck(event.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Birthdate</FormLabel>
              <Input
                type="date"
                placeholder="Enter your birthdate"
                value={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Postal code</FormLabel>
              <Input
                type="number"
                placeholder="Enter your postal code"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={4}>
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
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

          <Box textAlign="center" marginTop={4}>
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
