import { createSlice } from "@reduxjs/toolkit";
import {
  MainComponentAction,
  MainComponentState,
} from "../../lib/declarations/interfacesRedux";

export const mainComponentsSlice = createSlice({
  name: "mainComponents",
  initialState: {
    currentComponent: "LoginMainBody",
  } as MainComponentState,
  reducers: {
    setMainComponent(s: MainComponentState, a: MainComponentAction): void {
      s.currentComponent = a.payload.v;
    },
  },
});
export const { setMainComponent } = mainComponentsSlice.actions;
export default mainComponentsSlice.reducer;
