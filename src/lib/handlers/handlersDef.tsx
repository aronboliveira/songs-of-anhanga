import { RootObj } from "../declarations/interfacesRedux";
import { voidishHtmlEl } from "../declarations/types";
import { htmlElementNotFound, typeError } from "./handlersErrors";
import { Root, createRoot } from "react-dom/client";
import { checkButtonsOverlap } from "./handlersStyles";
import IconClose from "src/components/icons/guidance/IconClose";
import IconList from "src/components/icons/states/IconList";
import IconDiscord from "src/components/icons/social/IconDiscord";
import IconFb from "src/components/icons/social/IconFb";
import IconInst from "src/components/icons/social/IconInst";
import IconX from "src/components/icons/social/IconX";
import ErrorComponentIcon from "src/components/errors/ErrorComponentIcon";
import Spinner from "src/components/icons/states/IconSpiner";

export default function clearRootDef(roots: RootObj, rootRef: string): void {
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
    if (roots[`${rootRef}`]) {
      roots[`${rootRef}`].unmount();
      roots[`${rootRef}`] = undefined;
    } else
      console.warn(
        `No reference found for ${rootRef} in the roots object during clearRoot call`
      );
  } catch (e) {
    console.error(`Error executing clearRoot:\n${(e as Error).message}`);
  }
}

export function addCheckButtonsDef(
  ref: voidishHtmlEl,
  roots: RootObj,
  renderHeader: (hroot: Root) => void | JSX.Element
): void {
  try {
    if (!(ref instanceof HTMLElement))
      throw htmlElementNotFound(
        ref,
        `validation of ref argument in addCheckButtons`
      );
    if (typeof roots !== "object")
      throw typeError(
        roots,
        `validation of roots argument in addCheckButtons`,
        ["{...Root}"]
      );
    if (typeof renderHeader !== "function")
      throw typeError(
        renderHeader,
        `validation of renderHeader argument in addCheckButtons`,
        ["function"]
      );
    if (!roots[`${ref.id}`]) roots[`${ref.id}`] = createRoot(ref);
    renderHeader(roots[`${ref.id}`]);
    if (!ref.querySelector(".accordion")) {
      checkButtonsOverlap(ref);
      addEventListener("resize", () => checkButtonsOverlap(ref));
      addEventListener("resize", () =>
        renderHeader(roots[`${document.querySelector("header")?.id}`])
      );
    }
  } catch (e) {
    console.error(`Error executing addCheckButtons:\n${(e as Error).message}`);
  }
}

export function renderAccordionIconDef(
  roots: RootObj,
  ref: voidishHtmlEl,
  state: boolean
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
    if (!roots[`${ref.id}`]) roots[`${ref.id}`] = createRoot(ref);
    state
      ? roots[`${ref.id}`].render(<IconClose />)
      : roots[`${ref.id}`].render(<IconList />);
  } catch (e) {
    console.error(
      `Error executing renderAccordionIcon:\n${(e as Error).message}`
    );
  }
}

export function renderSocialIconDef(
  anchor: voidishHtmlEl,
  roots: RootObj,
  iconCase: string
): void {
  try {
    if (!(anchor instanceof HTMLAnchorElement))
      throw htmlElementNotFound(
        anchor,
        `validation of anchor argument in renderSocialIcon`
      );
    if (typeof roots !== "object")
      throw typeError(
        roots,
        `validation of roots argument in renderSocialIcon`,
        ["{...Roots}"]
      );
    if (typeof iconCase !== "string")
      throw typeError(
        iconCase,
        `validation of iconCase argument in renderSocialIcon`,
        ["string"]
      );
    if (!roots[`${anchor.id}`])
      throw new Error(
        `Error fetching root property identified by anchor id during renderSocialIcon execution`
      );
    switch (iconCase) {
      case "discord":
        roots[`${anchor.id}`].render(<IconDiscord />);
        break;
      case "facebook":
        roots[`${anchor.id}`].render(<IconFb />);
        break;
      case "instagram":
        roots[`${anchor.id}`].render(<IconInst />);
        break;
      case "twitter":
        roots[`${anchor.id}`].render(<IconX />);
        break;
      default:
        roots[`${anchor.id}`].render(<ErrorComponentIcon fill={true} />);
        break;
    }
  } catch (e) {
    console.error(`Error executing renderSocialIcon:\n${(e as Error).message}`);
  }
}

export function attemptRenderSocialIconDef(
  roots: RootObj,
  ref: voidishHtmlEl,
  iconCase: string
): void | (() => void) {
  try {
    let rootId = "";
    if (!(ref instanceof HTMLAnchorElement))
      throw htmlElementNotFound(ref, `validation of Anchor Reference`, [
        "HTMLAnchorElement",
      ]);
    rootId = ref.id;
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
    if (!roots[`${ref.id}`]) roots[`${ref.id}`] = createRoot(ref);
    try {
      if (!(ref instanceof HTMLAnchorElement))
        throw htmlElementNotFound(
          ref,
          `validation of ref argument in renderAttempt ${new Date().getTime()}`,
          ["HTMLAnchorElement"]
        );
      ref.querySelector(".spinner") &&
        renderSocialIconDef(ref, roots, iconCase);
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
            renderSocialIconDef(ref, roots, iconCase);
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
        if (roots[`${ref.id}`])
          roots[`${ref.id}`].render(<ErrorComponentIcon fill={true} />);
      }
    }, 10000);
    return () => {
      clearRootDef(roots, ref?.id || rootId || "undefined");
    };
  } catch (e) {
    console.error(
      `Error executing useEffect for LinkSocialIcon case ${iconCase}:\n${
        (e as Error).message
      }`
    );
  }
}

export function generateFootRootDef(
  roots: RootObj,
  footer: voidishHtmlEl
): void {
  try {
    if (typeof roots !== "object")
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
      roots[`${footer.id || footer.tagName}`] = createRoot(footer);
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
