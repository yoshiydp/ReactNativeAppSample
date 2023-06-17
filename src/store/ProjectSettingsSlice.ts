import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectSettingsType {
  projectTitle: string;
  trackDataPath: string;
  flagSelectTrackList: boolean;
}

const initialState: ProjectSettingsType = {
  projectTitle: "",
  trackDataPath: "",
  flagSelectTrackList: false,
};

export const ProjectSettingsSlice = createSlice({
  name: "projectSettings",
  initialState,
  reducers: {
    setProjectSettingsTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload;
    },
    activeSelectTrackList: (state: { flagSelectTrackList: boolean }) => {
      state.flagSelectTrackList = true;
    },
    inactiveSelectTrackList: (state: { flagSelectTrackList: boolean }) => {
      state.flagSelectTrackList = false;
    },
  },
});

export const { setProjectSettingsTitle, activeSelectTrackList, inactiveSelectTrackList } =
  ProjectSettingsSlice.actions;
export default ProjectSettingsSlice.reducer;
