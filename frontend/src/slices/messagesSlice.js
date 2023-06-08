import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import socket from '../socket.js';
import fetchChatData from './chatSlice.js';
import { actions as channelsActions } from './channelsSlice.js';

export const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }) => {
    await new Promise((resolve, reject) => {
      socket.emit('newMessage', { body, channelId, username }, (response) => {
        if (response.error) {
          reject();
        }
        resolve();
      });
    });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { ...initialState, messageFormStatus: 'inactivity' },
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        const { payload: { messages } } = action;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(sendMessage.pending, (state) => {
        state.messageFormStatus = 'pending';
      })
      .addCase(sendMessage.rejected, (state) => {
        state.messageFormStatus = 'inactivity';
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.messageFormStatus = 'inactivity';
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const channelId = payload;
        const allMessages = Object.values(state.entities);
        const restMessages = allMessages.filter((message) => message.channelId !== channelId);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
