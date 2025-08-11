import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchAccountsList = createAsyncThunk('accounts/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/accounts');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách tài khoản');
  }
});

export const fetchAccountById = createAsyncThunk('accounts/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/accounts/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy tài khoản');
  }
});

export const createAccount = createAsyncThunk('accounts/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/accounts', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới tài khoản thất bại');
  }
});

export const updateAccount = createAsyncThunk('accounts/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/accounts/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật tài khoản thất bại');
  }
});

export const deleteAccount = createAsyncThunk('accounts/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/accounts/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa tài khoản thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchAccountsList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchAccountsList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchAccountsList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchAccountById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchAccountById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchAccountById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createAccount.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createAccount.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createAccount.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateAccount.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateAccount.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateAccount.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteAccount.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = accountsSlice.actions;
export default accountsSlice.reducer; 