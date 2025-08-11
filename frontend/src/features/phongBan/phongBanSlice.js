import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchPhongBanList = createAsyncThunk('phongBan/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/phong-ban');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách phòng ban');
  }
});

export const fetchPhongBanById = createAsyncThunk('phongBan/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/phong-ban/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy phòng ban');
  }
});

export const createPhongBan = createAsyncThunk('phongBan/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/phong-ban', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới phòng ban thất bại');
  }
});

export const updatePhongBan = createAsyncThunk('phongBan/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/phong-ban/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật phòng ban thất bại');
  }
});

export const deletePhongBan = createAsyncThunk('phongBan/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/phong-ban/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa phòng ban thất bại');
  }
});

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const phongBanSlice = createSlice({
  name: 'phongBan',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhongBanList.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPhongBanList.fulfilled, (state, action) => { state.loading = false; state.list = action.payload || []; })
      .addCase(fetchPhongBanList.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchPhongBanById.pending, (state) => { state.loading = true; state.error = null; state.current = null; })
      .addCase(fetchPhongBanById.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchPhongBanById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createPhongBan.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createPhongBan.fulfilled, (state, action) => { state.loading = false; if (action.payload) state.list.unshift(action.payload); })
      .addCase(createPhongBan.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updatePhongBan.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updatePhongBan.fulfilled, (state, action) => { state.loading = false; const u = action.payload; state.list = state.list.map((x) => (x.id === u.id ? u : x)); state.current = u; })
      .addCase(updatePhongBan.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deletePhongBan.fulfilled, (state, action) => { state.list = state.list.filter((x) => x.id !== action.payload); if (state.current?.id === action.payload) state.current = null; });
  },
});

export const { clearCurrent } = phongBanSlice.actions;
export default phongBanSlice.reducer;

