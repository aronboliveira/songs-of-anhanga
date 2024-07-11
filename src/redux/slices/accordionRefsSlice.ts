import { createSlice } from "@reduxjs/toolkit";
import {
  AccordionRefsAction,
  AccordionRefsState,
} from "../../lib/declarations/interfacesRedux";

export const accordionRefsSlice = createSlice({
  name: "accordionRefs",
  initialState: {} as AccordionRefsState,
  reducers: {
    setAccordionRef(s: AccordionRefsState, a: AccordionRefsAction) {
      s[a.payload.k] = a.payload.v;
    },
  },
});
export const { setAccordionRef } = accordionRefsSlice.actions;
export default accordionRefsSlice.reducer;
