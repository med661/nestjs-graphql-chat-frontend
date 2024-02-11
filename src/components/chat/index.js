import React, { useEffect } from 'react';
import OnlineUsers from './OnlineUser';

const ChatComponent = ({ socket }) => {

    useEffect(() => {
        setTimeout(() => {

        }, 1000);

    }, [socket]);


    return (
        <>
            <OnlineUsers socket={socket} />
        </>
    );
};

export default ChatComponent;