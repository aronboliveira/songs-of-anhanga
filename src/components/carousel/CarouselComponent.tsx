import { useEffect, useRef, useState } from "react";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import {
  adjustCarouselDot,
  capitalizeFirstLetter,
  generateCarousel,
} from "src/lib/handlers/handlersStyles";
import { CarouselProps } from "src/lib/declarations/interfaces";
import { nlDiv } from "src/lib/declarations/types";
import { ErrorBoundary } from "react-error-boundary";
// import LoginMainBody from "./LoginMainBody";
import CarouselImg from "./CarouselImg";
import { parseFinite } from "src/lib/handlers/handlersMath";
// import { formatForBst } from "src/lib/handlersFormatFill";
// import { roots } from "src/lib/controller";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";

export default function CarouselComponent({
  // ParentComponentName,
  // root,
  imgNames,
}: CarouselProps): JSX.Element {
  // console.log("!CAROUSEL: 3.1. Reached Component call");
  const [imageList, setImageList] = useState<string[]>(imgNames),
    [imgs, setImgs] = useState<JSX.Element[]>(
      Array.from({ length: imgNames.length }).map(l => (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading {`${l}`}...</span>
        </div>
      ))
    ),
    [loaded, setLoaded] = useState<boolean>(false),
    mainRef = useRef<nlDiv>(null),
    carouselRef = useRef<nlDiv>(null),
    divImgRef = useRef<nlDiv>(null),
    dotsRef = useRef<nlDiv>(null),
    checkImgNames = (): string[] => {
      if (imgNames.length === 0) console.warn(`No image names available`);
      if (imgNames.some(imgName => imgName === "")) {
        imgNames.forEach((imgName, i) => {
          imgName === "" && console.warn(`imgName ${i} is a empty string`);
        });
      }
      return Array.from(new Set(imgNames));
    },
    renderImgs = (opts?: { bug?: boolean }): JSX.Element[] => {
      return opts?.bug
        ? Array.from({ length: imgNames.length }).map(() => (
            <button type="button" className="btn btn-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bug-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"></path>
                <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"></path>
              </svg>
              <strong>Reload Page</strong>
            </button>
          ))
        : imageList.map((img, i) => {
            return (
              <CarouselImg
                key={`carouselImg-${carouselRef.current!.id || `brk`}${i}`}
                subDir={"img/campaigns/"}
                fullName={img}
              />
            );
          });
    },
    renderIndicators = (): JSX.Element[] => {
      const dotBtns = imageList.map((img, i) => {
        // console.log(`RENDERING INDICATOR ${i}`);
        return (
          <button
            key={`carouselIndicator-${i}`}
            id={`indicator${capitalizeFirstLetter(img)}`}
            className={`dot dot${
              capitalizeFirstLetter(
                carouselRef.current?.id || "unidentified"
              ) || "Unidentified"
            }`}
          ></button>
        );
      });
      return dotBtns;
    };
  // useEffect(() => {
  // if (imgCounter < imageList.length) return;
  // }, [imgCounter]);
  useEffect(() => {
    // console.log("!CAROUSEL: 4.1. Reached carouselRef useEffect");
    try {
      // if (!(mainRef.current instanceof HTMLElement))
      //   throw htmlElementNotFound(
      //     mainRef.current,
      //     `Main Reference in ${ParentComponentName}`,
      //     ["HTMLElement"]
      //   );
      // if (!(carouselRef.current instanceof HTMLElement))
      //   throw htmlElementNotFound(
      //     carouselRef.current,
      //     `Carouself Reference in ${ParentComponentName}`,
      //     ["HTMLElement"]
      //   );
      // console.log("!CAROUSEL: 4.2. useEffect for carouselRef try succesful");
      generateCarousel(true, carouselRef.current);
      try {
        const bootstrap = require("bootstrap");
        const carouselInstance = new bootstrap.Carousel(carouselRef.current!);
        // console.log(carouselInstance);
      } catch (e) {
        console.error(
          `Error executing routine for classifying bootstrap in Carousel:\n${
            (e as Error).message
          }`
        );
      }
      const footer = document.querySelector("footer");
      try {
        if (!(footer instanceof HTMLElement && footer.tagName === "FOOTER"))
          throw htmlElementNotFound(footer, `validation of footer element`, [
            "<footer>",
          ]);
        const headerElFooter = document.querySelector(".headerElFooter");
        if (!(headerElFooter instanceof HTMLElement))
          throw htmlElementNotFound(
            headerElFooter,
            `validation of Header Element in Footer`,
            ["HTMLElement"]
          );
        const difBottomFooterSects = Math.max(
          parseFinite(getComputedStyle(headerElFooter).paddingBottom) || 0,
          Array.from(footer.children).reduce((acc, child) => {
            return acc <= 0
              ? 0
              : Math.abs(acc - child.getBoundingClientRect().bottom);
          }, 0)
        );
        // console.log(difBottomFooterSects);
        if (
          Number.isFinite(difBottomFooterSects) &&
          difBottomFooterSects >= 0
        ) {
          carouselRef.current!.style.transform = `translate(0, -${
            (parseFinite(getComputedStyle(carouselRef.current!).height) +
              difBottomFooterSects) /
            20
          }px)`;
        } else {
          console.warn(`Error reading difference between Sections of Footer:
          Is Finite: ${Number.isFinite(difBottomFooterSects)};
          Is positive: ${difBottomFooterSects >= 0}`);
        }
      } catch (e) {
        console.error(
          `Error executing routine for equalizing Carousel with Footter:\n${
            (e as Error).message
          }`
        );
      }
    } catch (e) {
      console.error(
        `Error executing useEffect for carouselRef:\n${(e as Error).message}`
      );
    }
  }, []);
  useEffect(() => {
    // console.log("!CAROUSEL: 5.1. Reached divImgRef useEffect");
    try {
      if (!(divImgRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          divImgRef.current,
          `Div for Image content in <main>`,
          ["HTMLElement"]
        );
      // console.log("!Carousel: 5.2. useEffect for divImgRef sucessful");
      setLoaded(true);
    } catch (e) {
      console.error(
        `Error executing useEffect for divImgRef:${(e as Error).message}`
      );
    }
  }, [divImgRef, imageList]);
  useEffect(() => {
    // console.log("!CAROUSEL: 6.0. Reached loaded useEffect");
    loaded && setImageList(checkImgNames());
  }, [loaded]);
  useEffect(() => {
    // console.log("!CAROUSEL: 7.1. Reached useEffect for dotsRef");
    try {
      if (!(carouselRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          carouselRef.current,
          `validation of Carousel Reference`,
          ["HTMLElement"]
        );
      if (!(dotsRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          dotsRef.current,
          `validation of Dots container reference`,
          ["HTMLElement"]
        );
      // console.log("!CAROUSEL: 7.2. useEffect for dotsRef was Succesfull");
      adjustCarouselDot(
        Array.from(carouselRef.current.querySelectorAll(".dot")),
        carouselRef.current
      );
    } catch (e) {
      console.error(
        `Error executing useEffect for Carousel Dots:\n${(e as Error).message}`
      );
    }
  }, [dotsRef, imgs]);
  useEffect(() => {
    setImgs(renderImgs());
  }, [imageList]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Carousel Container!"></GenericErrorComponent>
      )}
    >
      <div className="carouselParent" ref={mainRef}>
        <div ref={carouselRef} className="carousel">
          {imageList && (
            <ErrorBoundary FallbackComponent={() => <></>}>
              <div className="divCarouselDots" ref={dotsRef}>
                <ErrorBoundary FallbackComponent={() => <></>}>
                  {loaded && renderIndicators()}
                </ErrorBoundary>
              </div>
              <div id="mainCarousel" ref={divImgRef}>
                <ErrorBoundary FallbackComponent={() => <></>}>
                  {imgs}
                </ErrorBoundary>
              </div>
              <button></button>
              <button></button>
            </ErrorBoundary>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
