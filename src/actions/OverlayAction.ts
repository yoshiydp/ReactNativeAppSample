export enum OverlayActionTypes {
  showOverlay,
  hideOverlay,
}

export interface OverlayAction {
  type: OverlayActionTypes;
  payload?: any;
}

export function showOverlay(): OverlayAction {
  return {
    type: OverlayActionTypes.showOverlay,
  };
}

export function hideOverlay(): OverlayAction {
  return {
    type: OverlayActionTypes.hideOverlay,
  };
}
