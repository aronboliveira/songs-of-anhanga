import { ClassFigureProps } from "src/lib/declarations/interfaces";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";
import { textTransformPascal } from "src/lib/handlers/handlersStyles";
import Link from "next/link";

export default function ClassIconFigure(props: ClassFigureProps): JSX.Element {
  const captIdf = textTransformPascal(props.idf);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error loading Class Icon Figure`} />
      )}
    >
      <figure id={`classIconFig${captIdf}`} className="classIconFig">
        <Link
          href={`/classes/${props.idf}`}
          target="_blank"
          rel="noopener noreferrer"
          id={`classIconLink${captIdf}`}
        >
          <img
            id={`classIconImg${captIdf}`}
            src={props.imgSrc}
            alt={props.idf}
            loading="lazy"
            width={100}
            height={100}
            className="classIconImg"
          />
        </Link>
        <figcaption id={`classIconCapt${captIdf}`} className="classIconCapt">
          {props.caption ? props.caption : <span>TEXTO</span>}
        </figcaption>
      </figure>
    </ErrorBoundary>
  );
}
