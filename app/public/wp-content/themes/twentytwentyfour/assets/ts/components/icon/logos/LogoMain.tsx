import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../components/errors/GenericErrorComponent";
import { LogoProps } from "../../../lib/declarations/interfaces";
import { textTransformPascal } from "../../../lib/handlers/handlersStyles";
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
        <p
          style={{
            color: "#ffff",
            fontSize: "2rem",
            marginLeft: "1rem",
            fontWeight: "700",
            verticalAlign: "middle",
            marginBottom: "0.5rem",
          }}
        >
          Songs of Anhangá
        </p>
        <img
          src="http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-favicon-tree-2.webp"
          alt="Default Logo"
          loading="lazy"
          decoding="async"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        ></img>
      </div>
    </ErrorBoundary>
  );
}
