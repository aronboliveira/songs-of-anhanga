import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";

export default function Annihilator() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Annihilator"
        imgDir={[
          "/img/classes/warrior/barbarian/Annihilator/dall-e-annihilator-1.jpeg",
          "/img/classes/warrior/barbarian/Annihilator/dall-e-annihilator-13.jpeg",
          "/img/classes/warrior/barbarian/Annihilator/dall-e-annihilator-4.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Annihilator"
            is="are excessively strong warriors that thrive in the "
            focus="the dominance of destructive, obsucre force "
            complement="bloodlust of battle, spreading their dominance recklessly."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
