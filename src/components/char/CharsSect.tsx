import {
  CharsState,
  SectCharsAction,
  SectCharsProps,
} from "src/lib/declarations/interfaces";
import FigureChar from "./CharFigure";
import { nullishSect } from "src/lib/declarations/types";
import { useRef, useLayoutEffect, useReducer, useMemo } from "react";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";

export default function SectChars({
  initialIds,
  router,
}: SectCharsProps): JSX.Element {
  const mainRef = useRef<nullishSect>(null);
  const [charsState, setChars] = useReducer(
    (charsState: CharsState, action: SectCharsAction): CharsState => {
      switch (action.type) {
        case "SET_ID":
          return {
            ...charsState,
            ids: action.payload,
            sectionId: `sect-${action.payload
              .map(item => item.mainPart)
              .join("-")
              .replaceAll(" ", "-")
              .replaceAll(",", "_")}`,
          };
        case "UPDATE_SECTION_ID":
          return {
            ...charsState,
            ids: charsState.ids,
            sectionId: `sect-${charsState.ids
              .map(item => item.mainPart)
              .join("-")
              .replaceAll(" ", "-")
              .replaceAll(",", "_")}`,
          };
        default:
          return charsState;
      }
    },
    {
      ...{
        ids: [],
        sectionId: "unfilled",
      },
      ids: initialIds,
    }
  );
  const renderChars = () =>
    useMemo(() => {
      return charsState.ids.flatMap((charInfo, i) => {
        if (Array.isArray(charInfo)) charInfo = charInfo.flat(Infinity) as any;
        return (
          <FigureChar
            key={`fig-${charInfo.mainPart || `brk${i}`}`}
            mainPart={charInfo.mainPart}
            prefix={charInfo.prefix}
            extension={charInfo.extension}
            router={router}
          />
        );
      });
    }, [charsState.ids]);
  useLayoutEffect(() => {
    try {
      if (
        !(
          mainRef.current instanceof HTMLElement &&
          mainRef.current.tagName === "SECTION"
        )
      )
        throw htmlElementNotFound(
          mainRef.current,
          `Reference for Characters Section`,
          ["<section>"]
        );
      setChars({ type: "SET_ID", payload: initialIds });
      // @ts-ignore
      if (!String.prototype.replaceAll) {
        console.warn(
          `The current browser does not support ES6. That might lead to unexpected initialIds.`
        );
        let safeAcc = 0;
        while (/\s/g.test(mainRef.current.id)) {
          mainRef.current.id.replace(" ", "-");
          if (safeAcc > 999) {
            console.warn(
              `while loop for replacing white spaces within section id ${
                mainRef.current.id || "falsish"
              } aborted.`
            );
            break;
          }
        }
        while (/,/g.test(mainRef.current.id)) {
          mainRef.current.id.replace(",", "_");
          if (safeAcc > 999) {
            console.warn(
              `while loop for replacing commas within section id ${
                mainRef.current.id || "falsish"
              } aborted.`
            );
            break;
          }
        }
      }
      // console.log("CHARSTATE");
      // console.log(charsState.sectionId);
      mainRef.current.id = charsState.sectionId;
    } catch (e) {
      console.error(
        `Error executing useEffect for section related to initialIds ${JSON.stringify(
          initialIds ?? [""]
        )}: ${(e as Error).message}`
      );
    }
    syncAriaStates(mainRef.current);
  }, [mainRef, charsState.ids, charsState.sectionId]);
  return (
    <section className="sectsChars" id="unfilled" ref={mainRef}>
      {renderChars().map(char => char)}
    </section>
  );
}
