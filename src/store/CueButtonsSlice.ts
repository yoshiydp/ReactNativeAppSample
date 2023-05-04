import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { SetCueButtonsType } from "interfaces/cueButtonsInterface";

const initialState: SetCueButtonsType = {
  cueA: [{ flag: false }, { name: "" }, { position: 0 }],
  cueB: [{ flag: false }, { name: "" }, { position: 0 }],
  cueC: [{ flag: false }, { name: "" }, { position: 0 }],
  cueD: [{ flag: false }, { name: "" }, { position: 0 }],
  cueE: [{ flag: false }, { name: "" }, { position: 0 }],
};

export const CueButtonsSlice = createSlice({
  name: "cueButtons",
  initialState,
  reducers: {
    setCueA: (
      state,
      action: PayloadAction<[{ flag: boolean }, { name: string }, { position?: number }]>,
    ) => {
      state.cueA.splice(0);
      if (!state.cueA.length) {
        state.cueA.push(...action.payload);
      }
    },
    setCueB: (
      state,
      action: PayloadAction<[{ flag: boolean }, { name: string }, { position?: number }]>,
    ) => {
      state.cueB.splice(0);
      if (!state.cueB.length) {
        state.cueB.push(...action.payload);
      }
    },
    setCueC: (
      state,
      action: PayloadAction<[{ flag: boolean }, { name: string }, { position?: number }]>,
    ) => {
      state.cueC.splice(0);
      if (!state.cueC.length) {
        state.cueC.push(...action.payload);
      }
    },
    setCueD: (
      state,
      action: PayloadAction<[{ flag: boolean }, { name: string }, { position?: number }]>,
    ) => {
      state.cueD.splice(0);
      if (!state.cueD.length) {
        state.cueD.push(...action.payload);
      }
    },
    setCueE: (
      state,
      action: PayloadAction<[{ flag: boolean }, { name: string }, { position?: number }]>,
    ) => {
      state.cueE.splice(0);
      if (!state.cueE.length) {
        state.cueE.push(...action.payload);
      }
    },
  },
});

export const { setCueA, setCueB, setCueC, setCueD, setCueE } = CueButtonsSlice.actions;
export default CueButtonsSlice.reducer;
