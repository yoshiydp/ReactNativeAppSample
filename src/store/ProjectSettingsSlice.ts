import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectSettingsType {
  projectTitle: string;
  trackDataPath: string;
}

const initialState: ProjectSettingsType = {
  projectTitle: "",
  trackDataPath: "",
};

export const ProjectSettingsSlice = createSlice({
  name: "projectSettings",
  initialState,
  reducers: {
    setProjectSettingsTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload;
    },
  },
});

export const { setProjectSettingsTitle } = ProjectSettingsSlice.actions;
export default ProjectSettingsSlice.reducer;
