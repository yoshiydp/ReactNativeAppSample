import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditCueNameTextFieldStateType {
  editCueNameTextField: boolean;
  cueName: string;
}

const initialState: EditCueNameTextFieldStateType = {
  editCueNameTextField: false,
  cueName: "",
};

export const editCueNameTextFieldSlice = createSlice({
  name: "editCueNameTextField",
  initialState,
  reducers: {
    showEditCueNameTextField: (state: { editCueNameTextField: boolean }) => {
      state.editCueNameTextField = true;
    },
    hideEditCueNameTextField: (state: { editCueNameTextField: boolean }) => {
      state.editCueNameTextField = false;
    },
  },
});

export const { showEditCueNameTextField, hideEditCueNameTextField } =
  editCueNameTextFieldSlice.actions;
export default editCueNameTextFieldSlice.reducer;
