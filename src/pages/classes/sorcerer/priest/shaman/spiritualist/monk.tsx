import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Monk() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Monk"
        imgDir={[
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/monk/dall-e-monk-9.jpeg",
          "/img/classes/sorcerer/Priest/shaman/Spiritualist/monk/dall-e-monk-42.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Monk"
            is="are spiritual priests that center their faith in the"
            focus="inner focus of the mind and soul,"
            complement="believing that harmony and balance are the true nature and end of all things."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
