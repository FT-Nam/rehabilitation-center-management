import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchClassesList = createAsyncThunk('classes/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/classes');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách lớp học');
  }
});

export const fetchClassById = createAsyncThunk('classes/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/classes/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy lớp học');
  }
});

export const createClass = createAsyncThunk('classes/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/classes', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới lớp học thất bại');
  }
});

export const updateClass = createAsyncThunk('classes/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/classes/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật lớp học thất bại');
  }
});

export const deleteClass = createAsyncThunk('classes/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/classes/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa lớp học thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchClassesList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchClassesList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchClassesList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchClassById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchClassById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchClassById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createClass.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createClass.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createClass.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateClass.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateClass.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateClass.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteClass.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = classesSlice.actions;
export default classesSlice.reducer; 