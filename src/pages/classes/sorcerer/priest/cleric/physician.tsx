import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Physician() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Physician"
        imgDir={[
          "/img/classes/sorcerer/Priest/cleric/physician/dall-e-physician-24.jpeg",
          "/img/classes/sorcerer/Priest/cleric/physician/dall-e-physician-19.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Physician"
            is="are priests solely dedicated to"
            focus="healing and mending the weaknesses"
            complement="of their allies, through their believes in light magic and religion."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
