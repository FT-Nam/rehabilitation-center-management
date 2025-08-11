import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchLaoDongList = createAsyncThunk('laoDong/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/lao-dong-tri-lieu');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách');
  }
});

export const fetchLaoDongById = createAsyncThunk('laoDong/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/lao-dong-tri-lieu/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createLaoDong = createAsyncThunk('laoDong/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/lao-dong-tri-lieu', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateLaoDong = createAsyncThunk('laoDong/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/lao-dong-tri-lieu/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteLaoDong = createAsyncThunk('laoDong/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/lao-dong-tri-lieu/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const laoDongTriLieuSlice = createSlice({
  name: 'laoDong',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchLaoDongList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchLaoDongList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchLaoDongList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchLaoDongById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchLaoDongById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchLaoDongById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createLaoDong.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createLaoDong.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createLaoDong.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateLaoDong.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateLaoDong.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateLaoDong.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteLaoDong.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = laoDongTriLieuSlice.actions;
export default laoDongTriLieuSlice.reducer;

