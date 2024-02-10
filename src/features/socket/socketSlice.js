// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    connected: false,
    data: null,
    newMessage: null,
    historyMessage: [],
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setNewMessage: (state, action) => {
            state.newMessage = action.payload;
        },
        setHistoyMessage: (state, action) => {
            state.historyMessage = action.payload;
        },


    },
});

export const { setConnected, setData, setNewMessage, setHistoyMessage } = socketSlice.actions;

export default socketSlice.reducer;