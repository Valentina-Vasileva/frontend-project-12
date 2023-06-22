import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import wordFilter from 'leo-profanity';
import socket from '../socket.js';
import fetchChatData from './chatSlice.js';
import { actions as channelsActions } from './channelsSlice.js';

export const MESSAGE_FORM_STATUS_INACTIVITY = 'inactivity';
export const MESSAGE_FORM_STATUS_PENDING = 'pending';
export const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }) => {
    const cleanBody = wordFilter.clean(body);
    console.log(cleanBody);
    await new Promise((resolve, reject) => {
      socket.emit('newMessage', { body: cleanBody, channelId, username }, (response) => {
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
  initialState: { ...initialState, messageFormStatus: MESSAGE_FORM_STATUS_INACTIVITY },
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
        state.messageFormStatus = MESSAGE_FORM_STATUS_PENDING;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.messageFormStatus = MESSAGE_FORM_STATUS_INACTIVITY;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.messageFormStatus = MESSAGE_FORM_STATUS_INACTIVITY;
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
