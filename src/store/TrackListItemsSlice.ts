import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { TrackListItemsType } from "interfaces/trackListInterface";

const initialState: TrackListItemsType = {
  trackListItems: [],
};

export const TrackListItemsSlice = createSlice({
  name: "trackListItems",
  initialState,
  reducers: {
    setTrackListItems: (state, action: PayloadAction<any[]>) => {
      state.trackListItems.splice(0);
      if (!state.trackListItems.length) {
        state.trackListItems.push(...action.payload);
      }
    },
    setTrackListFilterItems: (state, action: PayloadAction<string>) => {
      const filterItems = state.trackListItems.filter((items: TrackListItemsType) =>
        Object.values(items).some(
          (item: string) => item?.indexOf(action.payload.toLowerCase()) !== -1,
        ),
      );
      state.trackListItems.splice(0);
      state.trackListItems.push(...filterItems);
      return;
    },
  },
});

export const { setTrackListItems, setTrackListFilterItems } = TrackListItemsSlice.actions;
export default TrackListItemsSlice.reducer;
