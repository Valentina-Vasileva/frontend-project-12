import { createSlice } from '@reduxjs/toolkit';

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
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
