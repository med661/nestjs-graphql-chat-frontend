// import React, { useState, useEffect } from 'react';
// import { Box, Text, Avatar, Stack, AvatarBadge, Flex } from '@chakra-ui/react';
// import { useSelector, useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
// import { Discussion } from './Discussion';


// const OnlineUsers = ({ socket }) => {
//     const dispatch = useDispatch();
//     const connected = useSelector((state) => state.socket.connected);
//     const data = useSelector((state) => state.socket.data);
//     const currentUser = useSelector((state) => state.auth.user);
//     const [users, setUsers] = useState([]);

//     //const socket = io('http://localhost:5000');

//     useEffect(() => {
//         if (connected) {
//             console.log('Connected');
//             console.log('Current user:', currentUser);
//             socket.emit('get-users-list', { currentUser: currentUser.id });
//             // socket.emit('get-users-list');

//             // socket.on('users-list', (users) => {
//             //     console.log('Users list:', users);
//             // });
//             socket.on('users-list', (data) => {
//                 setUsers(data.users);
//             });
//             return () => socket.disconnect();



//         }
//     }, [connected]);


//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         if (data) {
//             console.log('Data received:');

//         }
//     }, [data]);
//     useEffect(() => {
//         console.log('Selected user:', selectedUser);
//     }
//         , [selectedUser, setSelectedUser]);




//     const handleAvatarClick = (user) => {
//         console.log(user);
//         setSelectedUser(user);
//     };

//     return (
//         <Box p={4} position="absolute" left={1} display="flex">
//             <Stack direction='column' spacing={1}>
//                 {users.map((user) => (
//                     <Flex alignItems="center" key={user.id}>
//                         <Avatar
//                             boxSize="40px"
//                             borderRadius="full"
//                             position="relative"
//                             onClick={() => handleAvatarClick(user)}
//                             className={selectedUser === user ? 'selected-user' : ''}
//                         >
//                             {user.status === 'offline' && <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1em' />}
//                             {user.status === 'online' && <AvatarBadge borderColor='papayawhip' bg='green' boxSize='1em' />}
//                         </Avatar>

//                         <div onClick={() => handleAvatarClick(user)} style={{ cursor: 'pointer' }}>
//                             <Text ml={2} color={selectedUser === user ? 'red' : 'black'}>{user.username}</Text>
//                         </div>
//                     </Flex>
//                 ))}
//             </Stack>
//             {selectedUser === null ? (
//                 <Box>
//                     <Text>select user and start your chat</Text>
//                 </Box>
//             ) : (
//                 <Box ml={4}>
//                     <Discussion username={selectedUser.username} idUser={selectedUser.id} socket={socket} />
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default OnlineUsers;
import React, { useState, useEffect } from 'react';
import { Box, Text, Avatar, Stack, AvatarBadge, Flex, Badge } from '@chakra-ui/react';
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
                    </Flex>
                ))}
            </Stack>
            {selectedUser === null ? (
                <Text>Select a user to start your chat</Text>
            ) : (
                <Discussion username={selectedUser.username} idUser={selectedUser.id} socket={socket} />
            )}
        </Flex>
    );
};

export default OnlineUsers;

