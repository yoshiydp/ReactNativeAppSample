import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { TrackListDetailType } from "interfaces/trackListInterface";

const initialState: TrackListDetailType = {
  trackDataPath: "",
  trackTitle: "",
  artistName: "",
  artWorkPath: "",
  linkedMyProjects: [
    {
      projectTitle: "",
    },
  ],
};

export const TrackListDetailSlice = createSlice({
  name: "trackListDetail",
  initialState,
  reducers: {
    setTrackListDetail: (state, action: PayloadAction<TrackListDetailType>) => {
      const {
        trackDataPath,
        trackTitle,
        artistName,
        artWorkPath,
        linkedMyProjects: [{ projectTitle }],
      } = action.payload;

      Object.assign(state, {
        trackDataPath,
        trackTitle,
        artistName,
        artWorkPath,
        linkedMyProjects: [{ projectTitle }],
      });
    },
  },
});

export const { setTrackListDetail } = TrackListDetailSlice.actions;
export default TrackListDetailSlice.reducer;
