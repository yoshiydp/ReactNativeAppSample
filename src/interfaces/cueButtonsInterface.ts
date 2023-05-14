export interface CueButtonsType {
  flag: boolean;
  name: string;
  position: number;
}

export interface OnPressEventType {
  onPressActivateCue: (cueType: string, name: string) => void;
  onPressPlaybackCue: (cueType: string, name: string) => void;
  onPressInactivateCue: (cueType: string, name: string) => void;
  onLongPressEvent: (cueType: string, flag: boolean, name: string) => void;
}

export interface SetCueButtonsType {
  cueA: [{ flag: boolean }, { name: string }, { position?: number }];
  cueB: [{ flag: boolean }, { name: string }, { position?: number }];
  cueC: [{ flag: boolean }, { name: string }, { position?: number }];
  cueD: [{ flag: boolean }, { name: string }, { position?: number }];
  cueE: [{ flag: boolean }, { name: string }, { position?: number }];
}

export interface SetCueActivityType {
  flag: boolean;
  name: string;
}
