import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchThuocKiemKeList = createAsyncThunk('thuocKiemKe/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/thuoc-vat-tu/kiem-ke');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách kiểm kê');
  }
});

export const fetchThuocKiemKeById = createAsyncThunk('thuocKiemKe/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/thuoc-vat-tu/kiem-ke/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createThuocKiemKe = createAsyncThunk('thuocKiemKe/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/thuoc-vat-tu/kiem-ke', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateThuocKiemKe = createAsyncThunk('thuocKiemKe/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/thuoc-vat-tu/kiem-ke/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteThuocKiemKe = createAsyncThunk('thuocKiemKe/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/thuoc-vat-tu/kiem-ke/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const thuocKiemKeSlice = createSlice({
  name: 'thuocKiemKe',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchThuocKiemKeList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchThuocKiemKeList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchThuocKiemKeList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchThuocKiemKeById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchThuocKiemKeById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchThuocKiemKeById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createThuocKiemKe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createThuocKiemKe.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createThuocKiemKe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateThuocKiemKe.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateThuocKiemKe.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateThuocKiemKe.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteThuocKiemKe.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = thuocKiemKeSlice.actions;
export default thuocKiemKeSlice.reducer;

