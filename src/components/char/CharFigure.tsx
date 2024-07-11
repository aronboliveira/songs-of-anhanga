import { FigureCharsProps } from "src/lib/declarations/interfaces";
import { useRef, useEffect } from "react";
import { nullishFig } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { FigureData } from "src/lib/declarations/classes";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";
import {
  fillFiguresData,
  formatForSelectors,
} from "src/lib/handlers/handlersFormatFill";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";

export default function FigureChar({
  mainPart,
  prefix = "dall-e-",
  extension = "jpeg",
  router,
}: FigureCharsProps): JSX.Element {
  const mainRef = useRef<nullishFig>(null);
  const figure = new FigureData({ prefix, mainPart, extension, router });
  useEffect(() => {
    try {
      if (
        !(
          mainRef.current instanceof HTMLElement &&
          mainRef.current.tagName === "FIGURE"
        )
      )
        throw htmlElementNotFound(
          mainRef.current,
          `Figure for mainPart ${mainPart}`,
          ["<figure>"]
        );
      let simplifyCapt = false;
      if (
        mainRef.current.closest("nav")?.id !== "" &&
        /classes/gi.test(mainRef.current.closest("nav")!.id)
      )
        simplifyCapt = true;
      formatForSelectors(mainRef.current);
      fillFiguresData(mainRef.current, simplifyCapt);
    } catch (e) {
      console.error(
        `Error executing useEffect for Figure related to mainPart ${mainPart}: ${
          (e as Error).message
        }`
      );
    }
    syncAriaStates(mainRef.current);
  }, [mainRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error loading Figure`} />
      )}
    >
      <figure className="charCard" id={`${figure.mainPart}Card`} ref={mainRef}>
        <img
          className="charImg"
          id={figure.mainPart || "invalidId"}
          src={`/img/${figure.getPrefix()}${figure.mainPart}.${
            figure.extension
          }`}
          alt={`${figure.mainPart}` || "Invalidated"}
          onClick={ev => {
            try {
              if (
                ev.currentTarget instanceof HTMLElement &&
                ev.currentTarget.closest("dialog") &&
                /classes/gi.test(ev.currentTarget.closest("dialog")!.id)
              ) {
                if (/warrior/gi.test(ev.currentTarget.id))
                  router.push("/classes/fighter");
                else if (/lich/gi.test(ev.currentTarget.id))
                  router.push("/classes/sorcerer");
                else if (/priest/gi.test(ev.currentTarget.id))
                  router.push("/classes/sorcerer");
                else if (/shotter/gi.test(ev.currentTarget.id))
                  router.push("/classes/marskaman");
                else if (/tinker/gi.test(ev.currentTarget.id))
                  router.push("/classes/tinker");
                else if (/warlock/gi.test(ev.currentTarget.id))
                  router.push("/classes/sorcerer");
              }
            } catch (e) {
              console.error(
                `Error executing callback for Click on Figure ${
                  figure.mainPart || "invalidId"
                }:${(e as Error).message}`
              );
            }
          }}
        />
        <canvas></canvas>
        <figcaption
          className="charCaption"
          id={`${figure.mainPart || "invalidated"}Capt`}
        ></figcaption>
      </figure>
    </ErrorBoundary>
  );
}
