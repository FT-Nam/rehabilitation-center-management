import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchDaoTaoNgheList = createAsyncThunk('daoTaoNghe/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/dao-tao-nghe');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách');
  }
});

export const fetchDaoTaoNgheById = createAsyncThunk('daoTaoNghe/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/dao-tao-nghe/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createDaoTaoNghe = createAsyncThunk('daoTaoNghe/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/dao-tao-nghe', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateDaoTaoNghe = createAsyncThunk('daoTaoNghe/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/dao-tao-nghe/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteDaoTaoNghe = createAsyncThunk('daoTaoNghe/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/dao-tao-nghe/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const daoTaoNgheSlice = createSlice({
  name: 'daoTaoNghe',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchDaoTaoNgheList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchDaoTaoNgheList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchDaoTaoNgheList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchDaoTaoNgheById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchDaoTaoNgheById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchDaoTaoNgheById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createDaoTaoNghe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createDaoTaoNghe.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createDaoTaoNghe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateDaoTaoNghe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateDaoTaoNghe.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateDaoTaoNghe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteDaoTaoNghe.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = daoTaoNgheSlice.actions;
export default daoTaoNgheSlice.reducer;

