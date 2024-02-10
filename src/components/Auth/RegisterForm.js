import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../../features/auth/authSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent from '../alter/Alert';

const RegisterForm = () => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const errorRegister = useSelector(state => state.auth.error)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerAsync(password, email, name));
    if (errorRegister) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }
        , 3000)

    } else if (user !== null) {
      navigate('/dashboard')
    }

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
          {showAlert && <AlertComponent message={errorRegister} errorType="error" />}
          <div className='links' >
            I aleady have and account? <span>&nbsp;&nbsp;</span><Link className='link-auth' to="/login">login</Link>
          </div>

        </Stack>
      </form>

    </Box>
  );
};

export default RegisterForm;