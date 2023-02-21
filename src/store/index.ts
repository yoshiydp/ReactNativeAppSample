import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import centerModalReducer from "./CenterModalSlice";
import loadingFullScreenReducer from "./LoadingFullScreenSlice";
import mainTabMenuReducer from "./MainTabMenuSlice";
import modalPageSheetReducer from "./ModalPageSheetSlice";
import myProjectsDetailReducer from "./MyProjectsDetailSlice";
import myProjectsItemsReducer from "./MyProjectsItemsSlice";
import myProjectsModalFlagReducer from "./MyProjectsModalFlagSlice";
import newProjectReducer from "./NewProjectSlice";
import overlayReducer from "./OverlaySlice";
import subscribeReducer from "./SubscribeSlice";
import trackListDetailReducer from "./TrackListDetailSlice";
import trackListItemsReducer from "./TrackListItemsSlice";

export const store = configureStore({
  reducer: {
    centerModal: centerModalReducer,
    loadingFullScreen: loadingFullScreenReducer,
    mainTabMenu: mainTabMenuReducer,
    modalPageSheet: modalPageSheetReducer,
    myProjectsDetail: myProjectsDetailReducer,
    myProjectsItems: myProjectsItemsReducer,
    myProjectsModalFlag: myProjectsModalFlagReducer,
    newProject: newProjectReducer,
    overlay: overlayReducer,
    subscribe: subscribeReducer,
    trackListDetail: trackListDetailReducer,
    trackListItems: trackListItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
