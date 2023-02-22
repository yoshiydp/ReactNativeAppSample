import { createSlice } from "@reduxjs/toolkit";

interface ModalFlag {
  modalFlag: boolean;
}

const initialState: ModalFlag = {
  modalFlag: false,
};

export const MyProjectsModalFlagSlice = createSlice({
  name: "myProjectsModalFlag",
  initialState,
  reducers: {
    activeMyProjectsModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = true;
    },
    inactiveMyProjectsModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = false;
    },
  },
});

export const { activeMyProjectsModalFlag, inactiveMyProjectsModalFlag } =
  MyProjectsModalFlagSlice.actions;
export default MyProjectsModalFlagSlice.reducer;
