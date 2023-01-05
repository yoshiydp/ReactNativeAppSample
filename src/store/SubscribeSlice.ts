import { createSlice } from '@reduxjs/toolkit';

interface SubscribeStateType {
  subscribe: boolean;
};

const initialState: SubscribeStateType = {
  subscribe: false,
};

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {
    subscribe: (state: { subscribe: boolean }) => {
      state.subscribe = true;
    },
    unsubscribe: (state: { subscribe: boolean }) => {
      state.subscribe = false;
    }
  },
});

export const { subscribe, unsubscribe } = subscribeSlice.actions;
export default subscribeSlice.reducer;
