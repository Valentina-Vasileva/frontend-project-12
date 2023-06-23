/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import routes from '../routes';
import getErrorType from '../getErrorType';
import { register } from './registrationSlice.js';

export const LOGIN_FORM_STATUS_INACTIVITY = 'inactivity';
export const LOGIN_FORM_STATUS_PENDING = 'pending';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await axios.post(routes.backend.login(), { username, password });
    return response.data;
  },
);

const isAuth = localStorage.getItem('token') !== null;
const currentUsername = localStorage.getItem('username');

const initialState = {
  auth: isAuth && currentUsername !== null,
  username: currentUsername,
  authError: null,
  formStatus: LOGIN_FORM_STATUS_INACTIVITY,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      const { token, username } = payload;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      state.auth = true;
      state.username = username;
    },
    logout: (state) => {
      state.auth = false;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.formStatus = LOGIN_FORM_STATUS_PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { payload: { username, token } } = action;
        authSlice.caseReducers.login(state, { username, token });
        state.formStatus = LOGIN_FORM_STATUS_INACTIVITY;
      })
      .addCase(login.rejected, (state, action) => {
        const { error } = action;
        state.authError = error;
        state.formStatus = LOGIN_FORM_STATUS_INACTIVITY;
        if (getErrorType(error.message) === 'network') {
          toast.error(i18n.t('login.errors.network'));
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        const { payload: { username, token } } = action;
        authSlice.caseReducers.login(state, { username, token });
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
