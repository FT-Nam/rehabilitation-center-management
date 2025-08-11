import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchStudentsList = createAsyncThunk('students/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/students');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách học viên');
  }
});

export const fetchStudentById = createAsyncThunk('students/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/students/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy học viên');
  }
});

export const createStudent = createAsyncThunk('students/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/students', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới học viên thất bại');
  }
});

export const updateStudent = createAsyncThunk('students/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/students/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật học viên thất bại');
  }
});

export const deleteStudent = createAsyncThunk('students/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/students/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa học viên thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchStudentsList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchStudentsList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchStudentsList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchStudentById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchStudentById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchStudentById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createStudent.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createStudent.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createStudent.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateStudent.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateStudent.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateStudent.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteStudent.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = studentsSlice.actions;
export default studentsSlice.reducer; 