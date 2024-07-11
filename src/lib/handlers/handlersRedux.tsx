import { setCarouselImg } from "src/redux/slices/carouselImgsSlice";
import { documentData, roots } from "../controller";
import { FileProps } from "../declarations/interfaces";
import {
  ListError,
  fetchError,
  htmlElementNotFound,
  numberError,
  typeError,
} from "./handlersErrors";
import { createRoot } from "react-dom/client";
import CarouselComponent from "src/components/carousel/CarouselComponent";
import { voidishHtmlEl, voidishRoot } from "../declarations/types";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import {
  CarouselImgsAction,
  CarouselImgsState,
  RootObj,
  AccordionRefsAction,
  AccordionRefsState,
  StoreStateConfiguration,
} from "../declarations/interfacesRedux";
import { Root } from "react-dom/client";
import { setRoot } from "src/redux/slices/rootsSlice";
import { setAccordionRef } from "src/redux/slices/accordionRefsSlice";
import { searchAncestorsByProperty } from "./handlersCommon";
import { parseFinite } from "./handlersMath";
import { checkButtonsOverlap } from "./handlersStyles";
import IconClose from "src/components/icons/guidance/IconClose";
import IconList from "src/components/icons/states/IconList";
import IconDiscord from "src/components/icons/social/IconDiscord";
import IconFb from "src/components/icons/social/IconFb";
import IconInst from "src/components/icons/social/IconInst";
import IconX from "src/components/icons/social/IconX";
import ErrorComponentIcon from "src/components/errors/ErrorComponentIcon";
import Spinner from "src/components/icons/states/IconSpiner";
import { AppThunk } from "../declarations/typesRedux";

