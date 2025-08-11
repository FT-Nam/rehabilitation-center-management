import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchKiemKeList = createAsyncThunk('taiSanKiemKe/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/tai-san/kiem-ke');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách kiểm kê');
  }
});

export const fetchKiemKeById = createAsyncThunk('taiSanKiemKe/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/tai-san/kiem-ke/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy kiểm kê');
  }
});

export const createKiemKe = createAsyncThunk('taiSanKiemKe/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/tai-san/kiem-ke', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới kiểm kê thất bại');
  }
});

export const updateKiemKe = createAsyncThunk('taiSanKiemKe/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/tai-san/kiem-ke/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật kiểm kê thất bại');
  }
});

export const deleteKiemKe = createAsyncThunk('taiSanKiemKe/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tai-san/kiem-ke/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa kiểm kê thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const taiSanKiemKeSlice = createSlice({
  name: 'taiSanKiemKe',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchKiemKeList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchKiemKeList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchKiemKeList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchKiemKeById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchKiemKeById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchKiemKeById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createKiemKe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createKiemKe.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createKiemKe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateKiemKe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateKiemKe.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateKiemKe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteKiemKe.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = taiSanKiemKeSlice.actions;
export default taiSanKiemKeSlice.reducer;

