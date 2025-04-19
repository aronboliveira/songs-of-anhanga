import { createSlice } from "@reduxjs/toolkit";
import { LandingStoreState } from "src/lib/declarations/interfacesRedux";
const testUser = "Fodro Notbaggins";
export const iniLandingState: LandingStoreState = {
  userName: testUser,
  loggedIn: false,
};
export const landingSlice = createSlice({
  name: "landing",
  initialState: iniLandingState,
  reducers: {
    login: (s, a) => {
      s.userName = a.payload.name ?? "Anonymous";
      s.loggedIn = true;
    },
    logout: s => {
      s.userName = testUser;
    },
  },
});
export const { login, logout } = landingSlice.actions;
export default landingSlice;
