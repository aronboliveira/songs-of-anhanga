import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Geomancer() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Geomancer"
        imgDir={[
          "/img/classes/sorcerer/wizard/geomancer/dall-e-geomancer-10.jpeg",
          "/img/classes/sorcerer/wizard/geomancer/dall-e-geomancer-28.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Geomancer"
            is="are wizards that specialize their arcane powers in the control of the"
            focus="earth, rocks and metals"
            complement="for fighting, studying and crafting."
          />,
        ]}
      />
    </ErrorBoundary>
  );
}
