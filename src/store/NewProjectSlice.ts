import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { NewProjectType } from "interfaces/newProjectInterface";

const initialState: NewProjectType = {
  artWork: [],
  projectTitle: "",
  trackDataFile: [],
};

export const NewProjectSlice = createSlice({
  name: "newProject",
  initialState,
  reducers: {
    setArtWork: (state, action: PayloadAction<any[]>) => {
      state.artWork.splice(0);
      if (!state.artWork.length) state.artWork.push(...action.payload);
    },
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload;
    },
    setTrackDataFile: (state, action: PayloadAction<any[]>) => {
      state.trackDataFile.splice(0);
      if (!state.trackDataFile.length) state.trackDataFile.push(...action.payload);
    },
  },
});

export const { setArtWork, setProjectTitle, setTrackDataFile } = NewProjectSlice.actions;
export default NewProjectSlice.reducer;
