import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../api/authService';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(oldPassword, newPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Password change failed');
    }
  }
);

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get users');
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await authService.updateUser(userId, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await authService.deleteUser(userId);
      return { userId, ...response };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete user');
    }
  }
);

const initialState = {
  user: authService.getCurrentUser(),
  token: authService.token,
  isAuthenticated: authService.isAuthenticated(),
  loading: false,
  error: null,
  success: null,
  users: [],
  usersLoading: false,
  usersError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearUsersError: (state) => {
      state.usersError = null;
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      state.user = authService.getCurrentUser();
      state.token = authService.token;
      state.isAuthenticated = authService.isAuthenticated();
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.success = 'Logout successful';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Refresh token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // If token refresh fails, logout
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get users
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users.push(action.payload);
        state.success = 'User created successfully';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.success = 'User updated successfully';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = state.users.filter(user => user.id !== action.payload.userId);
        state.success = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearUsersError, initializeAuth } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccess = (state) => state.auth.success;
export const selectUsers = (state) => state.auth.users;
export const selectUsersLoading = (state) => state.auth.usersLoading;
export const selectUsersError = (state) => state.auth.usersError;

export default authSlice.reducer;

