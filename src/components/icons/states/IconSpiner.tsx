import { SpinnerComponentProps } from "src/lib/declarations/interfaces";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import { ErrorBoundary } from "react-error-boundary";

export default function Spinner(
  props: Partial<SpinnerComponentProps>
): JSX.Element {
  const spinnerClass = props?.spinnerClass ?? "spinner-border",
    spinnerColor = props?.spinnerColor ?? "text-light",
    message = props?.message ?? "Loading...";
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
