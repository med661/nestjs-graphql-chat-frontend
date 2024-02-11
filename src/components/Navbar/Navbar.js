import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Spacer,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,
} from '@chakra-ui/react';
import { FiLogOut, FiBell } from 'react-icons/fi';
import { logoutAsync } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, socket }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'New notification 1' },
        { id: 2, text: 'New notification 2' },
        // Add more notifications as needed
    ]);

    const handleLogout = () => {
        dispatch(logoutAsync());
        socket.disconnect()
        socket.on('disconnect', () => {
            console.log('disconnected')
        })

        navigate('/login');
    };


    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="teal.500"
            color="white" // Set text color to white
        >
            <Box>
                {/* Your Logo */}
                <span role="img" aria-label="Logo">
                    simple-chat-app
                </span>
            </Box>

            <Spacer />

            {user && (
                <Box>
                    {/* Notifications */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FiBell />}
                            variant="outline"
                            colorScheme="white" // Set button color
                        >
                            {/* Badge with number of notifications */}
                            <Badge
                                colorScheme="red"
                                borderRadius="full"
                                px="2"
                                position="absolute"
                                top="-4px"
                                right="-4px"
                            >
                                {notifications.length}sqssssssssssssssssssssss
                            </Badge>
                        </MenuButton>
                        <MenuList
                            color="black"
                            boxShadow="md"
                            borderRadius="md"
                            maxW="300px"
                        >
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <MenuItem key={notification.id} fontSize="sm">
                                        {notification.text}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem>No new notifications</MenuItem>
                            )}
                        </MenuList>
                    </Menu>

                    {/* Logout */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FiLogOut />}
                            variant="outline"
                            colorScheme="white" // Set button color
                        />
                        <MenuList
                            color="black" // Set text color
                            boxShadow="md" // Add box shadow
                            borderRadius="md" // Add border radius
                        >
                            <MenuItem onClick={handleLogout} fontSize="sm">
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            )}
        </Flex>
    );
};

export default Navbar;
