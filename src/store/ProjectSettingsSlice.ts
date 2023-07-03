import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectSettingsType {
  artWorkPath: string;
  projectTitle: string;
  trackDataPath: string;
}

const initialState: ProjectSettingsType = {
  artWorkPath: "",
  projectTitle: "",
  trackDataPath: "",
};

export const ProjectSettingsSlice = createSlice({
  name: "projectSettings",
  initialState,
  reducers: {
    setProjectSettingsArtWorkPath: (state, action: PayloadAction<string>) => {
      state.artWorkPath = action.payload;
    },
    setProjectSettingsTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload;
    },
    setProjectSettingsTrackDataPath: (state, action: PayloadAction<string>) => {
      state.trackDataPath = action.payload;
    },
  },
});

export const {
  setProjectSettingsArtWorkPath,
  setProjectSettingsTitle,
  setProjectSettingsTrackDataPath,
} = ProjectSettingsSlice.actions;
export default ProjectSettingsSlice.reducer;
