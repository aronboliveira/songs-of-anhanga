import { createSlice } from "@reduxjs/toolkit";
import { RootObj, RootAction } from "../../lib/declarations/interfacesRedux";

export const rootsSlice = createSlice({
  name: "roots",
  initialState: {} as RootObj,
  reducers: {
    setRoot(s: RootObj, a: RootAction) {
      s[a.payload.k] = a.payload.v;
    },
  },
});
export const { setRoot } = rootsSlice.actions;
export default rootsSlice.reducer;
