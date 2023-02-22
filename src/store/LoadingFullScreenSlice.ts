import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingFullScreenType {
  loadingFullScreen: boolean;
  message: string;
}

const initialState: LoadingFullScreenType = {
  loadingFullScreen: false,
  message: "",
};

export const loadingFullScreenSlice = createSlice({
  name: "loadingFullScreen",
  initialState,
  reducers: {
    showLoadingFullScreen: (state: { loadingFullScreen: boolean }) => {
      state.loadingFullScreen = true;
    },
    hideLoadingFullScreen: (state: { loadingFullScreen: boolean }) => {
      state.loadingFullScreen = false;
    },
    setLoadingFullScreenMessage: (state: { message: string }, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { showLoadingFullScreen, hideLoadingFullScreen, setLoadingFullScreenMessage } =
  loadingFullScreenSlice.actions;
export default loadingFullScreenSlice.reducer;
