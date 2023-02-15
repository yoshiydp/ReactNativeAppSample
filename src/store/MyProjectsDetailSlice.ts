import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { MyProjectsDetailType } from "interfaces/myProjectsInterface";

const initialState: MyProjectsDetailType = {
  projectTitle: "",
  lyric: "",
  trackDataPath: "",
  trackTitle: "",
  artistName: "",
  artWorkPath: "",
};

export const MyProjectsDetailSlice = createSlice({
  name: "myProjectsDetail",
  initialState,
  reducers: {
    setMyProjectsDetail: (state, action: PayloadAction<MyProjectsDetailType>) => {
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

export const { setMyProjectsDetail } = MyProjectsDetailSlice.actions;
export default MyProjectsDetailSlice.reducer;
