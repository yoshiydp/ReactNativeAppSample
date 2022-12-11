import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from './UserSlice';
import overlayReducer from './OverlaySlice';
import mainTabMenuReducer from './MainTabMenuSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    overlay: overlayReducer,
    mainTabMenu: mainTabMenuReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
