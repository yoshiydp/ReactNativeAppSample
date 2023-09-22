import { createSlice } from "@reduxjs/toolkit";

interface ModalFlag {
  modalFlag: boolean;
}

const initialState: ModalFlag = {
  modalFlag: false,
};

export const ProjectSettingsModalFlagSlice = createSlice({
  name: "projectSettingsModalFlag",
  initialState,
  reducers: {
    activeProjectSettingsModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = true;
    },
    inactiveProjectSettingsModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = false;
    },
  },
});

export const { activeProjectSettingsModalFlag, inactiveProjectSettingsModalFlag } =
  ProjectSettingsModalFlagSlice.actions;
export default ProjectSettingsModalFlagSlice.reducer;
