import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

export const fetchChatData = createAsyncThunk(
  'channels/fetchChatData',
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(routes.backend.getData(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { ...initialState, currentChannelId: null },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        const { payload: { channels, currentChannelId } } = action;
        channelsAdapter.addMany(state, channels);
        action.payload = currentChannelId;
        channelsSlice.caseReducers.setCurrentChannelId(state, action);
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
