import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Sorcerer() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Sorcerer"
        imgDir={[
          "/img/classes/sorcerer/dall-e-cronomancer-4.jpeg",
          "/img/classes/sorcerer/dall-e-cronomancer-1.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Sorcerer"
            is="are individuals who focus their abilities on the
						manipulation of"
            focus="elemental magic,"
            complement="having great control over whetever forces of nature they choose to meddle with."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Priest", "Warlock", "Wizard"]}
            mainclass="Sorcerer"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
