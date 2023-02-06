import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';
import centerModalReducer from './CenterModalSlice';
import mainTabMenuReducer from './MainTabMenuSlice';
import myProjectsReducer from './MyProjectsSlice';
import newProjectReducer from './NewProjectSlice';
import overlayReducer from './OverlaySlice';
import SubscribeReducer from './SubscribeSlice';

export const store = configureStore({
  reducer: {
    centerModal: centerModalReducer,
    mainTabMenu: mainTabMenuReducer,
    myProjects: myProjectsReducer,
    newProject: newProjectReducer,
    overlay: overlayReducer,
    subscribe: SubscribeReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
