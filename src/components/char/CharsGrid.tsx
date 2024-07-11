import { useRef, useEffect, useState } from "react";
import { nullishNav, voidishJSXAr } from "src/lib/declarations/types";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";
import { ErrorBoundary } from "react-error-boundary";
import RetryErrorComponent from "../errors/ErrorComponentRetry";
import { FigureCharsProps, GridProps } from "src/lib/declarations/interfaces";
import {
  ListError,
  fetchError,
  htmlElementNotFound,
  typeError,
} from "src/lib/handlers/handlersErrors";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { chunkArray } from "src/lib/handlers/handlersLists";
import SectChars from "./CharsSect";

export default function GridChars({
  id,
  tab,
  nFigs = 3,
  router,
}: GridProps): JSX.Element {
  const mainRef = useRef<nullishNav>(null);
  const [sectElements, setSectElements] = useState<voidishJSXAr>(null);
  useEffect(() => {
    (async () => {
      try {
        if (!(mainRef.current instanceof HTMLElement))
          throw htmlElementNotFound(
            mainRef.current,
            `Main <nav> for GridChars id ${id}`,
            ["<nav>"]
          );
        if (!(typeof id === "string"))
          throw typeError(id, `validating id of GridChars`, ["string"]);
        if (!(typeof nFigs === "number"))
          throw typeError(
            nFigs,
            `validating number of Figures per section argumented to GridChars id ${id}`,
            ["number"]
          );
        const res = await fetch(`/data/${tab}.json`, { method: "GET" });
        if (!res.ok) throw fetchError(res);
        const data: Record<string, FigureCharsProps> = await res.json();
        if (
          !(data instanceof Object) ||
          !Array.from(Object.values(data)).some(group => {
            return Object.values(group)
              .filter(charInfo => charInfo instanceof Object)
              .every(
                charInfo => charInfo instanceof Object && "mainPart" in charInfo
              );
          })
        )
          throw ListError(
            data as any,
            ["string"],
            `
            Validating json data for fetch of GridChars id ${id}
            Fetched data check: ${Array.from(Object.values(data)).some(
              group =>
                group instanceof Object &&
                Object.values(group).some(charInfo => {
                  charInfo instanceof Object && "mainPart" in charInfo;
                })
            )}`,
            data || []
          );
        const spreadLength = ((...data) => {
          return Object.keys(data[0]).length;
        })(...Object.values(data));
        const chunkedValues = chunkArray(
          Object.values(data),
          spreadLength / 3,
          true
        );
        //@ts-ignore
        const chunkedSects = chunkedValues.map((chunk, i) => {
          return (
            <SectChars
              initialIds={chunk}
              nFigs={chunk.length}
              key={`sect-${id}-${i}`}
              router={router}
            />
          );
        });
        setSectElements(chunkedSects);
        return chunkedSects;
      } catch (e) {
        console.error(
          `Error executing renderSection for Grid id ${id || "falsish"}: ${
            (e as Error).message
          };`
        );
        const errorSect = (
          <RetryErrorComponent
            message={`Error loading Grid of Characters! \n Attempt to reload initiated.`}
            altRoot={
              mainRef.current?.parentElement ??
              document.getElementById(`${id}Dlg`)
            }
            altJsx={
              <GridChars id={id} nFigs={nFigs} tab={tab} router={router} />
            }
          />
        );
        setSectElements(errorSect);
        return errorSect;
      }
    })();
    syncAriaStates(mainRef.current);
  }, [mainRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent
          message={`Error loading Grid of Characters! ☠ \n`}
        />
      )}
    >
      <nav id={`grid${id}`} className="gridChars" ref={mainRef}>
        {sectElements}
      </nav>
    </ErrorBoundary>
  );
}
