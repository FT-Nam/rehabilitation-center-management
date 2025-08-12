import { config } from '../config/config';
import { mockAuthData, simulateApiDelay, generateId } from '../utils/mockData';

// Helper function to generate JWT-like token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  return btoa(JSON.stringify(payload)); // Simple base64 encoding for mock
};

// Helper function to decode token
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    return null;
  }
};

// Helper function to validate token
const isTokenValid = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return decoded.exp > Math.floor(Date.now() / 1000);
};

class AuthService {
  constructor() {
    this.mockData = { ...mockAuthData };
    this.token = localStorage.getItem('token');
    this.currentUser = this.token ? this.getCurrentUserFromToken() : null;
  }

  // Login
  async login(credentials) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      const user = this.mockData.users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password &&
        u.isActive
      );

      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Generate token
      const token = generateToken(user);
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.token = token;
      this.currentUser = user;

      return {
        user: { ...user, password: undefined }, // Don't return password
        token,
        message: 'Login successful'
      };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Logout
  async logout() {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      this.token = null;
      this.currentUser = null;

      return { message: 'Logout successful' };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Get current user
  getCurrentUser() {
    if (this.currentUser) {
      return { ...this.currentUser, password: undefined };
    }
    return null;
  }

  // Get current user from token
  getCurrentUserFromToken() {
    if (!this.token) return null;
    
    const decoded = decodeToken(this.token);
    if (!decoded || !isTokenValid(this.token)) {
      this.logout();
      return null;
    }

    const user = this.mockData.users.find(u => u.id === decoded.userId);
    return user ? { ...user, password: undefined } : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null && this.token !== null && isTokenValid(this.token);
  }

  // Check if user has permission
  hasPermission(permission) {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  // Check if user has role
  hasRole(role) {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  // Refresh token (mock implementation)
  async refreshToken() {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      const token = generateToken(this.currentUser);
      localStorage.setItem('token', token);
      this.token = token;

      return { token };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Change password (mock implementation)
  async changePassword(oldPassword, newPassword) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.currentUser) {
        throw new Error('No user logged in');
      }

      const user = this.mockData.users.find(u => u.id === this.currentUser.id);
      if (!user || user.password !== oldPassword) {
        throw new Error('Invalid old password');
      }

      user.password = newPassword;
      this.currentUser.password = newPassword;

      return { message: 'Password changed successfully' };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Get all users (admin only)
  async getUsers() {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.hasPermission('admin')) {
        throw new Error('Access denied');
      }

      return this.mockData.users.map(user => ({ ...user, password: undefined }));
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Create user (admin only)
  async createUser(userData) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.hasPermission('admin')) {
        throw new Error('Access denied');
      }

      const newUser = {
        id: generateId(),
        ...userData,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null
      };

      this.mockData.users.push(newUser);

      return { ...newUser, password: undefined };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Update user (admin only)
  async updateUser(userId, userData) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.hasPermission('admin')) {
        throw new Error('Access denied');
      }

      const userIndex = this.mockData.users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      this.mockData.users[userIndex] = {
        ...this.mockData.users[userIndex],
        ...userData
      };

      return { ...this.mockData.users[userIndex], password: undefined };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }

  // Delete user (admin only)
  async deleteUser(userId) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      if (!this.hasPermission('admin')) {
        throw new Error('Access denied');
      }

      const userIndex = this.mockData.users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      this.mockData.users.splice(userIndex, 1);

      return { message: 'User deleted successfully' };
    } else {
      // Real API call would go here
      throw new Error('Real API not implemented');
    }
  }
}

// Create singleton instance
export const authService = new AuthService();

export default authService;
