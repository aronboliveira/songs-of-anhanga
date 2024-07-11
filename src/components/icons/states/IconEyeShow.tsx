import { useRef, useEffect } from "react";
import { nullishSpan } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";

export default function IconEyeShow(): JSX.Element {
  const svgRef = useRef<nullishSpan>(null);
  useEffect(() => {
    try {
      if (!(svgRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          svgRef.current,
          `validation of SVG span reference`,
          ["HTMLElement"]
        );
      syncAriaStates(svgRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for ${
          IconEyeShow.prototype.constructor.name
        }:\n${(e as Error).message}`
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
        className="bi bi-eye-fill"
        viewBox="0 0 16 16"
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
      </svg>
    </span>
  );
}
