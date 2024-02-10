// socketMiddleware.js
import io from 'socket.io-client';
import { setConnected, setData, setHistoyMessage, setNewMessage } from './socketSlice';

export const socketMiddleware = (storeAPI) => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
        storeAPI.dispatch(setConnected(true));
        //  storeAPI.dispatch(setData(''));


    });

    socket.on('message', (data) => {
        console.log('Data received:', data);
        storeAPI.dispatch(setData(data));
        storeAPI.dispatch(setNewMessage(data));

    });

    socket.on('messages', (messages) => {
        console.log('Messages:', messages);
        storeAPI.dispatch(setHistoyMessage(messages));
    });

    socket.on('disconnect', () => {
        storeAPI.dispatch(setConnected(false));
    });

    return (next) => (action) => {
        return next(action);
    };
};