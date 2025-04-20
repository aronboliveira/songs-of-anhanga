import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppContextProps, BoolState } from "./interfaces";
import { NextRouter } from "next/router";

export type voidish = null | undefined;
export type looseNum = string | number;
export type voidishStr = string | voidish;
export type voidishLooseNum = looseNum | voidish;
export type voidishEvTarg = EventTarget | voidish;
export type voidishNode = Node | voidish;
export type sizeableNode = Document | Element;
export type langSizeableNode = Document | HTMLElement;
export type nullishEl = Element | null;
export type voidishEl = nullishEl | undefined;
export type nullishHTMLEl = HTMLElement | null;
export type voidishHtmlEl = HTMLElement | voidish;
export type scopeNode = voidishHtmlEl | Document | DocumentFragment;
export type HTMLArticle = HTMLElement & {
  tagName: "ARTICLE";
};
export type HTMLFigure = HTMLElement & {
  tagName: "FIGURE";
};
export type HTMLFooter = HTMLElement & {
  tagName: "FOOTER";
};
export type HTMLHeader = HTMLElement & {
  tagName: "HEADER";
};
export type HTMLNav = HTMLElement & {
  tagName: "NAV";
};
export type HTMLSection = HTMLElement & {
  tagName: "SECTION";
};
export type HTMLMain = HTMLElement & {
  tagName: "MAIN";
};
export type nullishArt = HTMLArticle | null;
export type nullishFig = HTMLFigure | null;
export type nlHeader = HTMLHeader | null;
export type nullishFooter = HTMLFooter | null;
export type nlDiv = HTMLDivElement | null;
export type nullishNav = HTMLNav | null;
export type nullishSect = HTMLSection | null;
export type nlMain = HTMLMain | null;
export type nullishInp = HTMLInputElement | null;
export type voidishInp = nullishInp | undefined;
export type inputLikeEl = HTMLInputElement | HTMLTextAreaElement;
export type entryEl = inputLikeEl | HTMLSelectElement;
export type voidishInpLikeEl = inputLikeEl | voidish;
export type voidishEntryEl = entryEl | voidish;
export type nullishBtn = HTMLButtonElement | null;
export type voidishBtn = nullishBtn | undefined;
export type nullishSpan = HTMLSpanElement | null;
export type nullishDlg = HTMLDialogElement | null;
export type nullishMenu = HTMLMenuElement | null;
export type nullishLi = HTMLLIElement | null;
export type nullishForm = HTMLFormElement | null;
export type nullishImg = HTMLImageElement | null;
export type nullishAnchor = HTMLAnchorElement | null;
export type nullishSvg = SVGElement | null;
export type listableEl = HTMLSelectElement | HTMLDataListElement;
export type voidishSvg = SVGElement | voidish;
export type voidishRoot = Root | undefined | null;
export type voidishJsx = JSX.Element | undefined | null;
export type voidishJSXAr = JSX.Element[] | JSX.Element | null | undefined;
export type rDispatch<T> = Dispatch<SetStateAction<T>>;
export type bState = boolean | BoolState;
export type rMouseEvent = MouseEvent | React.MouseEvent;
export type rSubmitEvent = SubmitEvent | React.FormEvent;
export type voidishAppContext = AppContextProps | undefined;
export type funcVoidishJsx = () => voidishJsx;
export type NextRouterInstance = AppRouterInstance | NextRouter;
export type validImgExntesions =
  | "jpeg"
  | "jpg"
  | "png"
  | "gif"
  | "svg"
  | "webp"
  | "bmp"
  | "ico"
  | "tiff"
  | "heif"
  | "avif"
  | "pdf"
  | "invalidExtension";
export type numSets = "whole" | "natural" | "integer" | "rational" | "real";
export type spinnerAnimationClasses = "spinner-border" | "spinner-grow";
export type spinnerColorClasses =
  | "text-danger"
  | "text-primary"
  | "text-secondary"
  | "text-success"
  | "text-warning"
  | "text-info"
  | "text-light"
  | "text-dark"
  | "";
export type socialMedia =
  | "discord"
  | "instagram"
  | "facebook"
  | "twitter"
  | "youtube"
  | "twitch";
export type mainFooterCases =
  | "authors"
  | "contact"
  | "cookies"
  | "team"
  | "terms";
export type pagesCases = "home" | "new-user" | "active-user" | "classes" | "/";
export type FourNumCases = 0 | 1 | 2 | 3;
