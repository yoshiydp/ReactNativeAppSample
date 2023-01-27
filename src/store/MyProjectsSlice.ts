import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyProjectsStateType {
  projectTitle: string;
  lyric: string;
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
};

const initialState: MyProjectsStateType = {
  projectTitle: '',
  lyric: '',
  trackDataPath: '',
  trackTitle: '',
  artistName: '',
  artWorkPath: ''
};

export const MyProjectsSlice = createSlice({
  name: 'myProjects',
  initialState,
  reducers: {
    setMyProjectsDetail: (
      state,
      action: PayloadAction<{
        projectTitle: string;
        lyric: string;
        trackDataPath: string;
        trackTitle: string;
        artistName: string;
        artWorkPath: string;
      }>
    ) => {
      const {
        projectTitle,
        lyric,
        trackDataPath,
        trackTitle,
        artistName,
        artWorkPath
      } = action.payload;

      Object.assign(state, {
        projectTitle,
        lyric,
        trackDataPath,
        trackTitle,
        artistName,
        artWorkPath
      });

      // return {
      //   ...state,
      //   projectTitle,
      //   lyric,
      //   trackDataPath,
      //   trackTitle,
      //   artistName,
      //   artWorkPath
      // }
    }
  }
});

export const { setMyProjectsDetail } = MyProjectsSlice.actions;
export default MyProjectsSlice.reducer;
