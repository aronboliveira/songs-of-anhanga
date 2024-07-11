import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { useEffect, useRef } from "react";
import { nullishSpan } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";

export default function IconClose(): JSX.Element {
  const svgRef = useRef<nullishSpan>(null);
  useEffect(() => {
    try {
      if (!(svgRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          svgRef.current,
          `validation of Svg Reference for Icon Close`,
          ["HTMLElement"]
        );
      syncAriaStates(svgRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for Svg Reference in Icon Close:\n${
          (e as Error).message
        }`
      );
    }
  }, [svgRef]);
  return (
    <span ref={svgRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
    </span>
  );
}
