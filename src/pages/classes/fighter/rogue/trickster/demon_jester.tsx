import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
import ClassDescription from "src/components/classes/ClassDescription";

export default function DemonJester() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Demon Jester"
        imgDir={[
          "/img/classes/rogue/trickster/jester/dall-e-jester-2.jpeg",
          "/img/classes/rogue/trickster/jester/dall-e-jester-17.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Demon Jester"
            is="are sadistic beings who dedicate their skills to"
            focus="play with the mind, torture and make fun"
            complement="of enemies using obscure and elusive magic and tactics."
          />,
        ]}
      />
    </ErrorBoundary>
  );
}
