import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CenterModalProjectSettingsStateType {
  centerModal: boolean;
  message: string;
  dataTitle: string;
  notes: string;
  submitButtonText: string;
}

const initialState: CenterModalProjectSettingsStateType = {
  centerModal: false,
  message: "",
  dataTitle: "",
  notes: "",
  submitButtonText: "Yes",
};

export const CenterModalProjectSettingsSlice = createSlice({
  name: "centerModalProjectSettings",
  initialState,
  reducers: {
    showCenterModalProjectSettings: (state: { centerModal: boolean }) => {
      state.centerModal = true;
    },
    hideCenterModalProjectSettings: (state: { centerModal: boolean }) => {
      state.centerModal = false;
    },
    setCenterModalProjectSettingsMessage: (
      state: { message: string },
      action: PayloadAction<string>
    ) => {
      state.message = action.payload;
    },
    setCenterModalProjectSettingsDataTitle: (
      state: { dataTitle: string },
      action: PayloadAction<string>
    ) => {
      state.dataTitle = action.payload;
    },
    setCenterModalProjectSettingsNotes: (
      state: { notes: string },
      action: PayloadAction<string>
    ) => {
      state.notes = action.payload;
    },
    setCenterModalProjectSettingsSubmitButtonText: (
      state: { submitButtonText: string },
      action: PayloadAction<string>
    ) => {
      action.payload ? (state.submitButtonText = action.payload) : state.submitButtonText;
    },
  },
});

export const {
  showCenterModalProjectSettings,
  hideCenterModalProjectSettings,
  setCenterModalProjectSettingsMessage,
  setCenterModalProjectSettingsDataTitle,
  setCenterModalProjectSettingsNotes,
  setCenterModalProjectSettingsSubmitButtonText,
} = CenterModalProjectSettingsSlice.actions;
export default CenterModalProjectSettingsSlice.reducer;
