import { voidishEl } from "lib/declarations/types";
import { elementNotFound, typeError } from "./handlersErrors";

export function capitalizeFirstLetter(text: string): string {
  try {
    if (!(typeof text === "string"))
      throw typeError(text, `type of argument for capitalizeFirstLetter`, [
        "string",
      ]);
    text = `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
    return text;
  } catch (e) {
    console.error(
      `Error executing capitalizeFirstLetter:\n${(e as Error).message}`
    );
    return text.toString();
  }
}

export function textTransformPascal(text: string): string {
  try {
    if (!(typeof text === "string"))
      throw typeError(text, `type of argument for capitalizeFirstLetter`, [
        "string",
      ]);
    text = `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;
    return text;
  } catch (e) {
    console.error(
      `Error executing capitalizeFirstLetter:\n${(e as Error).message}`
    );
    return text.toString();
  }
}

export function highlightChange(
  el: voidishEl,
  color: string = "red",
  context: string = "both"
): void {
  try {
    if (!(el instanceof HTMLElement))
      throw elementNotFound(
        el,
        `validating el element ${
          (el as any)?.id ||
          el?.tagName ||
          el?.nodeName ||
          el?.nodeType ||
          "undefined element"
        } for highlight change`,
        ["HTMLElement"]
      );
    if (!(typeof color === "string"))
      throw typeError(
        color,
        `validating color argument for highlightChange for element ${
          el.id || el.tagName || "undefined element"
        }`,
        ["string"]
      );
    if (!(typeof context === "string"))
      throw typeError(
        context,
        `validating context argument for element ${
          el.id || el.tagName || "undefined element"
        }`,
        ["string"]
      );

    const iniColor = "rgb(222, 226, 230)";
    const iniFontColor = "rgb(33, 37, 41)";
    const pulseBColor = (el: HTMLElement) => {
      setTimeout(() => {
        el.style.borderColor = color;
        setTimeout(() => {
          el.style.transition = "border-color 0.5s ease-in";
          setTimeout(() => {
            el.style.borderColor = iniColor;
            setTimeout(() => {
              el.style.transition = "border-color 0.5s ease-in";
            }, 500);
          }, 250);
        }, 500);
      }, 250);
    };
    const pulseFColor = (el: HTMLElement) => {
      setTimeout(() => {
        el.style.color = color;
        setTimeout(() => {
          el.style.transition = "color 0.5s ease-in";
          setTimeout(() => {
            el.style.color = iniFontColor;
            setTimeout(() => {
              el.style.transition = "color 0.5s ease-in";
            }, 500);
          }, 250);
        }, 500);
      }, 250);
    };

    if (context === "both" || context === "border") {
      pulseBColor(el);
      setTimeout(() => {
        pulseBColor(el);
      }, 1600);
    }
    if (context === "both" || context === "font") {
      // if (el )
      pulseFColor(el);
      setTimeout(() => {
        pulseFColor(el);
      }, 1600);
    }
  } catch (e) {
    console.error(
      `Error executing highlightChange for ${
        el?.id || el?.tagName || "undefined element"
      }:\n${(e as Error).message}`
    );
  }
}
