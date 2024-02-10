import React from 'react';
import OnlineUsers from './OnlineUser';

const ChatComponent = ({ socket }) => {
    return (
        <>
            <OnlineUsers socket={socket}/>
        </>
    );
};

export default ChatComponent;