import { ErrorBoundary } from "react-error-boundary";
import { useState, useEffect, useRef, useMemo } from "react";
import { LinkSocialIconProps } from "src/lib/declarations/interfaces";
import ErrorComponentIcon from "../errors/ErrorComponentIcon";
import Spinner from "../icons/states/IconSpiner";
import {
  capitalizeFirstLetter,
  textTransformPascal,
} from "src/lib/handlers/handlersStyles";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import IconDiscord from "src/components/icons/social/IconDiscord";
import IconFb from "src/components/icons/social/IconFb";
import IconInst from "src/components/icons/social/IconInst";
import IconX from "src/components/icons/social/IconX";
export default function LinkSocialIcon({
  href,
  target,
  rel,
  iconCase,
  innerTextL,
}: LinkSocialIconProps): JSX.Element {
  const aRef = useRef<HTMLAnchorElement>(null),
    [view, setView] = useState<"loading" | "icon">("loading");
  useEffect(() => {
    setView("loading");
    aRef.current && syncAriaStates(aRef.current);
    const raf = requestAnimationFrame(() => setView("icon"));
    return () => cancelAnimationFrame(raf);
  }, [iconCase]);
  const iconElement = useMemo(() => {
    switch (iconCase) {
      case "discord":
        return <IconDiscord />;
      case "facebook":
        return <IconFb />;
      case "instagram":
        return <IconInst />;
      case "twitter":
        return <IconX />;
      default:
        return <ErrorComponentIcon fill={true} />;
    }
  }, [iconCase]);
  return (
    <ErrorBoundary
      FallbackComponent={() => <ErrorComponentIcon fill={false} />}
    >
      <a
        ref={aRef}
        id={`anchor${capitalizeFirstLetter(innerTextL)}`}
        className="highlight"
        href={href}
        target={target}
        rel={rel}
        title={href}
      >
        {view === "loading" ? (
          <Spinner
            spinnerClass="spinner-grow"
            spinnerColor="text-light"
            message={`Loading icon for ${textTransformPascal(iconCase)}`}
          />
        ) : (
          iconElement
        )}
      </a>
    </ErrorBoundary>
  );
}
