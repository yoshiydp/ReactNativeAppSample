import { createSlice } from "@reduxjs/toolkit";

interface ModalFlag {
  modalFlag: boolean;
}

const initialState: ModalFlag = {
  modalFlag: false,
};

export const TrackListModalFlagSlice = createSlice({
  name: "trackListModalFlag",
  initialState,
  reducers: {
    activeTrackListModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = true;
    },
    inactiveTrackListModalFlag: (state: { modalFlag: boolean }) => {
      state.modalFlag = false;
    },
  },
});

export const { activeTrackListModalFlag, inactiveTrackListModalFlag } =
  TrackListModalFlagSlice.actions;
export default TrackListModalFlagSlice.reducer;
