import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { useEffect, useRef } from "react";
import { nullishSpan } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";

export default function IconList(): JSX.Element {
  const relSvg = useRef<nullishSpan>(null);
  useEffect(() => {
    try {
      if (!(relSvg.current instanceof HTMLElement))
        throw htmlElementNotFound(
          relSvg.current,
          `validation of Related HTMLElement for IconList SVG`,
          ["HTMLElement"]
        );
      syncAriaStates(relSvg.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for Related Svg Reference:\n${
          (e as Error).message
        }`
      );
    }
  }, [relSvg]);
  return (
    <span ref={relSvg}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </span>
  );
}
