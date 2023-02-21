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
    setMyProjectsModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = true;
    },
  },
});

export const { setMyProjectsModalFlag } = MyProjectsModalFlagSlice.actions;
export default MyProjectsModalFlagSlice.reducer;
