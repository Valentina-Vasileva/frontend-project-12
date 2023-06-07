import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import fetchChatData from './chatSlice.js';
import socket from '../socket';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const serverResponse = await new Promise((resolve, reject) => {
      socket.emit('newChannel', { name }, (response) => {
        if (response.error) {
          reject();
        }
        resolve(response);
      });
    });
    return serverResponse.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { ...initialState, currentChannelId: null, createChannelFormStatus: 'inactivity' },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        const { payload: { channels, currentChannelId } } = action;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
      })
      .addCase(createChannel.pending, (state) => {
        state.createChannelFormStatus = 'pending';
      })
      .addCase(createChannel.rejected, (state) => {
        state.createChannelFormStatus = 'inactivity';
      })
      .addCase(createChannel.fulfilled, (state, { payload }) => {
        const { id } = payload;
        state.createChannelFormStatus = 'inactivity';
        state.currentChannelId = id;
        toast.success(i18n.t('channels.create.success'));
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
