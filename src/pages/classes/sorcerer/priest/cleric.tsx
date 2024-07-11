import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Cleric() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Cleric"
        imgDir={[
          "/img/classes/sorcerer/Priest/cleric/dall-e-physician-1.jpeg",
          "/img/classes/sorcerer/Priest/cleric/dall-e-physician-29.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Cleric"
            is="are individuals devoted to"
            focus="holy and light magic"
            complement="for supporting and healing their groups, cared ones and followers."
          />,
          <ClassSubclassesList
            num="two"
            mainclass="Sorcerer__Priest__Cleric"
            subclasses={["Physician", "Preacher"]}
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
