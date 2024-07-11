import {
  evTargNotFound,
  htmlElementNotFound,
  nodeNotFound,
  numberError,
  stringError,
  typeError,
} from "./handlersErrors";
import {
  bState,
  langSizeableNode,
  pagesCases,
  rDispatch,
  scopeNode,
  voidishEl,
  voidishEvTarg,
  voidishHtmlEl,
} from "../declarations/types";
import { gSessionProvider, roots } from "../controller";
import { Root, createRoot } from "react-dom/client";
import LoginMainBody from "src/components/main/bodies/LoginMainBody";
import NewUserPanel from "src/pages/userPanelNew";
import { DataProvider } from "../declarations/classes";
import ActiveUserPanel from "src/pages/userPanelActive";
import {
  fillSection,
  formatForBst,
  formatForSelectors,
  formatRootIdf,
} from "./handlersFormatFill";
import { fetchEntries } from "./handlersIo";
import { NextRouter } from "next/router";
import { adjustIdentifiers } from "./handlersNormalize";

export function renderLoginBody(router: NextRouter, urlCase: pagesCases): void {
  try {
    const rootElement = document.getElementById("root");
    if (!(rootElement instanceof HTMLElement))
      throw htmlElementNotFound(rootElement, `Main Root for Login Screen`, [
        "HTMLElement",
      ]);
    if (!roots.root) roots[rootElement.id] = createRoot(rootElement);
    if (!("asPath" in router))
      throw typeError(router, `validation of asPath property from NextRouter`, [
        "NextRouter",
      ]);
    if (urlCase.startsWith("/")) urlCase = urlCase.slice(1) as pagesCases;
    switch (urlCase) {
      case "home": {
        roots[rootElement.id].render(
          <LoginMainBody root={roots[rootElement.id]} />
        );
        router.push("/");
        break;
      }
      case "new-user": {
        roots[rootElement.id].render(<NewUserPanel />);
        router.push("/new-user");
        break;
      }
      case "active-user": {
        roots[rootElement.id].render(<ActiveUserPanel />);
        router.push("/active-user");
        break;
      }
      default:
        stringError(router.asPath, "Any valid Component name");
        roots[rootElement.id].render(
          <LoginMainBody root={roots[rootElement.id]} />
        );
        router.push("/");
    }
  } catch (e) {
    console.error(`Error validating Main Root:
    ${(e as Error).message}`);
    document.body.prepend(
      Object.assign(document.createElement("h2"), {
        id: "warnDiv",
        innerText: `Erro carregando a página principal! 🕷📃\n
        Recarregue a página!`,
      })
    );
  }
}

export function attemptRender(
  root: Root,
  parent: voidishHtmlEl,
  ...children: JSX.Element[]
): boolean {
  try {
    if (!(root instanceof Object && "_internalRoot" in root))
      throw typeError(root, `validation of root in attemptRender`, ["Root"]);
    if (!(parent instanceof HTMLElement))
      throw htmlElementNotFound(
        parent,
        `validation of parent argument for attemptRender`,
        ["HTMLElement"]
      );
    if (
      !(
        Array.isArray(children) &&
        children.every(child => "type" in child && "props" in child)
      )
    )
      throw typeError(
        children,
        `validation of children argument for attemptRender`,
        ["JSX.Element[]"]
      );
    if (parent.querySelector(".spinner") || !parent.querySelector("*")) {
      root.render(children);
      return true;
    } else return false;
  } catch (e) {
    console.error(`Error executing attemptRender:\n${(e as Error).message}`);
    return false;
  }
}

export function isClickOutside(
  event: MouseEvent | React.MouseEvent<EventTarget, MouseEvent>,
  dlgInBtn: Element
): boolean[] {
  const rect = dlgInBtn.getBoundingClientRect();
  const { clientX, clientY } = event;
  return [
    clientX < rect.left,
    clientX > rect.right,
    clientY < rect.top,
    clientY > rect.bottom,
  ];
}

