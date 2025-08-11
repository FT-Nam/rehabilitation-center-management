import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchTaiSanList = createAsyncThunk('taiSan/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/tai-san');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách tài sản');
  }
});

export const fetchTaiSanById = createAsyncThunk('taiSan/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/tai-san/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy tài sản');
  }
});

export const createTaiSan = createAsyncThunk('taiSan/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/tai-san', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới tài sản thất bại');
  }
});

export const updateTaiSan = createAsyncThunk('taiSan/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/tai-san/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật tài sản thất bại');
  }
});

export const deleteTaiSan = createAsyncThunk('taiSan/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tai-san/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa tài sản thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const taiSanSlice = createSlice({
  name: 'taiSan',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchTaiSanList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchTaiSanList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchTaiSanList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchTaiSanById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchTaiSanById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchTaiSanById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createTaiSan.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createTaiSan.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createTaiSan.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateTaiSan.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateTaiSan.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateTaiSan.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteTaiSan.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = taiSanSlice.actions;
export default taiSanSlice.reducer;

