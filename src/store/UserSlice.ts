import { createSlice } from '@reduxjs/toolkit';

interface AuthStateType {
  user: null;
};

const initialState: AuthStateType = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default userSlice.reducer;
