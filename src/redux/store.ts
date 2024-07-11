import {
  Action,
  EnhancedStore,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import routerReducer from "./slices/routerSlice";
import modalRefsReducer from "./slices/modalRefsSlice";
import rootsReducer from "./slices/rootsSlice";
import accordionRefsReducer from "./slices/accordionRefsSlice";
import carouselImgsReducer from "./slices/carouselImgsSlice";
import {
  StoreReduceConfiguration,
  StoreStateConfiguration,
} from "../lib/declarations/interfacesRedux";
import mainComponentsReducer from "./slices/mainComponentsSlice";
import { AppReducer } from "src/lib/declarations/typesRedux";

export const rootReducer: AppReducer =
  combineReducers<StoreReduceConfiguration>({
    accordionRefs: accordionRefsReducer,
    carouselImgs: carouselImgsReducer,
    mainComponents: mainComponentsReducer,
    modalRefs: modalRefsReducer,
    roots: rootsReducer,
    router: routerReducer,
  } as StoreReduceConfiguration);
export const store: EnhancedStore<StoreStateConfiguration, Action> =
  configureStore({
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {
      accordionRefs: {},
      carouselImgs: {},
      mainComponents: { currentComponent: "LoginMainBody" },
      modalRefs: {},
      roots: {},
      router: {
        pathname: "",
        query: {},
        asPath: "",
      },
    } as StoreStateConfiguration,
    reducer: rootReducer as AppReducer,
    // enhancers: [enhancer1, enhancer2],
    // middleware: () => undefined,
  });
export default store;
