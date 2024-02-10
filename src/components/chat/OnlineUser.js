
import React, { useState, useEffect } from 'react';
import { Box, Text, Avatar, Stack, AvatarBadge, Flex, Badge, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { Discussion } from './Discussion';

const OnlineUsers = ({ socket }) => {
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.socket.connected);
    const data = useSelector((state) => state.socket.data);
    const currentUser = useSelector((state) => state.auth.user);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (connected) {
            socket.emit('get-users-list', { currentUser: currentUser.id });
            socket.on('users-list', (data) => {
                setUsers(data.users);
            });
            return () => socket.disconnect();
        }
    }, [connected]);

    const handleAvatarClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <Flex p={4}>
            <Stack spacing={2} mr={4}>
                {users.map((user) => (
                    <Flex
                        alignItems="center"
                        key={user.id}
                        p={2}
                        borderRadius="md"
                        _hover={{ bg: 'teal.100', cursor: 'pointer' }}
                        onClick={() => handleAvatarClick(user)}
                        className={selectedUser === user ? 'selected-user' : ''}
                    >
                        <Avatar
                            boxSize="40px"
                            borderRadius="full"
                            position="relative"
                            mr={2}
                            className={selectedUser === user ? 'selected-avatar' : ''}
                        >
                            {user.status === 'offline' && <AvatarBadge borderColor='white' bg='gray.300' boxSize='1em' />}
                            {user.status === 'online' && <AvatarBadge borderColor='white' bg='green.300' boxSize='1em' />}
                        </Avatar>
                        <Text color={selectedUser === user ? 'teal.500' : 'black'}>{user.username}</Text>
                        {user.status === 'online' && (
                            <Badge ml={2} colorScheme="green">
                                Online
                            </Badge>
                        )}
                        {user.status === 'offline' && (
                            <Badge ml={2} colorScheme="gray">
                                Offline
                            </Badge>
                        )}


                    </Flex>

                ))}
            </Stack>
            {selectedUser === null ? (


                <Box p={8} maxW="600px" mx="auto" boxShadow="lg" borderRadius="lg" bg="white" overflow="hidden">
                    <Heading as="h1" mb={4} fontSize="3xl" textAlign="center" color="blue.600">
                        Welcome to Your Chat App
                    </Heading>
                    <Text textAlign="center" fontSize="lg" color="gray.600" mb={6}>
                        Connect with others, share your thoughts, and start a conversation by selecting a user to chat with.
                    </Text>
                    <Text textAlign="center" fontSize="lg" color="gray.600" fontWeight="bold">
                        Select a user to start your chat
                    </Text>

                </Box>
            ) : (
                <Discussion
                    key={selectedUser.id}
                    username={selectedUser.username}
                    idUser={selectedUser.id}
                    socket={socket}
                    status={selectedUser.status}

                />
            )}
        </Flex>
    );
};

export default OnlineUsers;


