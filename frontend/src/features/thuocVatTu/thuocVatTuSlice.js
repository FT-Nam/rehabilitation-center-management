import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchThuocVatTuList = createAsyncThunk('thvt/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/thuoc-vat-tu');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách');
  }
});

export const fetchThuocVatTuById = createAsyncThunk('thvt/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/thuoc-vat-tu/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createThuocVatTu = createAsyncThunk('thvt/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/thuoc-vat-tu', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateThuocVatTu = createAsyncThunk('thvt/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/thuoc-vat-tu/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteThuocVatTu = createAsyncThunk('thvt/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/thuoc-vat-tu/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const thuocVatTuSlice = createSlice({
  name: 'thuocVatTu',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchThuocVatTuList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchThuocVatTuList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchThuocVatTuList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchThuocVatTuById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchThuocVatTuById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchThuocVatTuById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createThuocVatTu.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createThuocVatTu.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createThuocVatTu.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateThuocVatTu.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateThuocVatTu.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateThuocVatTu.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteThuocVatTu.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = thuocVatTuSlice.actions;
export default thuocVatTuSlice.reducer;

