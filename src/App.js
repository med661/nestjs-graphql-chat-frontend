import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './components/Dashboard';
import PublicRoute from './components/routes/PublicRoute';
import { useSelector } from 'react-redux';

import PrivateRoute from './components/routes/PrivateRoute';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import AboutMe from './components/About';
const theme = extendTheme({
  // Your Chakra UI theme configuration, if any
});


function App() {
  const user = useSelector(state => state.auth.user);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    if (user && socket) {
      socket.on('connect', () => {
        socket.emit('add-user', user.id);

      });

      // return () => socket.disconnect();
    }
  }, [user, socket]);


  return (
    <ChakraProvider>



      <Router>
        <Navbar user={user} />

        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard socket={socket} /></PrivateRoute>} />
          <Route path="/" element={<AboutMe />} />


          {/* <Route path="/dashboard" element={
          <ProtectedRoute
            redirectPath="/login"
            user={user}
            children={<Dashboard />}
          ></ProtectedRoute>} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;