export function initProvid(el: voidishHtmlEl): void {
  try {
    if (!(el instanceof HTMLElement))
      throw htmlElementNotFound(
        el,
        `argument for initProvid ${(el as any)?.id}`,
        ["HTMLElement"]
      );
    const time = new Date();
    const moment = `${time.getTime()}_${time.getDate()}_${time.getMonth()}_${time.getFullYear()}`;
    gSessionProvider.activeProvider[moment] = new DataProvider(
      fetchEntries(el)
    );
    gSessionProvider.activeProvider[moment]!.initPersist(
      el,
      gSessionProvider.activeProvider[moment]!
    );
  } catch (e) {
    console.error(`Error executing initProvid :${(e as Error).message}`);
  }
}

export function initLocalRoots(...toBeRoots: voidishHtmlEl[]): void {
  try {
    if (toBeRoots.length < 1)
      throw numberError(toBeRoots.length, `Checking population of given Roots`);
    toBeRoots.forEach((toBeRoot, i) => {
      try {
        if (!(toBeRoot instanceof HTMLElement))
          htmlElementNotFound(
            toBeRoot,
            `toBeRoot id ${(toBeRoot as any)?.id || "Unidentified"}`,
            ["HTMLElement"]
          );
        roots[`${formatRootIdf(toBeRoot, i.toString())}`] = createRoot(
          toBeRoot!
        );
      } catch (eR) {
        console.error(`Error validating toBeRoot:
      ${(eR as Error).message}`);
      }
    });
  } catch (e) {
    console.error(`Error executing initLocalRoot:${(e as Error).message}`);
  }
}

export function initFillAttrs(
  pattern: string,
  scope: scopeNode = document
): void {
  try {
    if (!(typeof pattern === "string"))
      throw typeError(
        pattern,
        `validation of pattern argument in initFillAttrs`,
        ["string"]
      );
    scope = checkScope(scope);
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw nodeNotFound(
        scope,
        `validation of scope argument in initFillAttrs`,
        ["HTMLElement", "Document"]
      );
    if (scope instanceof Document)
      console.warn(
        `initFillAttrs captured the documentElement as the scope. That will hinder the calling of some filling functions.`
      );
    if (scope instanceof HTMLElement) fillSection(scope, pattern);
    formatForBst(scope);
    formatForSelectors(scope);
    adjustIdentifiers(scope);
    syncAriaStates(scope);
  } catch (e) {
    console.error(`Error executing initFillAttrs:\n${(e as Error).message}`);
  }
}

export function checkScope(
  scope: scopeNode = document,
  context?: string
): langSizeableNode {
  try {
    if (!(scope instanceof HTMLElement) && !(scope instanceof Document)) {
      console.warn(
        `Scope not validated as an HTMLElement for ${context}. Defaulted to documentElement. Be sure this is intended.`
      );
      scope = document;
    }
    return scope;
  } catch (e) {
    console.error(
      `Error executing checkScope. Defaulting to documentElement: \n${
        (e as Error).message
      }`
    );
    return document;
  }
}

