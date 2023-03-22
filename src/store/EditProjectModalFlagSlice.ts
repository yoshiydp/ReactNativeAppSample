import { createSlice } from "@reduxjs/toolkit";

interface ModalFlag {
  modalFlag: boolean;
}

const initialState: ModalFlag = {
  modalFlag: false,
};

export const EditProjectModalFlagSlice = createSlice({
  name: "editProjectModalFlag",
  initialState,
  reducers: {
    activeEditProjectModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = true;
    },
    inactiveEditProjectModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = false;
    },
  },
});

export const { activeEditProjectModalFlag, inactiveEditProjectModalFlag } =
  EditProjectModalFlagSlice.actions;
export default EditProjectModalFlagSlice.reducer;
