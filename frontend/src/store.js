import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import urlsReducer from './slices/urlsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    urls: urlsReducer
  },
});