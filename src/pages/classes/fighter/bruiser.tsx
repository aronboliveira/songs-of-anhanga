import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Bruiser() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Bruiser"
        imgDir={[
          "/img/classes/fighter/bruiser/dall-e-bruiser-13.jpeg",
          "/img/classes/fighter/bruiser/dall-e-bruiser-2.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Bruiser"
            is="are fighters that rely on"
            focus="martial arts and pure physical training"
            complement="for their adventures and fighting."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
