import { createSlice } from "@reduxjs/toolkit";
import {
  CarouselImgsAction,
  CarouselImgsState,
} from "../../lib/declarations/interfacesRedux";

export const carouselImgsSlice = createSlice({
  name: "carouselImgs",
  initialState: {} as CarouselImgsState,
  reducers: {
    setCarouselImg(s: CarouselImgsState, a: CarouselImgsAction) {
      s[a.payload.v] = a.payload.v;
    },
  },
});
export const { setCarouselImg } = carouselImgsSlice.actions;
export default carouselImgsSlice.reducer;
