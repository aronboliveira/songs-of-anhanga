import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Wizard() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Wizard"
        imgDir={[
          "/img/classes/sorcerer/wizard/dall-e-drow-elementalist.jpeg",
          "/img/classes/sorcerer/dall-e-cronomancer-5.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Wizard"
            is="are academic sorcerers that embraced deep studies and domain over"
            focus="natural elements through arcane flow,"
            complement="being masters of the mind and wisdom."
          />,
          <ClassSubclassesList
            num="four"
            subclasses={[
              "Cronomancer",
              "Geomancer",
              "Hydromancer",
              "Lightcrafter",
            ]}
            mainclass="Sorcerer__Wizard"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
