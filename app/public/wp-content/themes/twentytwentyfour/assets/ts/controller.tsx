import {
  bState,
  nullishHTMLEl,
  rDispatch,
  voidishHtmlEl,
} from "./lib/declarations/types";
import { htmlElementNotFound, typeError } from "./lib/handlers/handlersErrors";
import { checkBState, isClickOutside } from "./lib/handlers/handlersCommon";
import {
  DocumentData,
  sessionObj,
  userObj,
} from "./lib/declarations/interfaces";
import { RootObj } from "./lib/declarations/interfacesRedux";

export const roots: RootObj = {};
export const gUser: userObj = {
  currentUser: undefined,
};
export const gSessionProvider: sessionObj = {
  activeProvider: {},
};
export const documentData: DocumentData = {
  rem: 16,
  autoFormatting: {
    isAutoCapitalizeOn: true,
  },
  inpValidations: new Map(),
  accordionRefs: {},
  carouselImgs: {},
};
export const imgFormats = new Set<string>([
  "jpeg",
  "jpg",
  "png",
  "gif",
  "svg",
  "webp",
  "bmp",
  "ico",
  "tiff",
  "heif",
  "avif",
  "pdf",
]);

export function addModalSwitchListening(
  el: nullishHTMLEl,
  dispatch: rDispatch<boolean>,
  state: boolean = true,
  context = "Undefined Dialog"
): void {
  try {
    if (!(el instanceof HTMLDialogElement))
      throw htmlElementNotFound(
        el,
        `Current reference for ${context} in useEffect`,
        ["<dialog>"]
      );
    state && el.showModal();
    addEventListener("keypress", (p) => {
      if (p.key === "Escape") {
        dispatch(!state);
        !state && el.close();
      }
    });
  } catch (e) {
    console.error(`Error on useEffect for ${context} Ref:
    ${(e as Error).message}`);
  }
}

export function addModalClickSwitch(
  el: nullishHTMLEl,
  click: MouseEvent | React.MouseEvent<EventTarget, MouseEvent>,
  dispatch: rDispatch<boolean>,
  state: boolean = true,
  context = "Undefined Dialog"
): void {
  try {
    if (!(el instanceof Element))
      throw htmlElementNotFound(
        el,
        `Current reference for ${context} in onClick`,
        ["<dialog>"]
      );
    if (
      el instanceof HTMLDialogElement &&
      isClickOutside(click, el).some((coord) => coord === true)
    ) {
      dispatch(!state);
      !state && el.close();
    }
  } catch (e) {
    console.error(
      `Error calling onClick for Login Dialog Ref:${(e as Error).message}`
    );
  }
}

export function initCloseableDlg(
  dlg: voidishHtmlEl,
  state: bState,
  dispatch: rDispatch<bState>,
  dCase?: string
): void {
  try {
    if (!(dlg instanceof HTMLDialogElement))
      throw htmlElementNotFound(
        dlg,
        `validation of dlg argument for initCloseableDlg`,
        ["HTMLDialogElement"]
      );
    if (
      !(
        typeof state === "boolean" ||
        (typeof state === "object" &&
          Object.values(state).some((prop) => typeof prop === "boolean"))
      )
    )
      throw typeError(
        state,
        `validation of state argument for initCloseableDlg`,
        ["boolean", "BoolState"]
      );
    if (typeof state === "object" && !(typeof dCase === "string"))
      throw typeError(
        dCase,
        `validation of cases argument in initCloseableDlg`,
        ["string[]"]
      );
    if (!(typeof dispatch === "function"))
      throw typeError(
        dispatch,
        `validation of dispatch argument for initCloseabelDlg`,
        ["function"]
      );
    addEventListener("keypress", (ev) => {
      if (ev.key === "ESCAPE") {
        checkBState(state, dispatch, dCase);
        !state && dlg.close();
      }
    });
    const handleClickOutside = (ev: MouseEvent) => {
      if (isClickOutside(ev, dlg).some((coord) => coord === true)) {
        checkBState(state, dispatch, dCase);
        !state && dlg.close();
        removeEventListener("click", handleClickOutside);
      }
    };
    dlg.addEventListener("click", handleClickOutside);
  } catch (e) {
    console.error(`Error executing initCloseableDlg:\n${(e as Error).message}`);
  }
}
