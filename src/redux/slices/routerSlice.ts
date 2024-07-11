import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RouterState } from "../../lib/declarations/interfacesRedux";

export const routerSlice = createSlice({
  name: "router",
  initialState: { pathname: "", query: {}, asPath: "" } as RouterState,
  reducers: {
    setRouter(s, a: PayloadAction<RouterState>) {
      s.pathname = a.payload.pathname || s.pathname;
      s.query = a.payload.query || s.query;
      s.asPath = a.payload.asPath || s.asPath;
    },
  },
});
export const { setRouter } = routerSlice.actions;
export default routerSlice.reducer;
