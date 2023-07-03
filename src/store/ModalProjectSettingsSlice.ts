import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalProjectSettingsStateType {
  modalProjectSettings: boolean;
  modalProjectSettingsArtWorkPath: string;
  modalProjectSettingsProjectTitle: string;
  modalProjectSettingsFlagSelectTrackList: boolean;
}

const initialState: ModalProjectSettingsStateType = {
  modalProjectSettings: false,
  modalProjectSettingsArtWorkPath: "",
  modalProjectSettingsProjectTitle: "",
  modalProjectSettingsFlagSelectTrackList: false,
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
    setModalProjectSettingsArtWorkPath: (state, action: PayloadAction<string>) => {
      state.modalProjectSettingsArtWorkPath = action.payload;
    },
    setModalProjectSettingsTitle: (state, action: PayloadAction<string>) => {
      state.modalProjectSettingsProjectTitle = action.payload;
    },
    activeModalProjectSettingsSelectTrackList: (state: {
      modalProjectSettingsFlagSelectTrackList: boolean;
    }) => {
      state.modalProjectSettingsFlagSelectTrackList = true;
    },
    inactiveModalProjectSettingsSelectTrackList: (state: {
      modalProjectSettingsFlagSelectTrackList: boolean;
    }) => {
      state.modalProjectSettingsFlagSelectTrackList = false;
    },
  },
});

export const {
  showModalProjectSettings,
  hideModalProjectSettings,
  setModalProjectSettingsArtWorkPath,
  setModalProjectSettingsTitle,
  activeModalProjectSettingsSelectTrackList,
  inactiveModalProjectSettingsSelectTrackList,
} = ModalProjectSettingsSlice.actions;
export default ModalProjectSettingsSlice.reducer;
