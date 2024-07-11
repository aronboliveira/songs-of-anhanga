import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import { LogoProps } from "src/lib/declarations/interfaces";
import { textTransformPascal } from "src/lib/handlers/handlersStyles";

export default function LogoMain({
  logoCase = "accordion",
}: LogoProps): JSX.Element {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Logo" />
      )}
    >
      <div
        className={`fade-in-late-element headerLogo headerCase${textTransformPascal(
          logoCase
        )}`}
      >
        <h1 style={{ color: "#ffff", marginLeft: "1rem", fontWeight: "800" }}>
          Songs of Anhangá — UNDER CONSTRUCTION
        </h1>
      </div>
    </ErrorBoundary>
  );
}
