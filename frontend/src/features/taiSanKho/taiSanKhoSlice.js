import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchKhoList = createAsyncThunk('taiSanKho/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/tai-san-kho');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách kho');
  }
});

export const fetchKhoById = createAsyncThunk('taiSanKho/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/tai-san-kho/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createKho = createAsyncThunk('taiSanKho/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/tai-san-kho', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateKho = createAsyncThunk('taiSanKho/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/tai-san-kho/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteKho = createAsyncThunk('taiSanKho/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tai-san-kho/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const taiSanKhoSlice = createSlice({
  name: 'taiSanKho',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchKhoList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchKhoList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchKhoList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchKhoById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchKhoById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchKhoById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createKho.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createKho.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createKho.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateKho.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateKho.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateKho.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteKho.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = taiSanKhoSlice.actions;
export default taiSanKhoSlice.reducer;

