import { SpinnerComponentProps } from "src/lib/declarations/interfaces";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import { ErrorBoundary } from "react-error-boundary";

export default function Spinner({
  spinnerClass = "spinner-border",
  spinnerColor = "",
  message = "Loading...",
}: SpinnerComponentProps): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Spinner" />
      )}
    >
      <div className={`${spinnerClass} ${spinnerColor} spinner`} role="status">
        <span className="visually-hidden">{`${message}`}</span>
      </div>
    </ErrorBoundary>
  );
}
