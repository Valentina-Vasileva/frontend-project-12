import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import authReducer from './authSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    authReducer,
    modalReducer,
  },
});
