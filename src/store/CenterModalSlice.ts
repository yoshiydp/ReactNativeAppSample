import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CenterModalStateType {
  centerModal: boolean;
  title: string;
};

const initialState: CenterModalStateType = {
  centerModal: false,
  title: "",
};

export const CenterModalSlice = createSlice({
  name: 'centerModal',
  initialState,
  reducers: {
    showCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = true;
    },
    hideCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = false;
    },
    setCenterModalTitle: (state: { title: string }, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  }
});

export const { showCenterModal, hideCenterModal, setCenterModalTitle } = CenterModalSlice.actions;
export default CenterModalSlice.reducer;