export default function clearRootRedux(
  roots: RootObj,
  rootRef: string,
  dispatch: ThunkDispatch<StoreStateConfiguration, any, Action<any>>
): void {
  try {
    if (typeof roots !== "object")
      throw typeError(roots, `validation of roots argument in clearRoot`, [
        "{...Root}",
      ]);
    if (typeof rootRef !== "string")
      throw typeError(
        rootRef,
        `validation of rootRef argument in clearRootDef`,
        ["string"]
      );
    if (typeof dispatch !== "function")
      throw typeError(
        dispatch,
        `validation of dispatch argument in clearRootRedux`,
        ["function"]
      );
    if (roots[`${rootRef}`]) {
      roots[`${rootRef}`].unmount();
      dispatch(setRoot({ k: rootRef, v: undefined }));
    } else
      console.warn(
        `No reference found for ${rootRef} in the roots object during clearRoot call`
      );
  } catch (e) {
    console.error(`Error executing clearRoot:\n${(e as Error).message}`);
  }
}
//TODO HOOKAR DISPATCH E STATE DA STORE PARA ARGUMENTAÇÃO
//def in handlersFetch
export async function fetchImagesRedux(
  mainEl: voidishHtmlEl,
  mainId: string,
  dispatch: ThunkDispatch<CarouselImgsState, any, CarouselImgsAction>,
  carouselImgs: CarouselImgsState,
  selector: (state: any) => any
): Promise<void> {
  try {
    if (!(mainEl instanceof HTMLElement))
      throw htmlElementNotFound(mainEl, `validation of mainEl for fetchImages`);
    if (typeof mainId !== "string")
      throw typeError(mainId, `validation of mainId in fetchImages`, [
        "string",
      ]);
    const res = await fetch(`data/images.json`, { method: "GET" });
    if (!res.ok) throw fetchError(res);
    const parsedImages = await res.json();
    // @ts-ignore
    let campaigns: [string, Array<FileProps>] = Object.entries(
      parsedImages
    ).filter(
      subdir => subdir[0] === "campaigns" && subdir[1] instanceof Object
    )[0];
    if (!campaigns || campaigns.length < 1)
      throw ListError(
        campaigns,
        ["{[k: string]: string}"],
        `validating campaigns json`,
        ...campaigns
      );
    Object.values(campaigns)
      .filter(
        campaign =>
          campaign[1] instanceof Object &&
          "name" in campaign[1] &&
          typeof campaign[1].name === "string" &&
          "extension" in campaign[1] &&
          typeof campaign[1].extension === "object" &&
          Object.values(campaign[1].extension).every(
            validExt => typeof validExt === "string"
          )
      )
      .forEach(campaignNames => {
        let safeAcc = 0;
        while (!("extension" in (campaignNames[0] as FileProps))) {
          campaignNames = Object.fromEntries(
            Object.entries(campaignNames).filter(
              campaign => campaign[1] instanceof Object
            )
          ) as FileProps[];
          safeAcc++;
          if (safeAcc > 999) break;
        }
        for (const campaignName of campaignNames)
          dispatch(
            setCarouselImg({
              k: mainId,
              v: `${(campaignName as FileProps).name}${
                (campaignName as FileProps).extension
              }`,
            })
          );
      });
    carouselImgs[mainId] &&
      carouselImgs[mainId].length === 0 &&
      dispatch(setCarouselImg({ k: mainId, v: "" }));
    !mainEl && console.warn("Error fetching main element");
    mainEl &&
      !selector((state: RootObj) => state.roots[`mainId`]) &&
      dispatch(setRoot({ k: mainId, v: createRoot(mainEl) }));
  } catch (e) {
    console.error(
      `Error defining images for carousel: ${(e as Error).message}`
    );
    dispatch(setCarouselImg({ k: mainId, v: "undefined" }));
    roots[mainId] && roots[mainId].render(<></>);
  }
}
//def in handlersFetch
//TODO CALL IN ASYNC SEQUENCE
export function concatRenderingImgs(
  selectedRoot: Root,
  selectedImgNames: string[],
  root?: voidishRoot
): boolean | void {
  try {
    if (document.querySelector(".carousel")) return false;
    if (!(typeof selectedRoot === "object" && "_internalRoot" in selectedRoot))
      throw typeError(
        selectedRoot,
        `validation of selectedRoot in concatRenderingImgs`,
        ["Root"]
      );
    if (!Array.isArray(selectedImgNames))
      throw typeError(
        selectedImgNames,
        `validation of selectedImgNames argument in concatRenderingImgs`,
        ["Array"]
      );
    selectedImgNames = selectedImgNames.filter(
      name => typeof name === "string"
    );
    if (selectedImgNames.length === 0)
      throw ListError(
        selectedImgNames,
        ["string"],
        `validation of selectedImgNames`,
        ...selectedImgNames
      );
    (async () => {
      selectedRoot.render(
        <CarouselComponent
          root={root}
          ParentComponentName="LoginMainBody"
          imgNames={selectedImgNames}
        />
      );
    })()
      .then(() => {
        if (document.querySelector(".carousel")) return true;
      })
      .catch((err: Error) => {
        console.error(err);
        return false;
      });
  } catch (e) {
    console.error(
      `Error executing concatRenderingImgs:\n${(e as Error).message}`
    );
    return false;
  }
}
//def in handlersStyle
//TODO SUBSTITUIR EM HEADER
export function stickToRelativeRedux(
  predefinedParent: voidishHtmlEl,
  accordionRefs: AccordionRefsState,
  dispatch: ThunkDispatch<AccordionRefsState, any, AccordionRefsAction>,
  ...absDescend: voidishHtmlEl[]
): void {
  try {
    if (!(predefinedParent instanceof HTMLElement))
      throw htmlElementNotFound(
        predefinedParent,
        `validation of predefineParent argument in stickToRelative`
      );
    if (
      !(
        typeof accordionRefs === "object" &&
        Object.values(accordionRefs).every(ref => typeof ref === "string")
      )
    )
      throw typeError(
        accordionRefs,
        `validation of accordionRefs argument in stickToRelative`,
        ["AccordionRefsState"]
      );
    if (typeof dispatch !== "function")
      throw typeError(
        dispatch,
        `validation of dispatch argument in stickToRelative`,
        ["function"]
      );
    if (!Array.isArray(absDescend))
      throw typeError(
        absDescend,
        `validation of absDescend argument in stickToRelative`,
        ["Array"]
      );
    absDescend = absDescend.filter(
      abs =>
        abs instanceof HTMLElement &&
        (getComputedStyle(abs).position === "absolute" ||
          getComputedStyle(abs).float !== "none")
    );
    if (absDescend.length === 0)
      throw numberError(
        absDescend.length,
        `validation of absDescend length in stickToRelative`
      );
    absDescend.forEach((abs, i) => {
      try {
        if (!(abs instanceof HTMLElement))
          throw htmlElementNotFound(
            abs,
            `validation of absolutely positioned element in loop`
          );
        const relParent =
          predefinedParent ??
          searchAncestorsByProperty(abs, "position", "relative");
        if (!(relParent instanceof HTMLElement))
          throw htmlElementNotFound(relParent, `validation of Related Parent`);
        const refKey = `${
          abs.id || abs.classList.toString() || "defAbsAccord"
        }`;
        const checkStickPoint = (addPadding: boolean = true) => {
          if (accordionRefs[refKey]) {
            abs.style.top = accordionRefs[refKey];
            return;
          } else {
            const parentRect = relParent.getBoundingClientRect();
            const absRect = abs.getBoundingClientRect();
            if (addPadding) {
              let accordRef = "";
              if (parentRect.bottom <= absRect.bottom) {
                accordRef = `${
                  parentRect.bottom +
                  parseFinite(getComputedStyle(relParent).paddingBottom)
                }px`;
                abs.style.top = accordRef;
              } else {
                accordRef = `${
                  parentRect.top +
                  parseFinite(getComputedStyle(relParent).paddingTop)
                }px`;
                abs.style.bottom = accordRef;
              }
              dispatch(setAccordionRef({ k: "refKey", v: accordRef }));
            } else {
              parentRect.bottom < absRect.bottom
                ? (abs.style.top = `${parentRect.bottom / documentData.rem}rem`)
                : (abs.style.bottom = `${
                    parentRect.top / documentData.rem
                  }rem`);
            }
          }
        };
        checkStickPoint();
        addEventListener("resize", () => {
          checkStickPoint(false);
        });
      } catch (e) {
        console.error(
          `Error executing iteration ${i} of absDescend in stickToRelative:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing stickToRelative:\n${(e as Error).message}`);
  }
}
//def in handlersDef
export function addCheckButtonsRedux(
  ref: voidishHtmlEl,
  rootsSelect: RootObj,
  dispatch: AppThunk,
  renderHeader: (hroot: Root) => void | JSX.Element
): void {
  try {
    if (!(ref instanceof HTMLElement))
      throw htmlElementNotFound(
        ref,
        `validation of ref argument in addCheckButtons`
      );
    if (
      typeof rootsSelect !== "object" ||
      !Object.values(rootsSelect).some(root => "_internalRoot" in root)
    )
      throw typeError(
        rootsSelect,
        `validation of rootsSelect argument in addCheckButtons`,
        ["{...Root}"]
      );
    if (typeof dispatch !== "function")
      throw typeError(
        dispatch,
        `validation of dispatch argument in addCheckButtons`,
        ["function"]
      );
    if (typeof renderHeader !== "function")
      throw typeError(
        renderHeader,
        `validation of renderHeader argument in addCheckButtons`,
        ["function"]
      );
    if (!rootsSelect[`${ref.id}`])
      dispatch(setRoot({ k: ref.id, v: createRoot(ref) }));
    renderHeader(rootsSelect[`${ref.id}`]);
    if (!ref.querySelector(".accordion")) {
      checkButtonsOverlap(ref);
      addEventListener("resize", () => checkButtonsOverlap(ref));
      addEventListener("resize", () =>
        renderHeader(
          rootsSelect[`${document.querySelector("header")?.id || "header"}`]
        )
      );
    }
  } catch (e) {
    console.error(`Error executing addCheckButtons:\n${(e as Error).message}`);
  }
}
//def in handlersDef
export function renderAccordionIconRedux(
  roots: RootObj,
  ref: voidishHtmlEl,
  state: boolean,
  dispatch: AppThunk
): void {
  try {
    if (typeof roots !== "object")
      throw typeError(
        roots,
        `validation of roots argument in renderAccordionIcon`,
        ["{...Root}"]
      );
    if (!(ref instanceof HTMLElement))
      throw htmlElementNotFound(
        ref,
        `validation of ref argument in renderAccordionIcon`
      );
    if (typeof state !== "boolean")
      throw typeError(
        state,
        `validation of state argument in renderAccordionIcon`,
        ["boolean"]
      );
    if (typeof dispatch !== "function")
      throw typeError(
        dispatch,
        `validation of dispatch argument in renderAccordionIcon`,
        ["function"]
      );
    if (!roots[`${ref.id}`])
      dispatch(setRoot({ k: ref.id, v: createRoot(ref) }));
    state
      ? roots[`${ref.id}`].render(<IconClose />)
      : roots[`${ref.id}`].render(<IconList />);
  } catch (e) {
    console.error(
      `Error executing renderAccordionIcon:\n${(e as Error).message}`
    );
  }
}
//def in handlersDef
export function renderSocialIconRedux(
  anchor: voidishHtmlEl,
  rootsSelector: RootObj,
  iconCase: string
): void {
  try {
    if (!(anchor instanceof HTMLAnchorElement))
      throw htmlElementNotFound(
        anchor,
        `validation of anchor argument in renderSocialIcon`
      );
    if (
      !(
        typeof rootsSelector === "object" &&
        Object.values(rootsSelector).some(root => "_internalRoot" in root)
      )
    )
      throw typeError(
        rootsSelector,
        `validation of rootsSelector argument in renderSocialIcon`,
        ["{...rootsSelector}"]
      );
    if (typeof iconCase !== "string")
      throw typeError(
        iconCase,
        `validation of iconCase argument in renderSocialIcon`,
        ["string"]
      );
    if (!rootsSelector[`${anchor.id}`])
      throw new Error(
        `Error fetching root property identified by anchor id during renderSocialIcon execution`
      );
    switch (iconCase) {
      case "discord":
        rootsSelector[`${anchor.id}`].render(<IconDiscord />);
        break;
      case "facebook":
        rootsSelector[`${anchor.id}`].render(<IconFb />);
        break;
      case "instagram":
        rootsSelector[`${anchor.id}`].render(<IconInst />);
        break;
      case "twitter":
        rootsSelector[`${anchor.id}`].render(<IconX />);
        break;
      default:
        rootsSelector[`${anchor.id}`].render(
          <ErrorComponentIcon fill={true} />
        );
        break;
    }
  } catch (e) {
    console.error(`Error executing renderSocialIcon:\n${(e as Error).message}`);
  }
}
//def in handlersDef
export function attemptRenderSocialIconRedux(
  rootsSelector: RootObj,
  ref: voidishHtmlEl,
  iconCase: string,
  dispatch: AppThunk
): void | (() => void) {
  try {
    if (!(ref instanceof HTMLAnchorElement))
      throw htmlElementNotFound(ref, `validation of Anchor Reference`, [
        "HTMLAnchorElement",
      ]);
    if (typeof iconCase !== "string")
      throw typeError(
        iconCase,
        `validation of iconCase argument in attemptRenderSocialIcon`,
        ["string"]
      );
    if (typeof roots !== "object")
      throw typeError(
        roots,
        `validation of roots argument in attemptRenderSocialIcon`,
        ["{...Root}"]
      );
    if (!rootsSelector[`${ref.id}`])
      dispatch(setRoot({ k: ref.id, v: createRoot(ref) }));
    try {
      if (!(ref instanceof HTMLAnchorElement))
        throw htmlElementNotFound(
          ref,
          `validation of ref argument in renderAttempt ${new Date().getTime()}`,
          ["HTMLAnchorElement"]
        );
      ref.querySelector(".spinner") &&
        renderSocialIconRedux(ref, rootsSelector, iconCase);
    } catch (e) {
      console.error(`Error executing renderAttempt:\n${(e as Error).message}`);
    }
    const iconRenderInterv = setInterval(iconRenderInterv => {
      if (ref?.querySelector(".spinner")) {
        try {
          if (!(ref instanceof HTMLAnchorElement))
            throw htmlElementNotFound(
              ref,
              `validation of ref argument in renderAttempt ${new Date().getTime()}`,
              ["HTMLAnchorElement"]
            );
          ref.querySelector(".spinner") &&
            renderSocialIconRedux(ref, rootsSelector, iconCase);
        } catch (e) {
          console.error(
            `Error executing renderAttempt:\n${(e as Error).message}`
          );
        }
      } else clearInterval(iconRenderInterv);
    }, 100);
    setTimeout(() => {
      if (ref?.querySelector(".spinner")) {
        iconRenderInterv && clearInterval(iconRenderInterv);
        if (rootsSelector[`${ref.id}`])
          rootsSelector[`${ref.id}`].render(<ErrorComponentIcon fill={true} />);
      }
    }, 10000);
  } catch (e) {
    console.error(
      `Error executing useEffect for LinkSocialIcon case ${iconCase}:\n${
        (e as Error).message
      }`
    );
  }
}
//def in handlersDef
export function generateFootRootRedux(
  roots: RootObj,
  footer: voidishHtmlEl,
  dispatch: AppThunk
): void {
  try {
    if (!(typeof roots === "object"))
      throw typeError(
        roots,
        `validation of roots argument in generateFootRoot`,
        ["{...Root}"]
      );
    if (!(footer instanceof HTMLElement))
      throw htmlElementNotFound(
        footer,
        `validation of footer argument in generateFootRoot`
      );
    if (!roots[`${footer.id || footer.tagName}`])
      dispatch(
        setRoot({ k: `${footer.id || footer.tagName}`, v: createRoot(footer) })
      );
    roots[`${footer.id || footer.tagName}`].render(
      <Spinner
        spinnerClass="spinner-border"
        spinnerColor="text-light"
        message="Loading Footer..."
      />
    );
  } catch (e) {
    console.error(`Error executing generateFootRoot:\n${(e as Error).message}`);
  }
}
