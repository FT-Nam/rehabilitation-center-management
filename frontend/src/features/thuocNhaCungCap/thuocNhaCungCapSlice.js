import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchNCCList = createAsyncThunk('ncc/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/nha-cung-cap');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách nhà cung cấp');
  }
});

export const fetchNCCById = createAsyncThunk('ncc/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/nha-cung-cap/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy nhà cung cấp');
  }
});

export const createNCC = createAsyncThunk('ncc/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/nha-cung-cap', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới nhà cung cấp thất bại');
  }
});

export const updateNCC = createAsyncThunk('ncc/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/nha-cung-cap/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật nhà cung cấp thất bại');
  }
});

export const deleteNCC = createAsyncThunk('ncc/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/nha-cung-cap/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa nhà cung cấp thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const nccSlice = createSlice({
  name: 'ncc',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchNCCList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchNCCList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchNCCList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchNCCById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchNCCById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchNCCById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createNCC.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createNCC.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createNCC.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateNCC.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateNCC.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateNCC.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteNCC.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = nccSlice.actions;
export default nccSlice.reducer;

