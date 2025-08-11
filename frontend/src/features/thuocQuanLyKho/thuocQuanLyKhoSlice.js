import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchThuocKhoList = createAsyncThunk('thuocKho/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/thuoc-vat-tu/kho');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách kho');
  }
});

export const fetchThuocKhoById = createAsyncThunk('thuocKho/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/thuoc-vat-tu/kho/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createThuocKho = createAsyncThunk('thuocKho/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/thuoc-vat-tu/kho', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateThuocKho = createAsyncThunk('thuocKho/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/thuoc-vat-tu/kho/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteThuocKho = createAsyncThunk('thuocKho/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/thuoc-vat-tu/kho/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const thuocQuanLyKhoSlice = createSlice({
  name: 'thuocKho',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchThuocKhoList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchThuocKhoList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchThuocKhoList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchThuocKhoById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchThuocKhoById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchThuocKhoById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createThuocKho.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createThuocKho.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createThuocKho.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateThuocKho.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateThuocKho.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateThuocKho.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteThuocKho.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = thuocQuanLyKhoSlice.actions;
export default thuocQuanLyKhoSlice.reducer;

