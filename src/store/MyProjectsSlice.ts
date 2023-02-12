import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { MyProjectType } from "interfaces/myProjectInterface";

const initialState: MyProjectType = {
  projectTitle: "",
  lyric: "",
  trackDataPath: "",
  trackTitle: "",
  artistName: "",
  artWorkPath: "",
};

export const MyProjectsSlice = createSlice({
  name: "myProjects",
  initialState,
  reducers: {
    setMyProjectsDetail: (state, action: PayloadAction<MyProjectType>) => {
      const { projectTitle, lyric, trackDataPath, trackTitle, artistName, artWorkPath } =
        action.payload;

      Object.assign(state, {
        projectTitle,
        lyric,
        trackDataPath,
        trackTitle,
        artistName,
        artWorkPath,
      });
    },
  },
});

export const { setMyProjectsDetail } = MyProjectsSlice.actions;
export default MyProjectsSlice.reducer;
