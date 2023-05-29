import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchChatData = createAsyncThunk(
  'fetchChatData',
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

export default fetchChatData;
