import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hocVienService } from '../../api/apiService';

// Async thunks
export const fetchHocVien = createAsyncThunk(
  'hocVien/fetchHocVien',
  async (params, { rejectWithValue }) => {
    try {
      const response = await hocVienService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch hoc vien');
    }
  }
);

export const fetchHocVienById = createAsyncThunk(
  'hocVien/fetchHocVienById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await hocVienService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch hoc vien');
    }
  }
);

export const createHocVien = createAsyncThunk(
  'hocVien/createHocVien',
  async (data, { rejectWithValue }) => {
    try {
      const response = await hocVienService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create hoc vien');
    }
  }
);

export const updateHocVien = createAsyncThunk(
  'hocVien/updateHocVien',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await hocVienService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update hoc vien');
    }
  }
);

export const deleteHocVien = createAsyncThunk(
  'hocVien/deleteHocVien',
  async (id, { rejectWithValue }) => {
    try {
      await hocVienService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete hoc vien');
    }
  }
);

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
  success: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  }
};

const hocVienSlice = createSlice({
  name: 'hocVien',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearCurrent: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHocVien.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || action.payload;
        if (action.payload.total !== undefined) {
          state.pagination = {
            total: action.payload.total,
            page: action.payload.page,
            limit: action.payload.limit,
            totalPages: action.payload.totalPages
          };
        }
      })
      .addCase(fetchHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchHocVienById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHocVienById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchHocVienById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHocVien.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo học viên thành công';
      })
      .addCase(createHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHocVien.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật học viên thành công';
      })
      .addCase(updateHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteHocVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHocVien.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa học viên thành công';
      })
      .addCase(deleteHocVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = hocVienSlice.actions;
export default hocVienSlice.reducer;

