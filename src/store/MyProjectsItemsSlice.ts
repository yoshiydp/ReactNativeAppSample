import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { MyProjectsItemsType } from "interfaces/myProjectsInterface";

const initialState: MyProjectsItemsType = {
  myProjectsItems: [],
};

export const MyProjectsItemsSlice = createSlice({
  name: "myProjectsItems",
  initialState,
  reducers: {
    setMyProjectsItems: (state, action: PayloadAction<any[]>) => {
      state.myProjectsItems.splice(0);
      if (!state.myProjectsItems.length) state.myProjectsItems.push(...action.payload);
    },
  },
});

export const { setMyProjectsItems } = MyProjectsItemsSlice.actions;
export default MyProjectsItemsSlice.reducer;