export function checkBState(
  state: bState,
  dispatch: rDispatch<bState>,
  dCase?: string
): void {
  try {
    if (
      !(
        typeof state === "boolean" ||
        (typeof state === "object" &&
          Object.values(state).some(prop => typeof prop === "boolean"))
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
    switch (typeof state) {
      case "boolean":
        dispatch(!state);
        break;
      case "object":
        dispatch({ type: dCase });
        break;
      default:
        console.warn(`Error verifying state in checkBSState switch`);
    }
  } catch (e) {
    console.error(`Error executing checkBState:\n${(e as Error).message}`);
  }
}

export function checkEvTargType(evTarg: voidishEvTarg, ev: Event): number {
  try {
    if (!(ev instanceof Event))
      throw typeError(ev, `Validating ev argument for checkEvTargType`, [
        "Event",
      ]);
    if (!(evTarg instanceof EventTarget))
      throw evTargNotFound(evTarg, ev, ["EventTarget"]);
    if (evTarg instanceof Node) {
      if (evTarg instanceof Element) {
        if (evTarg instanceof HTMLElement) return 1;
        else if (evTarg instanceof SVGElement) return 2;
        else if (evTarg instanceof MathMLElement) return 3;
      } else if (evTarg instanceof Document) return 4;
      else if (evTarg instanceof CharacterData) {
        if (evTarg instanceof Text) return 5;
        else if (evTarg instanceof Comment) return 6;
      } else if (evTarg instanceof DocumentFragment) return 7;
    } else if (evTarg instanceof Window) return 8;
  } catch (e) {
    console.error(`Error executing checkEvTargType:\n${(e as Error).message}`);
    return -1;
  }
  return -1;
}

export function syncAriaStates(
  scope: voidishHtmlEl | Document = document
): void {
  try {
    scope = checkScope(scope, `validation of syncAriaStates arguments`);
    const els = scope.querySelectorAll("*");
    if (
      (Array.isArray(els) || els instanceof NodeList) &&
      els.length > 0 &&
      Array.from(els).every(el => el instanceof Element)
    ) {
      els.forEach(el => {
        if (el instanceof HTMLElement) {
          el.hidden && !el.focus
            ? (el.ariaHidden = "true")
            : (el.ariaHidden = "false");
          el.addEventListener("click", () => {
            el.hidden && !el.focus
              ? (el.ariaHidden = "true")
              : (el.ariaHidden = "false");
          });
          if (el.classList.contains("poCaller")) {
            el.ariaHasPopup = "menu";
          }
          if (
            el instanceof HTMLSelectElement ||
            el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement
          ) {
            if (el instanceof HTMLSelectElement) {
              if (el.querySelectorAll("option").length > 0) {
                el.querySelectorAll("option").forEach(option => {
                  option.selected
                    ? (option.ariaSelected = "true")
                    : (option.ariaSelected = "false");
                });
                el.addEventListener("change", () => {
                  el.querySelectorAll("option").forEach(option => {
                    option.selected
                      ? (option.ariaSelected = "true")
                      : (option.ariaSelected = "false");
                  });
                });
              }
              el.addEventListener("click", () => {
                if (el.ariaExpanded === "false") el.ariaExpanded = "true";
                if (el.ariaExpanded === "true") el.ariaExpanded = "false";
              });
            }
            if (
              el instanceof HTMLInputElement ||
              el instanceof HTMLTextAreaElement
            ) {
              if (el.placeholder && el.placeholder !== "")
                el.ariaPlaceholder = el.placeholder;
              el.required
                ? (el.ariaRequired = "true")
                : (el.ariaRequired = "false");
              !el.checkValidity()
                ? (el.ariaInvalid = "true")
                : (el.ariaInvalid = "false");
              el.closest("form")?.addEventListener("submit", () => {
                if (!el.checkValidity()) {
                  el.ariaInvalid = "true";
                } else {
                  el.ariaInvalid = "false";
                }
              });
              if (
                el instanceof HTMLTextAreaElement ||
                (el instanceof HTMLInputElement &&
                  (el.type === "text" ||
                    el.type === "tel" ||
                    el.type === "email" ||
                    el.type === "number" ||
                    el.type === "date" ||
                    el.type === "time" ||
                    el.type === "password" ||
                    el.type === "search" ||
                    el.type === "month" ||
                    el.type === "week"))
              ) {
                if (
                  el instanceof HTMLInputElement &&
                  el.list &&
                  el.list.id !== ""
                )
                  el.ariaAutoComplete = "list";
                if (
                  el instanceof HTMLInputElement &&
                  (el.type === "number" ||
                    el.type === "date" ||
                    el.type === "time")
                ) {
                  el.ariaValueMax = (el as HTMLInputElement).max;
                  el.ariaValueMin = (el as HTMLInputElement).min;
                }
                if (el instanceof HTMLInputElement && el.type === "range") {
                  el.addEventListener("change", () => {
                    el.ariaValueNow = el.value;
                    el.ariaValueText = el.value;
                  });
                }
              } else if (
                el instanceof HTMLInputElement &&
                (el.type === "radio" || el.type === "checkbox")
              ) {
                el.checked
                  ? (el.ariaChecked = "true")
                  : (el.ariaChecked = "false");
                el.disabled
                  ? (el.ariaDisabled = "true")
                  : (el.ariaDisabled = "false");
                el.addEventListener("change", () => {
                  el.checked
                    ? (el.ariaChecked = "true")
                    : (el.ariaChecked = "false");
                  el.disabled
                    ? (el.ariaDisabled = "true")
                    : (el.ariaDisabled = "false");
                });
              } else if (
                el instanceof HTMLInputElement &&
                (el.type === "button" ||
                  el.type === "submit" ||
                  el.type === "reset")
              ) {
                el.addEventListener("mousedown", click => {
                  if (click.button === 0) el.ariaPressed = "true";
                });
                el.addEventListener("mouseup", release => {
                  if (release.button === 0) el.ariaPressed = "false";
                });
              }
            }
          }
          if (el instanceof HTMLLabelElement) {
            if (el.hasChildNodes() && el.firstChild instanceof Text) {
              el.ariaLabel = el.firstChild.nodeValue;
            }
          }
          if (el instanceof HTMLButtonElement) {
            el.addEventListener("mousedown", click => {
              if (click.button === 0) el.ariaPressed = "true";
            });
            el.addEventListener("mouseup", release => {
              if (release.button === 0) el.ariaPressed = "false";
            });
            if (el.textContent?.match(/consultar/gi)) {
              el.ariaHasPopup = "dialog";
            }
          }
          if (el instanceof HTMLDialogElement) el.ariaModal = "true";
        }
      });
    } else console.warn(`Error executing syncAriaStates`);
  } catch (e) {
    console.error(`Error:${(e as Error).message}`);
  }
}

export function searchNextSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  let loopAcc = 0;
  while (currentElement?.nextElementSibling) {
    currentElement = currentElement.nextElementSibling;
    if (
      currentElement?.classList?.contains(searchedSiblingClass) ||
      loopAcc > 999
    )
      break;
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (
      currentElement?.classList?.contains(searchedSiblingClass) ||
      loopAcc > 999
    )
      break;
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblingsById(
  currentElement: Element,
  searchedSiblingId: string
): Element {
  let loopAcc = 0;
  while (currentElement?.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    if (currentElement?.id === searchedSiblingId || loopAcc > 999) break;
    loopAcc++;
  }
  return currentElement;
}

export function searchAncestorsByProperty(
  startDescendant: voidishHtmlEl,
  prop: string,
  expValue: string
): HTMLElement | void {
  try {
    if (!(startDescendant instanceof HTMLElement))
      throw htmlElementNotFound(
        startDescendant,
        `validation of startDescendant argument in searchAncestorsByProperty`,
        ["HTMLElement"]
      );
    if (!(typeof prop === "string"))
      throw typeError(
        prop,
        `validation of prop argument for searchAncestorsByProperty`,
        ["string"]
      );
    if (!(typeof expValue === "string"))
      throw typeError(
        expValue,
        `validation of expValue argument for searchAncestorsByProperty`,
        ["string"]
      );
    let safeAcc = 0;
    let verifiedParent = startDescendant.parentElement;
    while (
      !(
        verifiedParent instanceof HTMLElement &&
        //@ts-ignore
        getComputedStyle(verifiedParent)[`${prop}`] !== expValue
      )
    ) {
      safeAcc = ++safeAcc;
      if (
        safeAcc === 999 ||
        !(verifiedParent instanceof HTMLElement) ||
        (verifiedParent instanceof HTMLElement &&
          verifiedParent.tagName === "body")
      ) {
        console.warn(`Search on Ancestors by Property exausted.`);
        return undefined;
      }
      verifiedParent = verifiedParent.parentElement;
    }
    return verifiedParent instanceof HTMLBodyElement ||
      !(verifiedParent instanceof HTMLElement)
      ? undefined
      : verifiedParent;
  } catch (e) {
    console.error(
      `Error executing searchAncestrosByProperty:\n${(e as Error).message}`
    );
  }
}

export function adjustHeadings(refEl: voidishHtmlEl): void {
  try {
    if (!(refEl instanceof HTMLHeadingElement))
      throw htmlElementNotFound(
        refEl,
        `Reference for Heading Element in adjustHeadings`,
        ["HTMLHeadingElement"]
      );
    const attributes: { [k: string]: string } = {};
    for (const attr of refEl.attributes)
      if (attr.name !== "class") attributes[attr.name] = attr.value;
    const headingProps = Object.assign(
      {},
      {
        ...attributes,
        tagName: "",
      }
    );
    let currElement = refEl.parentElement;
    const parentElements: HTMLElement[] = [];
    let safeAcc = 0;
    while (!(currElement instanceof HTMLHtmlElement)) {
      safeAcc = ++safeAcc;
      if (safeAcc > 999) break;
      if (currElement instanceof HTMLElement) {
        parentElements.push(currElement);
        currElement = currElement.parentElement;
      } else break;
    }
    const lowestPrioHeadingNum = parentElements.find(parentEl => {
      switch (parentEl.tagName) {
        case "H5":
          return "H5";
        case "H4":
          return "H4";
        case "H3":
          return "H3";
        case "H2":
          return "H2";
        case "H1":
          return "H1";
        default:
          return undefined;
      }
    });
    if (lowestPrioHeadingNum) {
      switch (lowestPrioHeadingNum.tagName) {
        case "H5":
          const newHeadingh6 = document.createElement("h6");
          newHeadingh6.classList.add(refEl.className);
          refEl.parentElement!.replaceChild(
            refEl,
            Object.assign(newHeadingh6, headingProps)
          );
          break;
        case "H4":
          const newHeadingh5 = document.createElement("h5");
          newHeadingh5.classList.add(refEl.className);
          refEl.parentElement!.replaceChild(
            refEl,
            Object.assign(newHeadingh5, headingProps)
          );
          break;
        case "H3":
          const newHeadingh4 = document.createElement("h4");
          newHeadingh4.classList.add(refEl.className);
          refEl.parentElement!.replaceChild(
            refEl,
            Object.assign(newHeadingh4, headingProps)
          );
          break;
        case "H2":
          const newHeadingh3 = document.createElement("h3");
          newHeadingh3.classList.add(refEl.className);
          refEl.parentElement!.replaceChild(
            refEl,
            Object.assign(newHeadingh3, headingProps)
          );
          break;
        case "H1":
          const newHeadingh2 = document.createElement("h2");
          newHeadingh2.classList.add(refEl.className);
          refEl.parentElement!.replaceChild(
            refEl,
            Object.assign(newHeadingh2, headingProps)
          );
          break;
        default:
          console.warn(`No headings found in the DOM.`);
      }
    }
  } catch (e) {
    console.error(`Error executing adjustHeadings:\n${(e as Error).message}`);
  }
}

export function watchLabels(): void {
  setInterval(() => {
    try {
      for (const label of document.getElementsByTagName("label")) {
        label.dataset[`watched`] = "true";
        let relInp: voidishEl =
          label.querySelector("input") ?? label.querySelector("textarea");
        if (
          !(
            relInp instanceof HTMLInputElement ||
            relInp instanceof HTMLTextAreaElement
          )
        )
          relInp = label.nextElementSibling;
        if (
          !(
            relInp instanceof HTMLInputElement ||
            relInp instanceof HTMLTextAreaElement
          )
        )
          relInp = label.previousElementSibling;
        if (!label.parentElement) return;
        if (
          !(
            relInp instanceof HTMLInputElement ||
            relInp instanceof HTMLTextAreaElement
          )
        )
          relInp =
            label.parentElement.querySelector("input") ??
            label.parentElement.querySelector("textarea");
        if (!relInp) return;
        if (relInp.id === "" && label.htmlFor === "") {
          const labelNum = document.querySelectorAll("label").length;
          relInp.id = `filledInput${labelNum}`;
        }
        if (label.htmlFor !== relInp.id) label.htmlFor = relInp.id;
      }
    } catch (e) {
      console.error(
        `Error executing interval for watchLabels:\n${(e as Error).message}`
      );
    }
  }, 3000);
}
