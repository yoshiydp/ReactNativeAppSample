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
    setCueName: (state: { cueName: string }, action: PayloadAction<string>) => {
      state.cueName = action.payload;
    },
  },
});

export const { showEditCueNameTextField, hideEditCueNameTextField, setCueName } =
  editCueNameTextFieldSlice.actions;
export default editCueNameTextFieldSlice.reducer;
