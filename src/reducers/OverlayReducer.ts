import { combineReducers } from '@reduxjs/toolkit';
import { OverlayAction, OverlayActionTypes } from '../actions/OverlayAction';

const initialState = {
  isShow: false,
}

function overlayReducer(state = initialState, action: OverlayAction) {
  switch (action.type) {
    case OverlayActionTypes.showOverlay:
      return {
        ...state,
        isShow: true,
      };
    case OverlayActionTypes.hideOverlay: {
      return {
        ...state,
        isShow: false,
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  isShow: overlayReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
