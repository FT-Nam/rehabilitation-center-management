import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchHocVienList = createAsyncThunk(
  'hocVien/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get('/hoc-vien');
      return data?.value || data || [];
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Không tải được danh sách');
    }
  },
);

export const fetchHocVienById = createAsyncThunk(
  'hocVien/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get(`/hoc-vien/${id}`);
      return data?.value || data || null;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Không tìm thấy học viên');
    }
  },
);

export const createHocVien = createAsyncThunk(
  'hocVien/create',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/hoc-vien', payload);
      return data?.value || data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Tạo mới thất bại');
    }
  },
);

export const updateHocVien = createAsyncThunk(
  'hocVien/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.put(`/hoc-vien/${id}`, payload);
      return data?.value || data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Cập nhật thất bại');
    }
  },
);

export const deleteHocVien = createAsyncThunk(
  'hocVien/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/hoc-vien/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Xóa thất bại');
    }
  },
);

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const hocVienSlice = createSlice({
  name: 'hocVien',
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch list
      .addCase(fetchHocVienList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHocVienList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchHocVienList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi tải danh sách';
      })
      // fetch by id
      .addCase(fetchHocVienById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchHocVienById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(fetchHocVienById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi tải chi tiết';
      })
      // create
      .addCase(createHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHocVien.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(createHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Tạo mới thất bại';
      })
      // update
      .addCase(updateHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHocVien.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.list = state.list.map((hv) => (hv.id === updated.id ? updated : hv));
        state.current = updated;
      })
      .addCase(updateHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Cập nhật thất bại';
      })
      // delete
      .addCase(deleteHocVien.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((hv) => hv.id !== id);
        if (state.current?.id === id) state.current = null;
      });
  },
});

export const { clearCurrent } = hocVienSlice.actions;
export default hocVienSlice.reducer;

