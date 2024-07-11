import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Spiritualist() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Spiritualist"
        imgDir={[
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/dall-e-spiritualist-12.jpeg",
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/dall-e-monk-30.jpeg",
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/dall-e-spiritualist-5.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Spiritualist"
            is="are shamans with great spiritual connection to the"
            focus="realm of spirits and ancestrality,"
            complement="being essential oracles for the nature of living beings."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Monk", "Primalist"]}
            mainclass="Sorcerer__Priest__Shaman__Spiritualist"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
