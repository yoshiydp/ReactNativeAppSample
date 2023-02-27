import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CenterModalStateType {
  centerModal: boolean;
  title: string;
  dataTitle: string;
  notes: string;
  notesTrackListDetail: string;
  submitButtonText: string;
}

const initialState: CenterModalStateType = {
  centerModal: false,
  title: "",
  dataTitle: "",
  notes: "",
  notesTrackListDetail: "",
  submitButtonText: "Yes",
};

export const CenterModalSlice = createSlice({
  name: "centerModal",
  initialState,
  reducers: {
    showCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = true;
    },
    hideCenterModal: (state: { centerModal: boolean }) => {
      state.centerModal = false;
    },
    setCenterModalTitle: (state: { title: string }, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCenterModalDataTitle: (state: { dataTitle: string }, action: PayloadAction<string>) => {
      state.dataTitle = action.payload;
    },
    setCenterModalNotes: (state: { notes: string }, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    setCenterModalNoteTrackListDetail: (
      state: { notesTrackListDetail: string },
      action: PayloadAction<string>,
    ) => {
      state.notesTrackListDetail = action.payload;
    },
    setCenterModalSubmitButtonText: (
      state: { submitButtonText: string },
      action: PayloadAction<string>,
    ) => {
      action.payload ? (state.submitButtonText = action.payload) : state.submitButtonText;
    },
  },
});

export const {
  showCenterModal,
  hideCenterModal,
  setCenterModalTitle,
  setCenterModalDataTitle,
  setCenterModalNotes,
  setCenterModalNoteTrackListDetail,
  setCenterModalSubmitButtonText,
} = CenterModalSlice.actions;
export default CenterModalSlice.reducer;
