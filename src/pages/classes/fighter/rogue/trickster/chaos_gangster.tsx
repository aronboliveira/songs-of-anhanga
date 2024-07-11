import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function ChaosGangster() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Chaos Gangster"
        imgDir={[
          "/img/classes/rogue/trickster/chaos-gangster/dall-e-c-gangster-40.jpeg",
          "/img/classes/rogue/trickster/chaos-gangster/dall-e-c-gangster-25.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Chaos Gangster"
            is="are terroristic vandals who use"
            focus="explosive, chaotic and fire resources"
            complement="for wreaking havoc on their foes."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
