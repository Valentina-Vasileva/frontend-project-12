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

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    await new Promise((resolve, reject) => {
      socket.emit('removeChannel', { id }, (response) => {
        if (response.error) {
          reject();
        }
        resolve(response);
      });
    });
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    await new Promise((resolve, reject) => {
      socket.emit('renameChannel', { id, name }, (response) => {
        if (response.error) {
          reject();
        }
        resolve(response);
      });
    });
  },
);

const defaultCurrentChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...initialState,
    currentChannelId: defaultCurrentChannelId,
    createChannelFormStatus: 'inactivity',
    removeChannelFormStatus: 'inactivity',
    renameChannelFormStatus: 'inactivity',
  },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
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
      })
      .addCase(removeChannel.pending, (state) => {
        state.removeChannelFormStatus = 'pending';
      })
      .addCase(removeChannel.rejected, (state) => {
        state.removeChannelFormStatus = 'inactivity';
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.removeChannelFormStatus = 'inactivity';
        toast.success(i18n.t('channels.remove.success'));
        state.currentChannelId = defaultCurrentChannelId;
      })
      .addCase(renameChannel.pending, (state) => {
        state.renameChannelFormStatus = 'pending';
      })
      .addCase(renameChannel.rejected, (state) => {
        state.renameChannelFormStatus = 'inactivity';
      })
      .addCase(renameChannel.fulfilled, (state) => {
        state.renameChannelFormStatus = 'inactivity';
        toast.success(i18n.t('channels.rename.success'));
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
