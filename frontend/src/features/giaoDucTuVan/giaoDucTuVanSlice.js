import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchGiaoDucTuVanList = createAsyncThunk('gdtv/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/giao-duc-tu-van');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách');
  }
});

export const fetchGiaoDucTuVanById = createAsyncThunk('gdtv/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/giao-duc-tu-van/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createGiaoDucTuVan = createAsyncThunk('gdtv/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/giao-duc-tu-van', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateGiaoDucTuVan = createAsyncThunk('gdtv/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/giao-duc-tu-van/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteGiaoDucTuVan = createAsyncThunk('gdtv/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/giao-duc-tu-van/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const giaoDucTuVanSlice = createSlice({
  name: 'gdtv',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchGiaoDucTuVanList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchGiaoDucTuVanList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchGiaoDucTuVanList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchGiaoDucTuVanById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchGiaoDucTuVanById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchGiaoDucTuVanById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createGiaoDucTuVan.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createGiaoDucTuVan.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createGiaoDucTuVan.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateGiaoDucTuVan.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateGiaoDucTuVan.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateGiaoDucTuVan.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteGiaoDucTuVan.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = giaoDucTuVanSlice.actions;
export default giaoDucTuVanSlice.reducer;

