import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchMedicinesList = createAsyncThunk('medicines/fetchList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/medicines');
    return data?.value || data || [];
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách thuốc');
  }
});

export const fetchMedicineById = createAsyncThunk('medicines/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get(`/medicines/${id}`);
    return data?.value || data || null;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy thuốc');
  }
});

export const createMedicine = createAsyncThunk('medicines/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.post('/medicines', payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Tạo mới thuốc thất bại');
  }
});

export const updateMedicine = createAsyncThunk('medicines/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.put(`/medicines/${id}`, payload);
    return data?.value || data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Cập nhật thuốc thất bại');
  }
});

export const deleteMedicine = createAsyncThunk('medicines/delete', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/medicines/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || 'Xóa thuốc thất bại');
  }
});

const initialState = { list: [], current: null, loading: false, error: null };

const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: { clearCurrent(state) { state.current = null; } },
  extraReducers: (b) => {
    b.addCase(fetchMedicinesList.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(fetchMedicinesList.fulfilled, (s, a) => { s.loading = false; s.list = a.payload || []; })
     .addCase(fetchMedicinesList.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(fetchMedicineById.pending, (s) => { s.loading = true; s.error = null; s.current = null; })
     .addCase(fetchMedicineById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
     .addCase(fetchMedicineById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(createMedicine.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(createMedicine.fulfilled, (s, a) => { s.loading = false; if (a.payload) s.list.unshift(a.payload); })
     .addCase(createMedicine.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(updateMedicine.pending, (s) => { s.loading = true; s.error = null; })
     .addCase(updateMedicine.fulfilled, (s, a) => { s.loading = false; const u = a.payload; s.list = s.list.map((x) => (x.id === u.id ? u : x)); s.current = u; })
     .addCase(updateMedicine.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
     .addCase(deleteMedicine.fulfilled, (s, a) => { s.list = s.list.filter((x) => x.id !== a.payload); if (s.current?.id === a.payload) s.current = null; });
  },
});

export const { clearCurrent } = medicinesSlice.actions;
export default medicinesSlice.reducer; 