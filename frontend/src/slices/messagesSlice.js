import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import socket from '../socket.js';
import fetchChatData from './fetchChatData.js';

export const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }) => {
    socket.emit('newMessage', { body, channelId, username });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        const { payload: { messages } } = action;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(sendMessage.rejected, () => {
        console.log('Add message error');
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
