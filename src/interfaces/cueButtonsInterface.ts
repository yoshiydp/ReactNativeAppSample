export interface CueButtonsNameType {
  cueA: string;
  cueB: string;
  cueC: string;
  cueD: string;
  cueE: string;
}

export interface OnPressEventType {
  onPressActiveCue: (cueType: string, name: string) => void;
  onPressInactiveCue: (cueType: string, name: string) => void;
  onLongPressEvent: (flag: boolean, name: string) => void;
}

export interface SetCueButtonsType {
  cueA: [{ flag: boolean }, { name: string }, { position?: number }];
  cueB: [{ flag: boolean }, { name: string }, { position?: number }];
  cueC: [{ flag: boolean }, { name: string }, { position?: number }];
  cueD: [{ flag: boolean }, { name: string }, { position?: number }];
  cueE: [{ flag: boolean }, { name: string }, { position?: number }];
}
