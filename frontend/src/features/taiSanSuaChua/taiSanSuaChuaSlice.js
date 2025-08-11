import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchSuaChuaList = createAsyncThunk('taiSanSuaChua/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/tai-san/sua-chua');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách sửa chữa');
  }
});

export const fetchSuaChuaById = createAsyncThunk('taiSanSuaChua/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/tai-san/sua-chua/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy sửa chữa');
  }
});

export const createSuaChua = createAsyncThunk('taiSanSuaChua/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/tai-san/sua-chua', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới sửa chữa thất bại');
  }
});

export const updateSuaChua = createAsyncThunk('taiSanSuaChua/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/tai-san/sua-chua/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật sửa chữa thất bại');
  }
});

export const deleteSuaChua = createAsyncThunk('taiSanSuaChua/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tai-san/sua-chua/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa sửa chữa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const taiSanSuaChuaSlice = createSlice({
  name: 'taiSanSuaChua',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchSuaChuaList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchSuaChuaList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchSuaChuaList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchSuaChuaById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchSuaChuaById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchSuaChuaById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createSuaChua.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createSuaChua.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createSuaChua.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateSuaChua.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateSuaChua.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateSuaChua.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteSuaChua.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = taiSanSuaChuaSlice.actions;
export default taiSanSuaChuaSlice.reducer;

