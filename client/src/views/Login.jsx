import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulación de login, acá va la lógica
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'user@example.com' && password === 'password') {
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    }, 2000);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
      <Box bg="white" boxShadow="lg" borderRadius="md" maxW="sm" mx="auto" p={6} width="100%">
        {error && (
          <Alert status="error" marginBottom={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Stack spacing={4} width="100%">
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
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
              onClick={handleLogin}
            >
              Log in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
