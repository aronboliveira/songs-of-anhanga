import { capitalizeFirstLetter } from "src/lib/handlers/handlersStyles";
import { LinkProps } from "../../lib/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";

export default function LinkGeneric({
  innerTextL,
  href,
  target,
  rel,
}: LinkProps) {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error loading Link`} />
      )}
    >
      <a
        id={`anchor${capitalizeFirstLetter(innerTextL)}`}
        className="highlight"
        href={`${href}`}
        target={`${target}`}
        rel={`${rel}`}
      >{`${innerTextL}`}</a>
    </ErrorBoundary>
  );
}
