import { createSlice } from '@reduxjs/toolkit';
import { createChannel, removeChannel } from './channelsSlice.js';

const initialState = {
  type: null,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, id } = payload;
      state.type = type;
      state.id = id;
    },
    closeModal: (state) => {
      state.type = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.fulfilled, (state) => {
        state.type = state.type === 'create_channel' ? null : state.type;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        if (state.type === 'remove_channel') {
          state.type = null;
          state.id = null;
        }
      });
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
