import { createSlice } from '@reduxjs/toolkit';

interface OverStateType {
  overlay: boolean;
};

const initialState: OverStateType = {
  overlay: false,
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showOverlay: (state: { overlay: boolean }) => {
      state.overlay = true;
    },
    hideOverlay: (state: { overlay: boolean }) => {
      state.overlay = false;
    }
  }
});

export const { showOverlay, hideOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;
