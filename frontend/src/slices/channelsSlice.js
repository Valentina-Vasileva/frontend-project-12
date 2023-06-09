import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import fetchChatData from './chatSlice.js';
import socket from '../socket';

export const CHANNEL_FORM_STATUS_INACTIVITY = 'inactivity';
export const CHANNEL_FORM_STATUS_PENDING = 'pending';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();
const defaultCurrentChannelId = 1;

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

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...initialState,
    currentChannelId: defaultCurrentChannelId,
    createChannelFormStatus: CHANNEL_FORM_STATUS_INACTIVITY,
    removeChannelFormStatus: CHANNEL_FORM_STATUS_INACTIVITY,
    renameChannelFormStatus: CHANNEL_FORM_STATUS_INACTIVITY,
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
        state.createChannelFormStatus = CHANNEL_FORM_STATUS_PENDING;
      })
      .addCase(createChannel.rejected, (state) => {
        state.createChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
      })
      .addCase(createChannel.fulfilled, (state, { payload }) => {
        const { id } = payload;
        state.createChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
        state.currentChannelId = id;
        toast.success(i18n.t('channels.create.success'));
      })
      .addCase(removeChannel.pending, (state) => {
        state.removeChannelFormStatus = CHANNEL_FORM_STATUS_PENDING;
      })
      .addCase(removeChannel.rejected, (state) => {
        state.removeChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.removeChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
        toast.success(i18n.t('channels.remove.success'));
        state.currentChannelId = defaultCurrentChannelId;
      })
      .addCase(renameChannel.pending, (state) => {
        state.renameChannelFormStatus = CHANNEL_FORM_STATUS_PENDING;
      })
      .addCase(renameChannel.rejected, (state) => {
        state.renameChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
      })
      .addCase(renameChannel.fulfilled, (state) => {
        state.renameChannelFormStatus = CHANNEL_FORM_STATUS_INACTIVITY;
        toast.success(i18n.t('channels.rename.success'));
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
