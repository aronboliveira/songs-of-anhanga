import {
  Middleware,
  StoreEnhancer,
  Tuple,
  configureStore,
} from "@reduxjs/toolkit";
import { ThunkMiddleware } from "@reduxjs/toolkit";
import { UnknownAction } from "@reduxjs/toolkit";
import landingSlice, { iniLandingState } from "./slices/landingSlice";
import { LandingStoreState } from "src/lib/declarations/interfacesRedux";
const loggerMiddleware: Middleware<{}, LandingStoreState> =
    store => next => action => {
      console.log("[Middleware] Dispatching action:", action);
      const result = next(action);
      console.log("[Middleware] Next state:", store.getState());
      return result;
    },
  loggerEnhancer: StoreEnhancer = createStore => (reducer, preloadedState) => {
    console.log("[Enhancer] Creating store...");
    const store = createStore(reducer, preloadedState);
    console.log("[Enhancer] Initial state:", store.getState());
    return store;
  };
export const landingStore = configureStore<
  LandingStoreState,
  UnknownAction,
  Tuple<
    [
      ThunkMiddleware<LandingStoreState, UnknownAction>,
      Middleware<{}, LandingStoreState>
    ]
  >
>({
  preloadedState: iniLandingState,
  reducer: landingSlice.reducer,
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(loggerEnhancer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
