import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiService from '../api.service';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!apiService.getAccessToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      apiService.setTokens(action.payload.accessToken, action.payload.refreshToken);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      // apiService.signOut();
      apiService.clearTokens();
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
