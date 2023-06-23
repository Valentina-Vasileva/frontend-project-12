/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { createChannel, removeChannel, renameChannel } from './channelsSlice.js';

export const CREATE_CHANNEL_MODAL_TYPE = 'create_channel';
export const REMOVE_CHANNEL_MODAL_TYPE = 'remove_channel';
export const RENAME_CHANNEL_MODAL_TYPE = 'rename_channel';

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
        state.type = state.type === CREATE_CHANNEL_MODAL_TYPE ? null : state.type;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        if (state.type === REMOVE_CHANNEL_MODAL_TYPE) {
          state.type = null;
          state.id = null;
        }
      })
      .addCase(renameChannel.fulfilled, (state) => {
        if (state.type === RENAME_CHANNEL_MODAL_TYPE) {
          state.type = null;
          state.id = null;
        }
      });
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
