import { createSlice } from "@reduxjs/toolkit";

interface OverStateType {
  overlay: boolean;
  inactiveHidden: boolean;
}

const initialState: OverStateType = {
  overlay: false,
  inactiveHidden: false
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    showOverlay: (state: { overlay: boolean }) => {
      state.overlay = true;
    },
    hideOverlay: (state: { overlay: boolean }) => {
      state.overlay = false;
    },
    inactiveHidden: (state: { inactiveHidden: boolean }) => {
      state.inactiveHidden = true;
    },
    activeHidden: (state: { inactiveHidden: boolean }) => {
      state.inactiveHidden = false;
    }
  }
});

export const {
  showOverlay,
  hideOverlay,
  inactiveHidden,
  activeHidden
} = overlaySlice.actions;
export default overlaySlice.reducer;
