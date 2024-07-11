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
import {
  AccordionRefsState,
  RootObj,
  StoreStateConfiguration,
} from "./interfacesRedux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export interface IdentifElement {
  idf: string;
}

export interface inpFillings extends IdentifElement {
  filled: boolean;
}

export interface DocumentProps {
  html: string;
  head?: (JSX.Element | null)[];
  styles?:
    | JSX.Element
    | ReactElement<any, string | JSXElementConstructor<any>>[]
    | ReactFragment;
}

export interface GameAppProps extends AppProps {
  pageProps: Record<string, any>;
}

export interface User {
  #userClass: string;
  #userName: string;
  #userEmail: string;
}

export interface roUser extends Readonly<User> {}

export interface userObj {
  currentUser?: roUser;
}

export interface StorageProvider {
  [k: string]: DataProvider | undefined;
}

export interface sessionObj {
  activeProvider: StorageProvider;
}

export interface DocumentData {
  rem: number;
  autoFormatting: {
    isAutoCapitalizeOn: boolean;
  };
  inpValidations: Map<string, InputValidationDesc>;
  accordionRefs: {
    [k: string]: string;
  };
  carouselImgs: {
    [k: string]: string[];
  };
}

export interface RouterSelectState {
  router: NextRouterInstance;
}

export interface AppContextProps extends RouterSelectState {}

export interface RoutedProps extends Partial<RouterSelectState> {
  routerState?: NextRouterInstance | string | function;
  isServerComponent?: boolean;
}

export interface MainComponent extends React.Element {
  root: LoginMainBodyProps;
}

export interface InputValidationDesc {
  inpId: string;
  inpValue: string;
  inpValidity: boolean;
  inpName?: string;
}

export interface GenericErrorProps {
  message: string;
}

export interface RetryErrorComponentProps extends Readonly<GenericErrorProps> {
  altRoot: Root | undefined;
  altJsx: JSX.Element | Element | Component | undefined;
}

export interface LoginMainBodyProps extends RoutedProps {
  root: Root;
}

export abstract class ParentComponent extends React.Component<LoginMainBodyProps> {}

export interface GenericComponentProps extends LoginMainBodyProps {
  ParentComponentName: string;
  ParentComponent?: typeof ParentComponent;
}

export interface HeaderMainProps extends IdentifElement, LoginMainBodyProps {}

export interface HeaderSubtypeProps extends RoutedProps {
  selectors?: {
    accordionSelector: AccordionRefsState;
    rootSelector: RootObj;
  };
  dispatch?: ThunkDispatch<object, any, Action>;
}

export interface LogoProps {
  logoCase: "spread" | "accordion";
}

export interface CarouselProps extends GenericComponentProps {
  imgNames: string[];
}

export interface DialogProps {
  dispatch: Dispatch<SetStateAction<boolean | string | number>>;
  state: boolean;
}

export interface DialogReducedProps extends Pick<DialogProps, "dispatch"> {
  dispatch: Dispatch<SetStateAction<boolean | string | number>>;
  state: BoolState;
}

export interface ResetDlgProps extends DialogProps {
  relForm: nullishForm;
}

export interface DynamicDialogProps extends DialogProps {
  id?: string;
  nFigs?: number;
  tab?: string;
}

export interface RoutedDialogProps extends DialogProps, RoutedProps {}

export interface CharsModalProps extends DynamicDialogProps, RoutedProps {}

export interface GridProps {
  id: string;
  tab: string;
  nFigs: number;
  router: NextRouter;
}

export interface SectCharsProps extends Pick<GridProps, "nFigs"> {
  initialIds: FigureCharsProps[];
  router: NextRouter;
}

export interface FileProps {
  name: string;
  extension: validImgExntesions;
}

export interface FigureCharsProps extends Pick<Partial<FileProps, "name">> {
  mainPart: string;
  extension: validImgExntesions;
  router: NextRouter;
  prefix?: string;
}

export interface SectCharsAction {
  type: string;
  payload: FigureCharsProps[];
}

export interface CharsState {
  sectionId: string;
  ids: FigureCharsProps[];
}

export interface CharsAction extends Pick<CharsState, "ids"> {
  initialState: CharsState;
}

export interface FigPanel {
  name: string;
}

export interface ClassPanelProps extends Partial<FigPanel> {
  className: string;
  imgDir: string[];
  captions?: string | React.Element[] | JSX.Element[];
}

export interface ClassFigureProps {
  imgSrc: string;
  idf: string;
  caption?: string | React.Element[] | JSX.Element[];
}

export interface ClassDescriptionProps {
  className: string;
  is: string;
  focus: string;
  have?: string;
  ability?: string;
  complement?: string;
}

export interface SubclassesListProps {
  num: string;
  subclasses: string[];
  mainclass: string;
}

export interface CarouselImgProps {
  fullName: string;
  subDir: string;
}

export interface LinkProps {
  innerTextL: string;
  href: string;
  target: "_self" | "_blank" | "_parent" | "_top";
  hreflang?: string;
  download?: boolean;
  referrerPolicy?: string;
  rel?: string;
  color?: string;
}

export interface LinkDlgProps extends LinkProps {
  ComponentCase: mainFooterCases;
}

export interface LinkIconProps extends LinkProps {
  iconCase: string;
}

export interface LinkSocialIconProps extends LinkProps {
  iconCase: socialMedia;
}

export interface BoolState {
  isOpen: boolean;
}

export interface Action {
  type: "TOGGLE" | "SET_CASE";
}

export interface MainFooterToogleActions {
  type:
    | "TOGGLE"
    | "TOGGLE_AUTHORS"
    | "TOGGLE_CONTACT"
    | "TOGGLE_COOKIES"
    | "TOGGLE_TEAM"
    | "TOGGLE_TERMS"
    | "SET_CASE";
}

export interface CaseAction extends Action {
  payload: string;
}

export interface MainFooterToogleCaseActions
  extends MainFooterToogleActions,
    Pick<CaseAction, "payload"> {}

export interface SpinnerComponentProps {
  spinnerClass: spinnerAnimationClasses;
  spinnerColor: spinnerColorClasses;
  message: string;
}
