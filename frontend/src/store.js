import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // This key ('user') is how you'll access user state
  },
});