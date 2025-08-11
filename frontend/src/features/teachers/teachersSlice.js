import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchTeachersList = createAsyncThunk('teachers/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/teachers');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách giáo viên');
  }
});

export const fetchTeacherById = createAsyncThunk('teachers/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/teachers/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy giáo viên');
  }
});

export const createTeacher = createAsyncThunk('teachers/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/teachers', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới giáo viên thất bại');
  }
});

export const updateTeacher = createAsyncThunk('teachers/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/teachers/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật giáo viên thất bại');
  }
});

export const deleteTeacher = createAsyncThunk('teachers/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/teachers/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa giáo viên thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchTeachersList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchTeachersList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchTeachersList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchTeacherById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchTeacherById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchTeacherById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createTeacher.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createTeacher.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createTeacher.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateTeacher.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateTeacher.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateTeacher.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteTeacher.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = teachersSlice.actions;
export default teachersSlice.reducer; 