import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Shaman() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Shaman"
        imgDir={[
          "/img/classes/sorcerer/Priest/shaman/dall-e-elementalist-53.jpeg",
          "/img/classes/sorcerer/Priest/shaman/dall-e-elementalist-22.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Shaman"
            is="are priests devoted to"
            focus="spiritual growth and natural connection,"
            complement="serving as ritualistic leaders and spiritual bridges between the elemental nature, ancestral spirits, and the living beings."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Elementalist", "Spiritualist"]}
            mainclass="Sorcerer__Priest__Shaman"
          />,
        ]}
      />
    </ErrorBoundary>
  );
}
