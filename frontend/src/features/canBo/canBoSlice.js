import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchCanBoList = createAsyncThunk('canBo/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/can-bo');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách cán bộ');
  }
});

export const fetchCanBoById = createAsyncThunk('canBo/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/can-bo/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy cán bộ');
  }
});

export const createCanBo = createAsyncThunk('canBo/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/can-bo', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới cán bộ thất bại');
  }
});

export const updateCanBo = createAsyncThunk('canBo/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/can-bo/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật cán bộ thất bại');
  }
});

export const deleteCanBo = createAsyncThunk('canBo/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/can-bo/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa cán bộ thất bại');
  }
});

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const canBoSlice = createSlice({
  name: 'canBo',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCanBoList.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCanBoList.fulfilled, (state, action) => { state.loading = false; state.list = action.payload || []; })
      .addCase(fetchCanBoList.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchCanBoById.pending, (state) => { state.loading = true; state.error = null; state.current = null; })
      .addCase(fetchCanBoById.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchCanBoById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createCanBo.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createCanBo.fulfilled, (state, action) => { state.loading = false; if (action.payload) state.list.unshift(action.payload); })
      .addCase(createCanBo.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateCanBo.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateCanBo.fulfilled, (state, action) => { state.loading = false; const u = action.payload; state.list = state.list.map((x) => (x.id === u.id ? u : x)); state.current = u; })
      .addCase(updateCanBo.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(deleteCanBo.fulfilled, (state, action) => { state.list = state.list.filter((x) => x.id !== action.payload); if (state.current?.id === action.payload) state.current = null; });
  },
});

export const { clearCurrent } = canBoSlice.actions;
export default canBoSlice.reducer;

