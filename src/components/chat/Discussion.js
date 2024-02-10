import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Input, Button, Avatar, Flex, Spacer } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

export const Discussion = ({ username, idUser, socket }) => {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const currentUser = useSelector((state) => state.auth.user);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);

    const handleSendMessage = async () => {
        if (!message) return;
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
        const handleMessages = (messages) => {
            console.log('Received messages:', messages);
            setMessageHistory(messages);
        };

        const handleMessage = (receivedMessage) => {
            console.log('Received message:', receivedMessage);
            setMessageHistory((prevMessages) => [...prevMessages, receivedMessage]);
        };

        socket.on('messages', handleMessages);
        socket.on('message', handleMessage);

        return () => {
            socket.off('messages', handleMessages);
            socket.off('message', handleMessage);
        };
    }, [currentUser.id, idUser, socket]);

    const handleEmojiSelect = (emoji) => {
        console.log('Emoji selected:', emoji);
        setMessage((prevMessage) => prevMessage + emoji.emoji);
        setShowEmojiPicker(false);
    };

    const handleOutsideClick = (e) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <Flex
            direction="column"
            flex="1"
            maxW="600px"
            width="100%"
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

            <Box maxH="400px" overflowY="auto" borderRadius="md" bg="white" p={2} mb={4}>
                {messageHistory.map((msg, index) => (
                    <Flex
                        key={index}
                        mb={2}
                        fontSize="md"
                        color={msg.senderId === currentUser.id ? 'teal.600' : 'teal.600'}
                        justifyContent={msg.senderId === currentUser.id ? 'flex-end' : 'flex-start'}
                    >
                        {msg.senderId !== currentUser.id && (
                            <Avatar size="xs" name={msg.senderUsername} mr={2} />
                        )}
                        <Text>{msg.content}</Text>
                        {msg.senderId === currentUser.id && (
                            <Avatar size="xs" name={msg.senderUsername} ml={2} />
                        )}
                    </Flex>
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

                {/* Emoji picker */}
                {showEmojiPicker && (
                    <div ref={emojiPickerRef} style={{ position: 'absolute', bottom: '50px', right: '10px' }}>
                        <EmojiPicker onEmojiClick={handleEmojiSelect} disableSearchBar />
                    </div>
                )}

                {/* Button to toggle emoji picker */}
                <Button
                    position="absolute"
                    bottom="0px"
                    right="0px"
                    top="0px"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    colorScheme="teal"
                    _hover={{ bg: 'teal.600' }}
                >
                    +
                </Button>
            </Flex>

            {/* Send button */}
            <Button mt={4} onClick={handleSendMessage} colorScheme="teal" size="md" w="100%">
                Send
            </Button>
        </Flex>
    );
};
