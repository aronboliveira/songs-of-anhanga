import IconEyeSlash from "src/components/icons/states/IconEyeSlash";
import {
  ListError,
  elementNotFound,
  htmlElementNotFound,
  markWithCommentary,
  nodeNotFound,
  numberError,
  typeError,
} from "./handlersErrors";
import { checkScope, searchAncestorsByProperty } from "./handlersCommon";
import { parseFinite } from "./handlersMath";
import {
  scopeNode,
  voidishBtn,
  voidishEl,
  voidishInp,
  voidishRoot,
} from "../declarations/types";
import IconEyeShow from "src/components/icons/states/IconEyeShow";
import { voidishHtmlEl } from "../declarations/types";
import { roots, documentData } from "../controller";
import { createRoot } from "react-dom/client";
import IconArrowCLeft from "src/components/icons/guidance/IconArrowCLeft";
import IconArrowCRight from "src/components/icons/guidance/IconArrowCRight";
import { formatForBst } from "./handlersFormatFill";

export function defineDocumentData(): void {
  try {
    window.addEventListener("DOMContentLoaded", () => {
      try {
        documentData.rem =
          parseFinite(getComputedStyle(document.documentElement).fontSize) ||
          16;
      } catch (eD) {
        console.error(
          `Error executing callback for DOMContentLoaded:\n${
            (eD as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing defineDocumentData:\n${(e as Error).message}`
    );
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

export function styleClass(
  scope: scopeNode = document,
  selector: string | string[],
  ...classesToAdd: string[]
): void {
  try {
    if (
      !(typeof selector === "string") &&
      !(
        Array.isArray(selector) &&
        selector.every(selectUnity => typeof selectUnity === "string")
      )
    )
      throw typeError(
        selector,
        `validation of selector argument for styleClass`,
        ["string", "string[]"]
      );
    if (!Array.isArray(classesToAdd))
      throw typeError(
        classesToAdd,
        `validation of classesToAdd in styleClass`,
        ["Array"]
      );
    classesToAdd.forEach((classUnity, i) => {
      if (typeof classUnity !== "string")
        console.warn(
          `Error validating classUnity iteration ${i} in the execution of styleClass for ${
            scope?.nodeName || "undefined scope"
          }`
        );
    });
    classesToAdd = classesToAdd.filter(
      classUnity => typeof classUnity === "string"
    );
    if (classesToAdd.length === 0)
      throw ListError(
        classesToAdd,
        ["string"],
        `validation of length of classesToAdd for ${
          scope?.nodeName || "undefined scope"
        }`,
        ...classesToAdd
      );
    scope = checkScope(scope);
    if (!(scope instanceof Element || scope instanceof Document))
      throw new Error(`Error validating scope argument in styleClass`);
    const cicleSelect = (selectUnity: string) => {
      scope!.querySelectorAll(selectUnity).forEach((selected, i) => {
        try {
          if (!(selected instanceof Element))
            throw elementNotFound(
              selected,
              `Element selected during cicle ${i} after querry in ${scope?.nodeName}`,
              ["Element"]
            );
          selected.classList.add(...classesToAdd);
        } catch (e) {
          console.error(`Error:${(e as Error).message}`);
        }
      });
    };
    if (Array.isArray(selector))
      for (const selectUnity of selector) cicleSelect(selectUnity);
    else cicleSelect(selector);
  } catch (e) {
    console.error(`Error executing styleClass:${(e as Error).message}`);
  }
}

export function equalizeWidths(els: voidishHtmlEl[]): void {
  try {
    if (!Array.isArray(els))
      throw typeError(
        equalizeWidths,
        `validation of els argument for equalizeWidths`,
        ["Array"]
      );
    els = els.filter(el => el instanceof HTMLElement);
    if (els.length === 0)
      throw ListError(
        els,
        ["HTMLElement"],
        `validation of els argument length in equalizeWidths`
      );
    const maxWidth = Math.max(
      ...els
        .map((el, i) => {
          try {
            if (!(el instanceof HTMLElement))
              throw htmlElementNotFound(
                el,
                `validation of el element in equalizeWidths`,
                ["HTMLElement"]
              );
            // console.log("OFFSET");
            // console.log(el.offsetWidth);
            return getComputedStyle(el).boxSizing === "border-box"
              ? Math.max(
                  parseFinite(getComputedStyle(el).width),
                  el.offsetWidth
                )
              : Math.max(
                  parseFinite(getComputedStyle(el).width),
                  el.offsetWidth
                );
          } catch (e) {
            console.error(
              `Error execution iteration ${i} in equalizeWidths:${
                (e as Error).message
              }`
            );
            return 0;
          }
        })
        .filter(numWidth => numWidth > 0)
    );
    // console.log(
    //   `!EQUALIZEWIDTHS: ${els
    //     .map((el, i) => {
    //       try {
    //         if (!(el instanceof HTMLElement))
    //           throw htmlElementNotFound(
    //             el,
    //             `validation of el element in equalizeWidths`,
    //             ["HTMLElement"]
    //           );
    //         // console.log("OFFSET");
    //         // console.log(el.offsetWidth);
    //         return getComputedStyle(el).boxSizing === "border-box"
    //           ? Math.max(
    //               parseFinite(getComputedStyle(el).width) +
    //                 parseFinite(getComputedStyle(el).paddingLeft),
    //               el.offsetWidth
    //             )
    //           : Math.max(
    //               parseFinite(getComputedStyle(el).width) +
    //                 parseFinite(getComputedStyle(el).paddingLeft),
    //               el.offsetWidth
    //             );
    //       } catch (e) {
    //         console.error(
    //           `Error execution iteration ${i} in equalizeWidths:${
    //             (e as Error).message
    //           }`
    //         );
    //         return 0;
    //       }
    //     })
    //     .filter(numWidth => numWidth > 0)}`
    // );
    // console.log("!EQUALIZEWIDTHS: " + maxWidth);
    for (const el of els) {
      try {
        if (!(el instanceof HTMLElement))
          throw htmlElementNotFound(
            el,
            `validating Element for applying width in equalizeWidths`,
            ["HTMLElement"]
          );
        if (!Number.isFinite(maxWidth))
          throw numberError(
            maxWidth,
            `validating Maximum width for equalizeWidths`
          );
        el.style.width = `${maxWidth}px`;
      } catch (e) {
        console.error(
          `Error applying width to element ${
            el?.id || el?.tagName || "undefined"
          }:${(e as Error).message}`
        );
      }
    }
  } catch (e) {
    console.error(`Error executing equalizeWidths:\n${(e as Error).message}`);
  }
}

export function checkButtonsOverlap(scope: scopeNode): boolean {
  try {
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw nodeNotFound(
        scope,
        `validation of scope argument for checkButtonsOverlap`,
        ["HTMLElement", "Document"]
      );
    const btnsRectSides = Array.from(scope.querySelectorAll("button")).map(
      btn => {
        const btnRect = btn.getBoundingClientRect();
        return {
          btnRectId: btn.id,
          btnRectX: btnRect.x,
          btnRectLeft: btnRect.left,
          btnRectRight: btnRect.right,
        };
      }
    );
    for (let b = 0; b < btnsRectSides.length; b++) {
      const closestBtnLeft = Math.min(
        ...btnsRectSides
          .filter(btnsRectSide => !(btnsRectSide === btnsRectSides[b]))
          .map(btnRectSide =>
            Math.abs(btnsRectSides[b].btnRectLeft - btnRectSide.btnRectRight)
          )
      );
      // console.log("!ACCORDION CLOSEST LEFT: " + closestBtnLeft);
      const closestBtnRight = Math.min(
        ...btnsRectSides
          .filter(btnsRectSide => btnsRectSide === btnsRectSides[b])
          .map(
            btnRectSide =>
              btnsRectSides[b].btnRectRight - btnRectSide.btnRectLeft
          )
      );
      let paddingFactorRight = 0,
        paddingFactorLeft = 0;
      if (
        Number.isFinite(
          parseFinite(
            getComputedStyle(scope.querySelectorAll("button")[b]).paddingRight
          ) / 4
        )
      )
        paddingFactorRight =
          parseFinite(
            getComputedStyle(scope.querySelectorAll("button")[b]).paddingRight
          ) / 4;

      if (
        Number.isFinite(
          parseFinite(
            getComputedStyle(scope.querySelectorAll("button")[b]).paddingLeft
          ) / 4
        )
      )
        paddingFactorLeft =
          parseFinite(
            getComputedStyle(scope.querySelectorAll("button")[b]).paddingLeft
          ) / 4;
      return closestBtnLeft <= paddingFactorRight ||
        closestBtnRight <= paddingFactorLeft ||
        (scope instanceof HTMLElement &&
          parseFinite(getComputedStyle(scope).width) <=
            Array.from(scope.querySelectorAll("button")).reduce((acc, btn) => {
              return (acc += parseFinite(getComputedStyle(btn).width));
            }, 0))
        ? true
        : false;
    }
  } catch (e) {
    console.error(
      `Error executing checkButtonsOverlap:\n${(e as Error).message}`
    );
    return false;
  }
  return false;
}

export function stickToRelative(
  predefinedParent: voidishHtmlEl,
  ...absDescend: voidishHtmlEl[]
): void {
  // console.log("!STICKTORELATIVE: called");
  try {
    if (!Array.isArray(absDescend))
      throw typeError(absDescend, "validating absDescend argument", ["Array"]);
    absDescend = absDescend.filter(
      abs =>
        abs instanceof HTMLElement &&
        (getComputedStyle(abs).position === "absolute" ||
          getComputedStyle(abs).float !== "none")
    );
    if (absDescend.length === 0)
      throw ListError(
        absDescend,
        ['HTMLElement position="relative"', 'HTMLElement float!=="none"'],
        `validation of absDescend length`
      );
    // console.log("!STICKTORELATIVE: validated");
    absDescend.forEach((abs, i) => {
      try {
        if (!(abs instanceof HTMLElement))
          throw htmlElementNotFound(
            abs,
            `Absolutely or Floated positioned element`,
            ["HTMLElement"]
          );
        const relativeParent =
          predefinedParent ??
          searchAncestorsByProperty(abs, `position`, `relative`);
        // console.log(
        //   "!STICKTORELATIVE: Relative Parent ->" + relativeParent?.id ||
        //     relativeParent?.tagName ||
        //     "Undefined"
        // );
        if (relativeParent instanceof Element) {
          // console.log("!STICKTORELATIVE: Validated Parent");
          const checkStickPoint = (addPadding: boolean = true) => {
            if (
              documentData.accordionRefs[
                `${abs.id || abs.classList.toString() || "defAbsAccord"}`
              ]
            ) {
              abs.style.top =
                documentData.accordionRefs[
                  `${abs.id || abs.classList.toString() || "defAbsAccord"}`
                ];
              return;
            } else {
              // console.log("!STICKTORELATIVE: Defining accordion reference");
              const parentRect = relativeParent.getBoundingClientRect();
              const absRect = abs.getBoundingClientRect();
              let parentBoxSizing = "border-box";
              if (getComputedStyle(relativeParent).boxSizing !== "border-box")
                parentBoxSizing = `${
                  getComputedStyle(relativeParent).boxSizing
                }`;
              if (parentBoxSizing === "border-box") {
                if (addPadding) {
                  if (parentRect.bottom <= absRect.bottom) {
                    // console.log("!STICKTORELATIVE: Case parent <= abs");
                    // console.log(`!STICKTORELATIVE: ${relativeParent.tagName}`);
                    // console.log(
                    //   `!STICKTORELATIVE: Captured dimensions ${[
                    //     parseFinite(
                    //       getComputedStyle(relativeParent).paddingBottom
                    //     ),
                    //   ]}`
                    // );
                    const accordRef = `${
                      parentRect.bottom +
                      parseFinite(
                        getComputedStyle(relativeParent).paddingBottom
                      )
                    }px`;
                    abs.style.top = accordRef;
                    documentData.accordionRefs[
                      `${abs.id || abs.classList.toString() || "defAbsAccord"}`
                    ] = accordRef;
                  } else {
                    // console.log("!STICKTORELATIVE: Case parent > abs");
                    const accordRef = `${
                      parentRect.top +
                      parseFinite(getComputedStyle(relativeParent).paddingTop)
                    }px`;
                    abs.style.bottom = accordRef;
                    documentData.accordionRefs[
                      `${abs.id || abs.classList.toString() || "defAbsAccord"}`
                    ] = accordRef;
                  }
                } else {
                  parentRect.bottom < absRect.bottom
                    ? (abs.style.top = `${
                        parentRect.bottom / documentData.rem
                      }rem`)
                    : (abs.style.bottom = `${
                        parentRect.top / documentData.rem
                      }rem`);
                }
              }
            }
          };
          checkStickPoint();
          addEventListener("resize", () => {
            checkStickPoint(false);
          });
        } else
          console.warn(
            `Error validating relativeParent for ${abs.id || abs.tagName}`
          );
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for list argument for stickToRelative:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing stickToRelative:\n${(e as Error).message}`);
  }
}

export function switchPwVisibility(
  btn: voidishBtn,
  inp: voidishInp,
  rootedBtn?: voidishRoot
): void {
  try {
    if (!(btn instanceof HTMLButtonElement))
      throw htmlElementNotFound(
        btn,
        `Button for changing password field visibility`,
        ["<button>"]
      );
    if (
      !(
        inp instanceof HTMLInputElement &&
        (inp.type === "password" || inp.type === "text")
      )
    )
      throw htmlElementNotFound(
        inp,
        `Input field for the password visibility change`,
        ['<input type="password"> | <input type="text"']
      );
    inp.type === "password" ? (inp.type = "text") : (inp.type = "password");
    try {
      const eyeSvg = btn.querySelector("svg");
      if (!(eyeSvg instanceof SVGElement))
        throw elementNotFound(
          eyeSvg,
          `Svg element for displaying pw visibility`,
          ["<svg>"]
        );
      // console.log(btn);
      // console.log(rootedBtn);
      btn.style.maxWidth = `${
        (parseFinite(getComputedStyle(eyeSvg).width) || documentData.rem) * 1.5
      }px`;
      btn.style.maxHeight = `${
        (parseFinite(getComputedStyle(eyeSvg).height) || documentData.rem) * 1.5
      }px`;
      if (
        eyeSvg.classList.contains("bi-eye-fill") ||
        eyeSvg.classList.contains("bi-eye")
      ) {
        rootedBtn
          ? rootedBtn.render(<IconEyeSlash />)
          : (btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
						<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
						<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
					</svg>
					`);
      } else if (
        eyeSvg.classList.contains("bi-eye-slash-fill") ||
        eyeSvg.classList.contains("bi-eye-slash")
      ) {
        rootedBtn
          ? rootedBtn.render(<IconEyeShow />)
          : (btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
						<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
						<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
					</svg>
					`);
      }
    } catch (eS) {
      console.error(`Error changing SVG:${(eS as Error).message}`);
    }
  } catch (e) {
    console.error(`Error executing switchPwVisibility: 
	${(e as Error).message}`);
  }
}

export function defineDatePhVisib(
  scope: voidishHtmlEl | Document = document
): void {
  try {
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw new Error(
        `Invalid scope given to defineDatePhVisib. Obtained value: ${scope} \n Obtained instance: ${
          (scope as any)?.constructor.name || "undefined"
        }`
      );
    const elements = scope.querySelectorAll('input[type="date"]');
    if (!Array.isArray(elements) && !(elements instanceof NodeList))
      throw typeError(elements, `validating arguments for defineDatePhVisib`, [
        "Array",
      ]);
    elements.forEach((element, i) => {
      try {
        if (!(element instanceof HTMLInputElement && element.type === "date"))
          htmlElementNotFound(
            element,
            `Element id ${element?.id || "Unidentified"}`,
            ["<input>"]
          );
        const changeDateTransp = (targ: HTMLInputElement) => {
          // console.log(targ.value);
          if (
            targ.value.length > 0 ||
            !/mm/g.test(targ.value) ||
            !/dd/g.test(targ.value) ||
            !/yyyy/g.test(targ.value)
          ) {
            targ.style.color = "#000";
          } else targ.style.color = "transparent";
        };
        let validYear = "";
        const limitYear = (targ: HTMLInputElement) => {
          if (targ.value.length === 10) validYear = targ.value.slice(0);
          if (targ.value.length > 10) targ.value = validYear;
        };
        element.addEventListener(
          "input",
          function (this: HTMLInputElement, ev) {
            changeDateTransp(this ?? ev.currentTarget);
            limitYear(this ?? ev.currentTarget);
          }
        );
        element.addEventListener(
          "change",
          function (this: HTMLInputElement, ev) {
            changeDateTransp(this ?? ev.currentTarget);
          }
        );
      } catch (e) {
        console.error(
          `Error executing cicle ${i} check :${(e as Error).message}`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing defineDatePhVisib:\n${(e as Error).message}`
    );
  }
}

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

export function generateCarousel(
  bootstrap: boolean = false,
  ...els: voidishHtmlEl[]
): void {
  try {
    if (!Array.isArray(els))
      throw typeError(els, `validating els argument for generateCarousel`, [
        "Array",
      ]);
    els = els.filter(el => el instanceof HTMLElement);
    if (els.length === 0)
      throw ListError(
        els,
        ["HTMLElement"],
        `validating length of els argument in generateCarousel`,
        ...els
      );
    els.forEach((el, i) => {
      try {
        if (!(el instanceof HTMLElement) || !el.parentElement)
          throw htmlElementNotFound(
            el,
            `validation of Element in generateCarousel`,
            ["HTMLElement"]
          );
        //adding id and classes to carousel component
        if (el.parentElement.id === "")
          el.parentElement.id = `parent${textTransformPascal(
            el.parentElement.tagName
          )}Carousel${i}`;
        if (el.id === "")
          el.id = `carousel${i}${
            capitalizeFirstLetter(el.parentElement!.id) ||
            textTransformPascal(el.parentElement!.tagName)
          }`;
        if (!el.classList.contains("carousel")) el.classList.add("carousel");
        el.classList.add(
          `carousel${
            capitalizeFirstLetter(el.parentElement!.id) ||
            textTransformPascal(el.parentElement!.tagName)
          }`
        );
        //adding id and classes to images
        el.querySelectorAll("img").forEach((img, j) => {
          if (img.id === "")
            img.id = `carouselImg${j}${
              capitalizeFirstLetter(el.parentElement!.id) ||
              textTransformPascal(el.parentElement!.tagName)
            }`;
          img.classList.add(
            `carouselImg`,
            `carouselImg${
              capitalizeFirstLetter(el.parentElement!.id) ||
              textTransformPascal(el.parentElement!.tagName)
            }`
          );
          if (j === 0) {
            if (getComputedStyle(img.parentElement!).position !== "relative")
              img.parentElement!.style.position === "relative";
          } else {
            const firstImage = img.parentElement!.querySelector("img");
            try {
              if (
                !(img.parentElement instanceof HTMLElement) ||
                !(firstImage instanceof HTMLImageElement)
              )
                throw htmlElementNotFound(
                  firstImage,
                  `validation of firstImage in carousel ${
                    el.id || "unidentified"
                  }`,
                  ["HTMLImageElement"]
                );
              // console.log("PLACEHOLDING IMAGE");
              img.style.top = img.parentElement.style.top;
              img.style.left = img.parentElement.style.left;
              // img.x = 0
            } catch (e) {
              markWithCommentary(
                firstImage,
                `validation of First Image in Carousel`
              );
              console.error(
                `Error executing routine for placeholding image:\n${
                  (e as Error).message
                }`
              );
            }
          }
        });
        //adding dot buttons type, classes, dataset and aria
        try {
          const divDots = el.querySelector(`.divCarouselDots`);
          const dotBtns = divDots?.querySelectorAll("button");
          if (!(divDots instanceof HTMLElement))
            console.warn(
              `Div for Carousel ${
                el.id || "unidentified"
              } not found. That might lead to wrongly placed classifications.`
            );
          else {
            try {
              if (!dotBtns)
                throw typeError(
                  dotBtns,
                  `validation of list of Dot Buttons in ${
                    el.id || "unidentified"
                  }`,
                  ["NodeList"]
                );
              if (divDots instanceof HTMLElement)
                divDots.classList.add(`carousel-indicators`);
            } catch (eD) {
              console.error(
                `Error executing routine for classifying Dot Buttons:\n${
                  (eD as Error).message
                }`
              );
            }
          }
          //adding svg and classes to arrow buttons
          [
            ...Array.from(el.children).filter(
              child => child instanceof HTMLButtonElement
            ),
            ...Array.from(el.querySelectorAll("button")).filter(
              btn =>
                btn instanceof HTMLButtonElement &&
                btn.classList.contains("carouselArrow")
            ),
          ].forEach((arrowBtn, k) => {
            let arrowAncestralIdf = `${arrowBtn.parentElement!.id}`;
            if (arrowBtn.closest(".carousel"))
              arrowAncestralIdf = `${arrowBtn.closest(".carousel")!.id}`;
            if (arrowBtn.id === "")
              arrowBtn.id = `arrow${k}${capitalizeFirstLetter(
                arrowAncestralIdf
              )}`;
            if (!roots[`${arrowBtn.id}`]) {
              // console.log(
              //   "!CAROUSEL: generating root for arrow " + arrowBtn.id
              // );
              roots[`${arrowBtn.id}`] = createRoot(arrowBtn);
            }
            if (k === 0 || k % 2 === 0) {
              roots[`${arrowBtn.id}`].render(<IconArrowCLeft />);
              const arrowLeftInterv = setInterval(() => {
                if (
                  arrowBtn.closest(".carousel") &&
                  !arrowBtn
                    .closest(".carousel")
                    ?.querySelector("[class*=arrow-left]")
                )
                  roots[`${arrowBtn.id}`].render(<IconArrowCRight />);
                arrowBtn
                  .closest(".carousel")
                  ?.querySelector("[class*=arrow-left]") &&
                  clearInterval(arrowLeftInterv);
                setTimeout(() => {
                  if (!arrowBtn.closest(".carousel"))
                    // console.log(
                    //   "No carousel available for rendering. Aborting inclusion of Left Arrow SVG"
                    // );
                    clearInterval(arrowLeftInterv);
                }, 5000);
              }, 100);
              arrowBtn.classList.add(`btnCarouselLeft`);
              arrowBtn.setAttribute("data-bs-slide", "prev");
              (arrowBtn as HTMLElement).title = `Previous`;
            } else {
              roots[`${arrowBtn.id}`].render(<IconArrowCRight />);
              const arrowRightInterv = setInterval(() => {
                if (
                  arrowBtn.closest(".carousel") &&
                  !arrowBtn
                    .closest(".carousel")
                    ?.querySelector("[class*=arrow-right]")
                )
                  roots[`${arrowBtn.id}`].render(<IconArrowCRight />);
                arrowBtn
                  .closest(".carousel")
                  ?.querySelector("[class*=arrow-right]") &&
                  clearInterval(arrowRightInterv);
                setTimeout(() => {
                  if (!arrowBtn.closest(".carousel"))
                    console.log(
                      "No carousel available for rendering. Aborting inclusion of Right Arrow SVG"
                    );
                  clearInterval(arrowRightInterv);
                }, 5000);
              }, 100);
              arrowBtn.classList.add(`btnCarouselRight`);
              arrowBtn.setAttribute("data-bs-slide", "next");
              (arrowBtn as HTMLElement).title = `Next`;
            }
          });
        } catch (e) {
          console.error(
            `Error executing routine for classifying carousel Buttons:\n${
              (e as Error).message
            }`
          );
        }
        //adding id and classes for buttons in general
        el.querySelectorAll("btn").forEach((btn, l) => {
          if (btn.id === "")
            btn.id = `carouselBtn${l}${
              capitalizeFirstLetter(el.parentElement!.id) ||
              textTransformPascal(el.parentElement!.tagName)
            }`;
          btn.classList.add(
            `carouselBtn`,
            `carouselBtn${
              capitalizeFirstLetter(el.parentElement!.id) ||
              textTransformPascal(el.parentElement!.tagName)
            }`
          );
        });
        try {
          if (!(typeof bootstrap === "boolean"))
            throw typeError(
              bootstrap,
              `validating bootstrap argument for generateCarousel`,
              ["boolean"]
            );
          bootstrap && formatForBst(el?.parentElement);
        } catch (e) {
          console.error(`Error:${(e as Error).message}`);
        }
      } catch (eE) {
        markWithCommentary(el, `validating instance for generateCarousel`);
        console.error(
          `Error execution iteration ${i} for Elements in generateCarousel:\n${
            (eE as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing generateCarousel:\n${(e as Error).message}`);
  }
}

export function adjustCarouselDot(
  dotBtns: voidishEl[],
  carousel: voidishHtmlEl
): void {
  try {
    if (!Array.isArray(dotBtns))
      throw typeError(dotBtns, `validating dotBtns in adjustCarouselDot`, [
        "Array",
      ]);
    dotBtns = dotBtns.filter(dotBtn => dotBtn instanceof HTMLButtonElement);
    if (dotBtns.length === 0)
      throw ListError(
        dotBtns,
        ["HTMLButtonElement"],
        `validating dotBtns length in adjustCarouselDot`
      );
    if (
      !(
        carousel instanceof HTMLElement &&
        carousel.classList.contains("carousel")
      )
    )
      throw htmlElementNotFound(
        carousel,
        `validating carousel argument in adjustCarouselDot`,
        ['HTMLElement className="carousel"']
      );
    dotBtns.forEach((dotBtn, i) => {
      try {
        if (!(dotBtn instanceof HTMLButtonElement))
          throw htmlElementNotFound(dotBtn, `validation of Dot Button`, [
            "HTMLButtonElement",
          ]);
        if (i === 0) {
          dotBtn.classList.add(`active`);
          dotBtn.setAttribute("aria-current", "true");
        }
        if (Number.isFinite(parseFloat(getComputedStyle(dotBtn).width))) {
          dotBtn.style.transform = `translate(${
            parseFinite(getComputedStyle(dotBtn).width) * 1.6 * i
          }px, 0)`;
          addEventListener("resize", () => {
            dotBtn.style.transform = `translate(${
              parseFinite(getComputedStyle(dotBtn).width) * 1.6 * i
            }px, 0)`;
          });
        } else {
          console.warn(`Width for dotBtn invalidated:
          Index: ${i};
          Number: ${parseFloat(getComputedStyle(dotBtn).width)}`);
        }
        dotBtn.type = "button";
        dotBtn.setAttribute("data-bs-target", `#${carousel.id}`);
        dotBtn.setAttribute("data-bs-slide-to", `${i}`);
        dotBtn.classList.add(`dotBtn`);
        dotBtn.setAttribute("aria-label", `Slide ${i + 1}`);
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for adjustCarouselDot:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing adjustCarouselDot:\n${(e as Error).message}`
    );
  }
}

export function generateAccordion(...accordionConts: voidishHtmlEl[]): void {
  try {
    if (!Array.isArray(accordionConts))
      throw typeError(
        accordionConts,
        `validation of accordionConts argument in generateAccordion`,
        ["HTMLElement"]
      );
    accordionConts = accordionConts.filter(
      accordionCont =>
        accordionCont instanceof HTMLElement &&
        /accordion/gi.test(accordionCont.classList.toString())
    );
    if (accordionConts.length === 0)
      throw ListError(
        accordionConts,
        ["HTMLElement"],
        `validation of length of accordionConts`
      );
    accordionConts.forEach((accordionCont, i) => {
      try {
        if (!(accordionCont instanceof HTMLElement))
          throw htmlElementNotFound(
            accordionCont,
            `validation of Accordion Container Element`,
            ["HTMLElement"]
          );
        if (accordionCont.id === "")
          accordionCont.id = `accordionCont${i}${textTransformPascal(
            accordionCont.closest("header")?.id ||
              accordionCont.closest("main")?.id ||
              accordionCont.closest("footer")?.id ||
              "undefinedParent"
          )}${document.querySelectorAll("[id^=accordionCont]").length}`;
        accordionCont.classList.add("accordMainCont", "accordion-container");
        [
          ...accordionCont.querySelectorAll("ul"),
          ...accordionCont.querySelectorAll("ol"),
          ...accordionCont.querySelectorAll("dl"),
        ].forEach((list, j) => {
          if (list.id === "")
            list.id = `accordionList${j}${textTransformPascal(
              accordionCont.id || "undefinedParent"
            )}${
              accordionCont.querySelectorAll('[id^="accordionList"]').length
            }`;
          list.classList.add(
            `accordionList`,
            `accordionList${textTransformPascal(
              accordionCont.id || "undefinedParent"
            )}`
          );
          [
            ...list.querySelectorAll("li"),
            ...list.querySelectorAll("dt"),
            ...list.querySelectorAll("dd"),
          ].forEach((listItem, k) => {
            if (listItem.id === "")
              listItem.id = `accordionLItem${k}Nest${textTransformPascal(
                list.id || "undefinedParent"
              )}`;
            listItem
              .querySelector("button")
              ?.classList.add(
                `accordionItem`,
                `accordionItem${
                  textTransformPascal(accordionCont.id) || "undefinedParent"
                }`
              );
          });
        });
        accordionCont.querySelectorAll("button").forEach((btn, j) => {
          if (btn.id === "")
            btn.id = `accordionButton${j}${textTransformPascal(
              accordionCont.id || "undefinedParent"
            )}`;
          btn.classList.add(
            `accordionBtn`,
            `accordionBtn${textTransformPascal(
              accordionCont.id || "undefinedParent"
            )}`
          );
        });
        [
          ...accordionCont.querySelectorAll("div"),
          ...accordionCont.querySelectorAll("section"),
        ].forEach(sect => {
          if (sect.id === "")
            sect.id = `accordion${textTransformPascal(sect.tagName)}${
              accordionCont.querySelectorAll(sect.tagName.toLowerCase()).length
            }${textTransformPascal(accordionCont.id || "undefinedParent")}`;
          sect.classList.add(
            `accordionGenericDivision`,
            `accordion${textTransformPascal(sect.tagName)}`,
            `accordionDivision${textTransformPascal(
              accordionCont.id || "undefinedParent"
            )}`
          );
        });
      } catch (e) {
        markWithCommentary(accordionCont, `validation of accordionCont`);
        console.error(
          `Error executing iteration ${i} for generateAccordion:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing generateAccordion:\n${(e as Error).message}`
    );
  }
}
