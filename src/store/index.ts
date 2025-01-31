import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import userReducer from '../reducers/userSlice';
import loadingReducer from '../reducers/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
