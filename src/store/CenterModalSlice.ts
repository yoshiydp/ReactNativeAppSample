import { createSlice } from '@reduxjs/toolkit';

interface CenterModalStateType {
  centerModal: boolean;
};

const initialState: CenterModalStateType = {
  centerModal: false,
};

export const CenterModalSlice = createSlice({
  name: 'CenterModal',
  initialState,
  reducers: {
    showCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = true;
    },
    hideCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = false;
    }
  }
});

export const { showCenterModal, hideCenterModal } = CenterModalSlice.actions;
export default CenterModalSlice.reducer;
