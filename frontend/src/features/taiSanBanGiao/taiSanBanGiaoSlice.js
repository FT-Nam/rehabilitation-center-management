import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchBanGiaoList = createAsyncThunk('taiSanBanGiao/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/tai-san/ban-giao');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách bàn giao');
  }
});

export const fetchBanGiaoById = createAsyncThunk('taiSanBanGiao/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/tai-san/ban-giao/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bàn giao');
  }
});

export const createBanGiao = createAsyncThunk('taiSanBanGiao/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/tai-san/ban-giao', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới bàn giao thất bại');
  }
});

export const updateBanGiao = createAsyncThunk('taiSanBanGiao/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/tai-san/ban-giao/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật bàn giao thất bại');
  }
});

export const deleteBanGiao = createAsyncThunk('taiSanBanGiao/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tai-san/ban-giao/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa bàn giao thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const taiSanBanGiaoSlice = createSlice({
  name: 'taiSanBanGiao',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchBanGiaoList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchBanGiaoList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchBanGiaoList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchBanGiaoById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchBanGiaoById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchBanGiaoById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createBanGiao.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createBanGiao.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createBanGiao.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateBanGiao.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateBanGiao.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateBanGiao.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteBanGiao.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = taiSanBanGiaoSlice.actions;
export default taiSanBanGiaoSlice.reducer;

