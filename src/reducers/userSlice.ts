import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from '../models';
import { initialState } from '../constants/initialState';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<StateType>>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
