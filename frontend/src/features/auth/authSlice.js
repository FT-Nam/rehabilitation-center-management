import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

// Thunk: login
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/auth/login', { username, password });
      // Backend wraps response in { code, message, value }
      const payload = data?.value || data;
      return payload;
    } catch (err) {
      const message = err?.response?.data?.message || 'Đăng nhập thất bại';
      return rejectWithValue(message);
    }
  },
);

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { token, username, roles, permissions } = action.payload || {};
        state.token = token || null;
        state.user = token ? { username, roles, permissions } : null;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ username, roles, permissions }));
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập thất bại';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

