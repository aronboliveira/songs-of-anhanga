import { ClassDescriptionProps } from "src/lib/declarations/interfaces";
import { textTransformPascal } from "src/lib/handlers/handlersStyles";
export default function ClassDescription(props: ClassDescriptionProps) {
  const capitalizedClass = textTransformPascal(props.className);
  return (
    <p className="pClassDesc" id={`pClassDesc${capitalizedClass}`}>
      <strong
        className="classDescName"
        id={`classDescName${capitalizedClass}`}
      >{`${capitalizedClass}s`}</strong>
      <span className="classDescIs" id={`classDescIs${capitalizedClass}`}>
        &nbsp;{`${props.is}`}&nbsp;
      </span>
      <b
        className="classDescFocus"
        id={`classDescFocus${capitalizedClass}`}
      >{`${props.focus}`}</b>
      {props.have && (
        <span className="classDescHave" id={`classDescHave${capitalizedClass}`}>
          {props.have}
        </span>
      )}
      {props.ability && (
        <em>
          <b
            className="classDescAbility"
            id={`classDescAbility${capitalizedClass}`}
            style={{ fontWeight: "600" }}
          >
            &nbsp;{`${props.ability}`}&nbsp;
          </b>
        </em>
      )}
      {props.complement && (
        <span
          className="classDescComplement"
          id={`classDescComplement${capitalizedClass}`}
        >
          &nbsp;{`${props.complement}`}
        </span>
      )}
    </p>
  );
}
