import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { donViTinhService } from '../../api/apiService';

// Async thunks
export const fetchDonViTinh = createAsyncThunk(
  'donViTinh/fetchDonViTinh',
  async (params, { rejectWithValue }) => {
    try {
      const response = await donViTinhService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch don vi tinh');
    }
  }
);

export const fetchDonViTinhById = createAsyncThunk(
  'donViTinh/fetchDonViTinhById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await donViTinhService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch don vi tinh');
    }
  }
);

export const createDonViTinh = createAsyncThunk(
  'donViTinh/createDonViTinh',
  async (data, { rejectWithValue }) => {
    try {
      const response = await donViTinhService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create don vi tinh');
    }
  }
);

export const updateDonViTinh = createAsyncThunk(
  'donViTinh/updateDonViTinh',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await donViTinhService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update don vi tinh');
    }
  }
);

export const deleteDonViTinh = createAsyncThunk(
  'donViTinh/deleteDonViTinh',
  async (id, { rejectWithValue }) => {
    try {
      await donViTinhService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete don vi tinh');
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

const donViTinhSlice = createSlice({
  name: 'donViTinh',
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
      .addCase(fetchDonViTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonViTinh.fulfilled, (state, action) => {
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
      .addCase(fetchDonViTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchDonViTinhById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonViTinhById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchDonViTinhById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createDonViTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDonViTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo đơn vị tính thành công';
      })
      .addCase(createDonViTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateDonViTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDonViTinh.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật đơn vị tính thành công';
      })
      .addCase(updateDonViTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteDonViTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDonViTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa đơn vị tính thành công';
      })
      .addCase(deleteDonViTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = donViTinhSlice.actions;
export default donViTinhSlice.reducer;

