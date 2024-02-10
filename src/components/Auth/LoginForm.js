import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AlertComponent from '../alter/Alert';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const errorLogin = useSelector(state => state.auth.error)
  const user = useSelector(state => state.auth.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginAsync(email, password))
    if (errorLogin) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }
        , 3000)
    }
    else if (user !== null) {
      navigate('/dashboard')


    }
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
        {showAlert && <AlertComponent message={errorLogin} errorType="error" />}
        <div className='links' >
            I don't have an account? <span>&nbsp;&nbsp;</span><Link className='link-auth' to="/register">Register</Link>
        </div>

      </Box>
    </Flex>
  );
}

export default LoginForm;