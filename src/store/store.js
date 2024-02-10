import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from '../features/auth/authSlice';
import socketReducer from '../features/socket/socketSlice';
import { socketMiddleware } from '../features/socket/socketMiddleware';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        socket: socketReducer,

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
