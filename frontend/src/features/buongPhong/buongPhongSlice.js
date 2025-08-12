import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buongPhongService } from '../../api/apiService';

// Async thunks
export const fetchBuongPhong = createAsyncThunk(
  'buongPhong/fetchBuongPhong',
  async (params, { rejectWithValue }) => {
    try {
      const response = await buongPhongService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch buong phong');
    }
  }
);

export const fetchBuongPhongById = createAsyncThunk(
  'buongPhong/fetchBuongPhongById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await buongPhongService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch buong phong');
    }
  }
);

export const createBuongPhong = createAsyncThunk(
  'buongPhong/createBuongPhong',
  async (data, { rejectWithValue }) => {
    try {
      const response = await buongPhongService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create buong phong');
    }
  }
);

export const updateBuongPhong = createAsyncThunk(
  'buongPhong/updateBuongPhong',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await buongPhongService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update buong phong');
    }
  }
);

export const deleteBuongPhong = createAsyncThunk(
  'buongPhong/deleteBuongPhong',
  async (id, { rejectWithValue }) => {
    try {
      await buongPhongService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete buong phong');
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

const buongPhongSlice = createSlice({
  name: 'buongPhong',
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
      .addCase(fetchBuongPhong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuongPhong.fulfilled, (state, action) => {
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
      .addCase(fetchBuongPhong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchBuongPhongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuongPhongById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchBuongPhongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createBuongPhong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBuongPhong.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo buồng phòng thành công';
      })
      .addCase(createBuongPhong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateBuongPhong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuongPhong.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật buồng phòng thành công';
      })
      .addCase(updateBuongPhong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteBuongPhong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuongPhong.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa buồng phòng thành công';
      })
      .addCase(deleteBuongPhong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = buongPhongSlice.actions;
export default buongPhongSlice.reducer;
