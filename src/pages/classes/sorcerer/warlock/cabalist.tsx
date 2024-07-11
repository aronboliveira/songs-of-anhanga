import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Cabalist() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Cabalist"
        imgDir={[
          "/img/classes/sorcerer/warlock/Cabalist/dall-e-cabalist-10.jpeg",
          "/img/classes/sorcerer/warlock/Cabalist/dall-e-cabalist-2.jpeg",
          "/img/classes/sorcerer/warlock/Cabalist/dall-e-shadow-priest.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Cabalist"
            is="are nihilist warlocks that believe in the doom of life as the major force of nature, using"
            focus="shadow and void magic"
            complement="for agonizing enemies and bending their minds."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
