import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Marksman() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Marksman"
        imgDir={[
          "/img/classes/shotter/dall-e-jinxlike-2.jpeg",
          "/img/classes/shotter/dall-e-nelfinspired-amazonic-archer.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Marksman"
            is="are dexterous individuals that focus their abilities on the use of"
            focus="ranged weapons "
            complement="and a variety of strategic tactics from long distance."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Archer", "Gunslinger"]}
            mainclass="Marksman"
          />,
        ]}
      />
    </ErrorBoundary>
  );
}
