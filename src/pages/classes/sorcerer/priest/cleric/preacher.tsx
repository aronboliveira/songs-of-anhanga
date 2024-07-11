import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Preacher() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Preacher"
        imgDir={[
          "/img/classes/sorcerer/Priest/cleric/preacher/dall-e-preacher-2.jpeg",
          "/img/classes/sorcerer/Priest/cleric/preacher/dall-e-priest-draeneilike-4.jpeg",
          "/img/classes/sorcerer/Priest/cleric/preacher/dall-e-priest-elf-2.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Preacher"
            is="are severe clerics that dedicate their life efforts to"
            focus="spreading their beliefs and doctrines,"
            complement="strengthening the will of their similars and followers, and punishing oppositors."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
