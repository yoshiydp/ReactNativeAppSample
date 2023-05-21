import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextValue {
  value: string;
}

const initialState: TextValue = {
  value: "",
};

export const TextEditorSlice = createSlice({
  name: "textEditor",
  initialState,
  reducers: {
    setTextValue: (state: { value: string }, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTextValue } = TextEditorSlice.actions;
export default TextEditorSlice.reducer;
