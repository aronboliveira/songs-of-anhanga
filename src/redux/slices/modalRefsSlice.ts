import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ModalRefsState,
  ModalRefsAction,
} from "../../lib/declarations/interfacesRedux";

export const modalsRefsSlice = createSlice({
  name: "modalRefs",
  initialState: {} as ModalRefsState,
  reducers: {
    setModalRef(s, a: PayloadAction<ModalRefsAction>) {
      s[a.payload.k] = a.payload.v;
    },
  },
});

export const { setModalRef } = modalsRefsSlice.actions;
export default modalsRefsSlice.reducer;
