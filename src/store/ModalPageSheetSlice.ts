import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalPageSheetStateType {
  modalPageSheet: boolean;
}

const initialState: ModalPageSheetStateType = {
  modalPageSheet: false,
};

export const ModalPageSheetSlice = createSlice({
  name: "modalPageSheet",
  initialState,
  reducers: {
    showModalPageSheet: (state: { modalPageSheet: boolean }) => {
      state.modalPageSheet = true;
    },
    hideModalPageSheet: (state: { modalPageSheet: boolean }) => {
      state.modalPageSheet = false;
    },
  },
});

export const { showModalPageSheet, hideModalPageSheet } = ModalPageSheetSlice.actions;
export default ModalPageSheetSlice.reducer;
