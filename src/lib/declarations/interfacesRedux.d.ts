import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DataProvider } from "./classes";
import {
  NextRouterInstance,
  looseNum,
  mainFooterCases,
  nullishForm,
  socialMedia,
  spinnerAnimationClasses,
  spinnerColorClasses,
  validImgExntesions,
} from "./types";
import { NextRouter } from "next/router";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { Action, AnyAction } from "redux";

export interface LandingStoreState {
  userName: string;
  loggedIn: boolean;
}

export interface AccordionRefsState {
  [k: string]: string;
}

export interface AccordionRefsAction extends Action {
  payload: {
    k: string;
    v: string;
  };
}

export interface CarouselImgsState {
  [k: string]: string;
}

export interface CarouselImgsAction extends Action {
  payload: {
    k: string;
    v: string;
  };
}

export interface MainComponentState {
  currentComponent: string;
}

export interface MainComponentAction extends Action {
  payload: {
    v: string;
  };
}

export interface ModalRefsState {
  [k: string]: string[];
}

export interface ModalRefsAction extends Action {
  k: string;
  v: string[];
}

export interface RootObj {
  [k: string]: Root;
}

export interface RootAction extends Action {
  payload: {
    k: string;
    v: Root;
  };
}

export interface RootElObj {
  root?: RootObj;
  element?: Element;
}

export interface RouterState {
  pathname: string;
  query: Record<string, any>;
  asPath: string;
}

export interface StoreStateConfiguration {
  accordionRefs: AccordionRefsState;
  carouselImgs: CarouselImgsState;
  mainComponents: MainComponentState;
  modalRefs: ModalRefsState;
  roots: RootObj;
  router: RouterState;
}

export interface StoreReduceConfiguration {
  accordionRefs: Reducer<AccordionRefsState>;
  carouselImgs: Reducer<CarouselImgsState>;
  mainComponents: Reducer<MainComponentState>;
  modalRefs: Reducer<ModalRefsState>;
  roots: Reducer<RootObj>;
  router: Reducer<RouterState>;
}

export interface StoreConfigurations {
  devTools: boolean;
  preloadedState: StoreStateConfiguration;
  reducer: StoreReduceConfiguration;
  middleware?: GetDefaultMiddleware<StoreReduceConfiguration>;
}

export interface AppStoreEnhancerReducer {
  dispatch: ThunkDispatch<StoreStateConfiguration, any, AnyAction>;
}

export interface AppStore<
  StoreStateConfiguration,
  AnyAction,
  AppStoreEnhancerReducer
> {}
