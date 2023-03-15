import { createSlice } from "@reduxjs/toolkit";

interface ModalProjectSettingsStateType {
  modalProjectSettings: boolean;
}

const initialState: ModalProjectSettingsStateType = {
  modalProjectSettings: false,
};

export const ModalProjectSettingsSlice = createSlice({
  name: "modalProjectSettings",
  initialState,
  reducers: {
    showModalProjectSettings: (state: { modalProjectSettings: boolean }) => {
      state.modalProjectSettings = true;
    },
    hideModalProjectSettings: (state: { modalProjectSettings: boolean }) => {
      state.modalProjectSettings = false;
    },
  },
});

export const { showModalProjectSettings, hideModalProjectSettings } =
  ModalProjectSettingsSlice.actions;
export default ModalProjectSettingsSlice.reducer;
