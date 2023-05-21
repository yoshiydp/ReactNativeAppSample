import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
import centerModalReducer from "./CenterModalSlice";
import cueButtonsReducer from "./CueButtonsSlice";
import editCueNameTextFieldReducer from "./EditCueNameTextFieldSlice";
import editProjectModalFlagReducer from "./EditProjectModalFlagSlice";
import loadingFullScreenReducer from "./LoadingFullScreenSlice";
import mainTabMenuReducer from "./MainTabMenuSlice";
import modalPageSheetReducer from "./ModalPageSheetSlice";
import modalProjectSettingsReducer from "./ModalProjectSettingsSlice";
import myProjectsDetailReducer from "./MyProjectsDetailSlice";
import myProjectsItemsReducer from "./MyProjectsItemsSlice";
import myProjectsModalFlagReducer from "./MyProjectsModalFlagSlice";
import newProjectReducer from "./NewProjectSlice";
import overlayReducer from "./OverlaySlice";
import subscribeReducer from "./SubscribeSlice";
import textEditorReducer from "./TextEditorSlice";
import trackListDetailReducer from "./TrackListDetailSlice";
import trackListItemsReducer from "./TrackListItemsSlice";
import trackListModalFlagReducer from "./TrackListModalFlagSlice";

export const store = configureStore({
  reducer: {
    centerModal: centerModalReducer,
    cueButtons: cueButtonsReducer,
    editCueNameTextField: editCueNameTextFieldReducer,
    editProjectModalFlag: editProjectModalFlagReducer,
    loadingFullScreen: loadingFullScreenReducer,
    mainTabMenu: mainTabMenuReducer,
    modalPageSheet: modalPageSheetReducer,
    modalProjectSettings: modalProjectSettingsReducer,
    myProjectsDetail: myProjectsDetailReducer,
    myProjectsItems: myProjectsItemsReducer,
    myProjectsModalFlag: myProjectsModalFlagReducer,
    newProject: newProjectReducer,
    overlay: overlayReducer,
    subscribe: subscribeReducer,
    textEditor: textEditorReducer,
    trackListDetail: trackListDetailReducer,
    trackListItems: trackListItemsReducer,
    trackListModalFlag: trackListModalFlagReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
