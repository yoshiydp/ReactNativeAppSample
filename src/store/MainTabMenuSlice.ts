import { createSlice } from "@reduxjs/toolkit";

interface MainTabMenuStateType {
  mainTabMenu: boolean;
}

const initialState: MainTabMenuStateType = {
  mainTabMenu: false,
};

export const mainTabMenuSlice = createSlice({
  name: "mainTabMenu",
  initialState,
  reducers: {
    showMainTabMenu: (state: { mainTabMenu: boolean }) => {
      state.mainTabMenu = true;
    },
    hideMainTabMenu: (state: { mainTabMenu: boolean }) => {
      state.mainTabMenu = false;
    }
  }
});

export const { showMainTabMenu, hideMainTabMenu } = mainTabMenuSlice.actions;
export default mainTabMenuSlice.reducer;
