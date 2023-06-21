import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import routes from '../routes.js';
import getErrorType from '../getErrorType.js';

export const REGISTER_FORM_STATUS_INACTIVITY = 'inactivity';
export const REGISTER_FORM_STATUS_PENDING = 'pending';

export const register = createAsyncThunk(
  'register',
  async ({ username, password }) => {
    const response = await axios.post(routes.backend.signup(), { username, password });
    return response.data;
  },
);

const initialState = {
  registerError: null,
  formStatus: REGISTER_FORM_STATUS_INACTIVITY,
};

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.formStatus = REGISTER_FORM_STATUS_PENDING;
      })
      .addCase(register.fulfilled, (state) => {
        state.formStatus = REGISTER_FORM_STATUS_INACTIVITY;
      })
      .addCase(register.rejected, (state, action) => {
        const { error } = action;
        state.registerError = error;

        state.formStatus = REGISTER_FORM_STATUS_INACTIVITY;

        if (getErrorType(error.message) === 'network') {
          toast.error(i18n.t('registration.errors.network'));
        }
      });
  },
});

export const { actions } = registrationSlice;
export default registrationSlice.reducer;
