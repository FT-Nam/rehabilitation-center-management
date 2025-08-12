import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { thuocTinhService } from '../../api/apiService';

// Async thunks
export const fetchThuocTinh = createAsyncThunk(
  'thuocTinh/fetchThuocTinh',
  async (params, { rejectWithValue }) => {
    try {
      const response = await thuocTinhService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch thuoc tinh');
    }
  }
);

export const fetchThuocTinhById = createAsyncThunk(
  'thuocTinh/fetchThuocTinhById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await thuocTinhService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch thuoc tinh');
    }
  }
);

export const createThuocTinh = createAsyncThunk(
  'thuocTinh/createThuocTinh',
  async (data, { rejectWithValue }) => {
    try {
      const response = await thuocTinhService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create thuoc tinh');
    }
  }
);

export const updateThuocTinh = createAsyncThunk(
  'thuocTinh/updateThuocTinh',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await thuocTinhService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update thuoc tinh');
    }
  }
);

export const deleteThuocTinh = createAsyncThunk(
  'thuocTinh/deleteThuocTinh',
  async (id, { rejectWithValue }) => {
    try {
      await thuocTinhService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete thuoc tinh');
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

const thuocTinhSlice = createSlice({
  name: 'thuocTinh',
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
      .addCase(fetchThuocTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThuocTinh.fulfilled, (state, action) => {
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
      .addCase(fetchThuocTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchThuocTinhById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThuocTinhById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchThuocTinhById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createThuocTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createThuocTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo thuộc tính thành công';
      })
      .addCase(createThuocTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateThuocTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateThuocTinh.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật thuộc tính thành công';
      })
      .addCase(updateThuocTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteThuocTinh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteThuocTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa thuộc tính thành công';
      })
      .addCase(deleteThuocTinh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = thuocTinhSlice.actions;
export default thuocTinhSlice.reducer;
