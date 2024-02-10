import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../features/auth/authSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAsync(password, email, name));
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>

          <FormControl>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;