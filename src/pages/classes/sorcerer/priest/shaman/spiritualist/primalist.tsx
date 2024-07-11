import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Primalist() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Primalist"
        imgDir={[
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/primalist/dall-e-primalist-8.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Primalist"
            is="are shamans with profound connection to"
            focus="wild and savage spirits,"
            complement="encarnating and representing the will of the animals."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
