import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchChatData from './fetchChatData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { ...initialState, currentChannelId: null },
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
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
