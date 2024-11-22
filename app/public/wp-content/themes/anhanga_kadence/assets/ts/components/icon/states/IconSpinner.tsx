import { SpinnerComponentProps } from "lib/declarations/interfaces";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default class Spinner extends Component<SpinnerComponentProps> {
  static defaultProps = {
    spinnerClass: "spinner-border",
    spinnerColor: "spinner-secondary",
    message: "Loading...",
  };
  render() {
    const { spinnerClass, spinnerColor, message } = this.props;
    return (
      <ErrorBoundary
        FallbackComponent={() => (
          <GenericErrorComponent message="Error loading Spinner" />
        )}
      >
        <div
          className={`${spinnerClass} ${spinnerColor} spinner`}
          role="status"
        >
          <span className="visually-hidden">{`${message}`}</span>
        </div>
      </ErrorBoundary>
    );
  }
}
