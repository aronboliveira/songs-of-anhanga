import { useEffect, useRef, useState } from "react";
import { ClassPanelProps } from "src/lib/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import { capitalizeFirstLetter } from "src/lib/handlers/handlersStyles";
import { initFillAttrs, syncAriaStates } from "src/lib/handlers/handlersCommon";
import { useRouter } from "next/router";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import {
  htmlElementNotFound,
  typeError,
} from "src/lib/handlers/handlersErrors";
import { nlDiv } from "src/lib/declarations/types";
import ClassFigure from "src/components/classes/ClassFigure";

export default function ClassPanel(props: ClassPanelProps) {
  const router = useRouter();
  const mainRef = useRef<nlDiv>(null);
  const [mounted, setMount] = useState<boolean>(false);
  const capitalizedClass = capitalizeFirstLetter(props.className);
  useEffect(() => {
    setMount(true);
  }, []);
  useEffect(() => {
    try {
      if (!(mainRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          mainRef.current,
          `validation of ClassPanel Main Reference`
        );
      syncAriaStates(mainRef.current);
      initFillAttrs(capitalizedClass, mainRef.current);
      document.querySelectorAll("figure").forEach((fig, i) => {
        try {
          fig.id = fig.id.replaceAll("-counter", `-${i + 1}`);
        } catch (e) {
          console.error(
            `Error executing cicle ${i} for filling figure counts:\n${
              (e as Error).message
            }`
          );
        }
      });
      document.querySelectorAll("figcaption").forEach((cap, i) => {
        try {
          cap.id = cap.id.replaceAll("-counter", `-${i + 1}`);
        } catch (e) {
          console.error(
            `Error executing cicle ${i} for filling caption counts:\n${
              (e as Error).message
            }`
          );
        }
      });
      document.querySelectorAll("img").forEach((img, i) => {
        try {
          if (!(img instanceof HTMLImageElement))
            throw htmlElementNotFound(img, `validation of Img Element`, [
              "HTMLImageElement",
            ]);
          img.id = img.id.replaceAll("-count", `-${i + 1}`);
        } catch (e) {
          console.error(
            `Error executing iteration ${i} of img counting filling:\n${
              (e as Error).message
            }`
          );
        }
      });
    } catch (e) {
      console.error(
        `Error executing useEffect for panel of ${props.className}:${
          (e as Error).message
        }`
      );
    }
  }, [mounted]);
  return !mounted ? (
    <></>
  ) : (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent
          message={`Error loading page for ${props.className}`}
        />
      )}
    >
      <div
        className="classPanelMainDiv"
        id={`classPanelMainDiv${capitalizedClass}`}
        ref={mainRef}
      >
        <article className="classArtc" id={`artc${capitalizedClass}`}>
          <header className="classHdr" id={`header${capitalizedClass}`}>
            <h1
              className="classHdn"
              id={`heading${capitalizedClass}`}
            >{`${capitalizedClass}`}</h1>
            <button
              className="classReturn btn-secondary"
              onClick={() => router.push("/")}
            >
              Return to Main Page
            </button>
          </header>
          <main className="classBody" id={`body${capitalizedClass}`}>
            {props.imgDir.map((img, i) => {
              try {
                if (typeof img !== "string")
                  throw typeError(img, `validation of argument img ${i} type`, [
                    "string",
                  ]);
                return (
                  <ClassFigure
                    imgSrc={img}
                    idf={capitalizedClass}
                    key={`${img}_${i}`}
                    caption={props.captions ? props.captions[i] : "TEXTO"}
                  />
                );
              } catch (e) {
                console.error(
                  `Error executing iteration ${i} for rendering Class Figures:\n${
                    (e as Error).message
                  }`
                );
                return <></>;
              }
            })}
          </main>
        </article>
      </div>
    </ErrorBoundary>
  );
}
