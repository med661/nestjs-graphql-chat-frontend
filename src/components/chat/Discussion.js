
import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Avatar, Flex, Spacer } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Discussion = ({ username, idUser, socket }) => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const currentUser = useSelector((state) => state.auth.user);

    const handleSendMessage = async () => {
        console.log('Sending message:', message);
        socket.emit('send-message', {
            message: message,
            senderId: currentUser.id,
            receiverId: idUser,
        });
        setMessage('');
    };

    useEffect(() => {
        console.log('Connected to socket');
        socket.emit('get-messages', { senderId: currentUser.id, receiverId: idUser });
        socket.on('messages', (messages) => {
            console.log('Received messages:', messages);
            setMessageHistory(messages);
        });

        socket.on('message', (receivedMessage) => {
            console.log('Received message:', receivedMessage);
            setMessageHistory((prevMessages) => [...prevMessages, receivedMessage]);
        });

        return () => {
            socket.off('messages');
            socket.off('message');
        };
    }, []);

    useEffect(() => {

    }, [idUser]);

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bgGradient="linear(to-b, teal.200, teal.500)"
            boxShadow="lg"
            color="white"
        >
            <Flex align="center" mb={4}>
                <Avatar size="sm" name={username} />
                <Text fontSize="xl" fontWeight="bold" ml={2}>
                    {username}
                </Text>
                <Spacer />
                <Text color="teal.300" fontSize="sm">
                    Online
                </Text>
            </Flex>

            <Box maxH="200px" overflowY="auto" borderRadius="md" bg="white" p={2} mb={4}>
                {messageHistory.map((msg, index) => (
                    msg.senderId === currentUser.id ? (
                        <Flex key={index} mb={2} fontSize="md" color="teal.600" justifyContent="flex-end">
                            <Text>{msg.content}</Text>
                            <Avatar size="xs" name={msg.senderUsername} ml={2} />
                        </Flex>
                    ) : (
                        <Flex key={index} mb={2} fontSize="md" color="teal.600">
                            <Avatar size="xs" name={msg.senderUsername} mr={2} />
                            <Text>{msg.content}</Text>
                        </Flex>
                    )
                ))}
            </Box>

            {/* Input field with emoji picker */}
            <Flex position="relative">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    size="md"
                    variant="filled"
                    color="teal.800"
                    flex="1"
                />


            </Flex>

            {/* Send button */}
            <Button mt={4} onClick={handleSendMessage} colorScheme="teal" size="md" w="100%">
                Send
            </Button>
        </Box>
    );
};
