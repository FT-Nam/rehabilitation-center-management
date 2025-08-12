import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { lichSuLuuTruService } from '../../api/apiService';

// Async thunks
export const fetchLichSuLuuTru = createAsyncThunk(
  'lichSuLuuTru/fetchLichSuLuuTru',
  async (params, { rejectWithValue }) => {
    try {
      const response = await lichSuLuuTruService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch lich su luu tru');
    }
  }
);

export const fetchLichSuLuuTruById = createAsyncThunk(
  'lichSuLuuTru/fetchLichSuLuuTruById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await lichSuLuuTruService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch lich su luu tru');
    }
  }
);

export const createLichSuLuuTru = createAsyncThunk(
  'lichSuLuuTru/createLichSuLuuTru',
  async (data, { rejectWithValue }) => {
    try {
      const response = await lichSuLuuTruService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create lich su luu tru');
    }
  }
);

export const updateLichSuLuuTru = createAsyncThunk(
  'lichSuLuuTru/updateLichSuLuuTru',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await lichSuLuuTruService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update lich su luu tru');
    }
  }
);

export const deleteLichSuLuuTru = createAsyncThunk(
  'lichSuLuuTru/deleteLichSuLuuTru',
  async (id, { rejectWithValue }) => {
    try {
      await lichSuLuuTruService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete lich su luu tru');
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

const lichSuLuuTruSlice = createSlice({
  name: 'lichSuLuuTru',
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
      .addCase(fetchLichSuLuuTru.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLichSuLuuTru.fulfilled, (state, action) => {
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
      .addCase(fetchLichSuLuuTru.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchLichSuLuuTruById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLichSuLuuTruById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchLichSuLuuTruById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createLichSuLuuTru.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLichSuLuuTru.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo lịch sử lưu trú thành công';
      })
      .addCase(createLichSuLuuTru.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateLichSuLuuTru.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLichSuLuuTru.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật lịch sử lưu trú thành công';
      })
      .addCase(updateLichSuLuuTru.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteLichSuLuuTru.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLichSuLuuTru.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa lịch sử lưu trú thành công';
      })
      .addCase(deleteLichSuLuuTru.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = lichSuLuuTruSlice.actions;
export default lichSuLuuTruSlice.reducer;
