import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
