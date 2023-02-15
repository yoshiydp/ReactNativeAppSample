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
      if (!state.myProjectsItems.length) {
        state.myProjectsItems.push(...action.payload);
      }
    },
    setMyProjectsFilterItems: (state, action: PayloadAction<string>) => {
      const filterItems = state.myProjectsItems.filter((items: MyProjectsItemsType) =>
        Object.values(items).some(
          (item: string) => item?.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1,
        ),
      );
      state.myProjectsItems.splice(0);
      state.myProjectsItems.push(...filterItems);
      return;
    },
  },
});

export const { setMyProjectsItems, setMyProjectsFilterItems } = MyProjectsItemsSlice.actions;
export default MyProjectsItemsSlice.reducer;
