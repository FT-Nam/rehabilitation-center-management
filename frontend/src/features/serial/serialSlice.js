import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serialService } from '../../api/apiService';

// Async thunks
export const fetchSerial = createAsyncThunk(
  'serial/fetchSerial',
  async (params, { rejectWithValue }) => {
    try {
      const response = await serialService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch serial');
    }
  }
);

export const fetchSerialById = createAsyncThunk(
  'serial/fetchSerialById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await serialService.fetchById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch serial');
    }
  }
);

export const createSerial = createAsyncThunk(
  'serial/createSerial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serialService.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create serial');
    }
  }
);

export const updateSerial = createAsyncThunk(
  'serial/updateSerial',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await serialService.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update serial');
    }
  }
);

export const deleteSerial = createAsyncThunk(
  'serial/deleteSerial',
  async (id, { rejectWithValue }) => {
    try {
      await serialService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete serial');
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

const serialSlice = createSlice({
  name: 'serial',
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
      .addCase(fetchSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSerial.fulfilled, (state, action) => {
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
      .addCase(fetchSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch by ID
      .addCase(fetchSerialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSerialById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchSerialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.success = 'Tạo serial thành công';
      })
      .addCase(createSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSerial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.current = action.payload;
        state.success = 'Cập nhật serial thành công';
      })
      .addCase(updateSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteSerial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSerial.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.success = 'Xóa serial thành công';
      })
      .addCase(deleteSerial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrent } = serialSlice.actions;
export default serialSlice.reducer;
