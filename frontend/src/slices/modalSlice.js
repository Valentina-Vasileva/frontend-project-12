import { createSlice } from '@reduxjs/toolkit';
import { createChannel } from './channelsSlice.js';

const initialState = {
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload;
    },
    closeModal: (state) => {
      state.type = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.fulfilled, (state) => {
        state.type = state.type === 'create_channel' ? null : state.type;
      });
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
