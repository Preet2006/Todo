import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((user: User) => user.username === username)) {
        state.error = 'Username already exists';
        return;
      }

      // Create new user with unique ID
      const newUser = {
        id: crypto.randomUUID(),
        username,
        password, // In a real app, you'd want to hash this password
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login after registration
      state.isAuthenticated = true;
      state.user = username;
      state.error = null;
      localStorage.setItem('currentUser', username);
    },
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const user = users.find((u: User) => u.username === username && u.password === password);
      
      if (user) {
        state.isAuthenticated = true;
        state.user = username;
        state.error = null;
        localStorage.setItem('currentUser', username);
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('currentUser');
    },
    checkAuth: (state) => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        state.isAuthenticated = true;
        state.user = currentUser;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, checkAuth, clearError } = authSlice.actions;
export default authSlice.reducer;