import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authAPI';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex
} from '@chakra-ui/react';
import { loginAsync } from '../../features/auth/authSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginAsync(email, password))



  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box maxW="md" mx="auto" mt={8} p={4} boxShadow="md" borderRadius="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="username">Email:</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                size="lg"
                variant="filled"
                focusBorderColor="blue.500"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                variant="filled"
                focusBorderColor="blue.500"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isFullWidth
              fontSize={{ base: 'md', md: 'lg' }}
              py={{ base: 4, md: 6 }}
              _hover={{ bg: 'blue.600' }}
              _focus={{ outline: 'none' }}
            >
              Log In
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginForm;