import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { danhMucTaiSanService } from '../../api/apiService';

// Async thunks
export const fetchDanhMucTaiSan = createAsyncThunk(
  'danhMucTaiSan/fetchDanhMucTaiSan',
  async (params, { rejectWithValue }) => {
    try {
      const response = await danhMucTaiSanService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch danh muc tai san');
    }
  }
);

export const fetchDanhMucTaiSanById = createAsyncThunk(
  'danhMucTaiSan/fetchDanhMucTaiSanById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await danhMucTaiSanService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch danh muc tai san');
    }
  }
);

export const createDanhMucTaiSan = createAsyncThunk(
  'danhMucTaiSan/createDanhMucTaiSan',
  async (data, { rejectWithValue }) => {
    try {
      const response = await danhMucTaiSanService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create danh muc tai san');
    }
  }
);

export const updateDanhMucTaiSan = createAsyncThunk(
  'danhMucTaiSan/updateDanhMucTaiSan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await danhMucTaiSanService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update danh muc tai san');
    }
  }
);

export const deleteDanhMucTaiSan = createAsyncThunk(
  'danhMucTaiSan/deleteDanhMucTaiSan',
  async (id, { rejectWithValue }) => {
    try {
      await danhMucTaiSanService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete danh muc tai san');
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

const danhMucTaiSanSlice = createSlice({
  name: 'danhMucTaiSan',
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
      .addCase(fetchDanhMucTaiSan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDanhMucTaiSan.fulfilled, (state, action) => {
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
      .addCase(fetchDanhMucTaiSan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchDanhMucTaiSanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDanhMucTaiSanById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchDanhMucTaiSanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createDanhMucTaiSan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDanhMucTaiSan.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo danh mục tài sản thành công';
      })
      .addCase(createDanhMucTaiSan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateDanhMucTaiSan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDanhMucTaiSan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật danh mục tài sản thành công';
      })
      .addCase(updateDanhMucTaiSan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteDanhMucTaiSan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDanhMucTaiSan.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa danh mục tài sản thành công';
      })
      .addCase(deleteDanhMucTaiSan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = danhMucTaiSanSlice.actions;
export default danhMucTaiSanSlice.reducer;
