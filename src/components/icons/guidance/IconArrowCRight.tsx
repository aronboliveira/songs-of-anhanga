import { useEffect } from "react";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { ErrorBoundary } from "react-error-boundary";

export default function IconArrowCRight(): JSX.Element {
  useEffect(() => {
    syncAriaStates();
  }, []);
  return (
    <ErrorBoundary FallbackComponent={() => <IconArrowCRight />}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-right-circle"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
        />
      </svg>
      <span
        className="visually-hidden previousCarouselSpan"
        style={{ display: "hidden" }}
      >
        Next
      </span>
    </ErrorBoundary>
  );
}