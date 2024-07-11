import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Elementalist() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Elementalist"
        imgDir={[
          "/img/classes/sorcerer/Priest/shaman/elementalist/dall-e-elementalist-11.jpeg",
          "/img/classes/sorcerer/Priest/shaman/elementalist/dall-e-elementalist-29.jpeg",
          "/img/classes/sorcerer/Priest/shaman/elementalist/dall-e-elementalist-32.jpeg",
          "/img/classes/sorcerer/Priest/shaman/elementalist/dall-e-elementalist-65.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Elementalist"
            is="are shamans that devote their faith and magical powers to"
            focus="comunicate with the primitve elements of nature"
            complement="to summon elemental spirits and connect deeply with the surrounding elemental nature."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
