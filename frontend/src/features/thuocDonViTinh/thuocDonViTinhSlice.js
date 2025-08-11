import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchDonViTinhList = createAsyncThunk('donViTinh/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/don-vi-tinh');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách đơn vị tính');
  }
});

export const fetchDonViTinhById = createAsyncThunk('donViTinh/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/don-vi-tinh/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy bản ghi');
  }
});

export const createDonViTinh = createAsyncThunk('donViTinh/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/don-vi-tinh', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
  }
});

export const updateDonViTinh = createAsyncThunk('donViTinh/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/don-vi-tinh/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
  }
});

export const deleteDonViTinh = createAsyncThunk('donViTinh/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/don-vi-tinh/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const donViTinhSlice = createSlice({
  name: 'donViTinh',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchDonViTinhList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchDonViTinhList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchDonViTinhList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchDonViTinhById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchDonViTinhById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchDonViTinhById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createDonViTinh.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createDonViTinh.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createDonViTinh.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateDonViTinh.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateDonViTinh.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateDonViTinh.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteDonViTinh.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = donViTinhSlice.actions;
export default donViTinhSlice.reducer;

