import { ErrorBoundary } from "react-error-boundary";
import { LinkSocialIconProps } from "../../lib/declarations/interfaces";
import ErrorComponentIcon from "../errors/ErrorIcon";
import Spinner from "../../components/icon/states/IconSpinner";
import {
  capitalizeFirstLetter,
  textTransformPascal,
} from "../../lib/handlers/handlersStyles";
import { useRef, useEffect } from "react";
import { nullishAnchor } from "../../lib/declarations/types";
import { syncAriaStates } from "../../lib/handlers/handlersCommon";
// import { roots } from "../../lib/controller";
// import clearRootDef, {
//   attemptRenderSocialIconDef,
// } from "../../lib/handlers/handlersDef";

export default function LinkSocialIcon(props: LinkSocialIconProps) {
  const aRef = useRef<nullishAnchor>(null);
  useEffect(() => {
    // attemptRenderSocialIconDef(roots, aRef.current, props.iconCase);
    syncAriaStates(aRef.current);
    // () => clearRootDef(roots, aRef.current?.id || "undefined");
    // return () => clearRootDef(roots, aRef.current?.id || "undefined");
  }, [aRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => <ErrorComponentIcon fill={false} />}
    >
      <a
        ref={aRef}
        id={`anchor${capitalizeFirstLetter(props.innerTextL)}`}
        className="highlight"
        href={`${props.href}`}
        target={`${props.target}`}
        rel={`${props.rel}`}
        title={`${props.href}`}
      >
        <Spinner
          spinnerClass="spinner-grow"
          spinnerColor="text-light"
          message={`Loading icon for ${textTransformPascal(props.iconCase)}`}
        />
      </a>
    </ErrorBoundary>
  );
}
