import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Demonologist() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Demonologist"
        imgDir={[
          "/img/classes/sorcerer/warlock/Demonologist/dall-e-demonologist-8.jpeg",
          "/img/classes/sorcerer/warlock/Demonologist/dall-e-demon-warlock.jpeg",
          "/img/classes/sorcerer/warlock/Demonologist/dall-e-firebender-1.jpeg",
          "/img/classes/sorcerer/warlock/Demonologist/dall-e-demonologist-13.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Demonologist"
            is="are warlocks that have control over"
            focus="demonic and chaotic forces"
            complement="as their main resources, whether they choose to enslave those forces or serve to them."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
