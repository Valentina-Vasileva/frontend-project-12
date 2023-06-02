import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import authReducer from './authSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    authReducer,
  },
});
