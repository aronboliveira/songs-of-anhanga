import { useEffect, useRef } from "react";
import { nullishSpan } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";

export default function IconX(): JSX.Element {
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
        `Error executing useEffect for ${IconX.prototype.constructor.name}:\n${
          (e as Error).message
        }`
      );
    }
  }, [svgRef]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-twitter-x"
      viewBox="0 0 16 16"
    >
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  );
}
