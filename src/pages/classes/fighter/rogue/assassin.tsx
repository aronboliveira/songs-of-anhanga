import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Assassin() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Assassin"
        imgDir={[
          "/img/classes/rogue/assassin/dall-e-rogue-demon-female-1.jpeg",
          "/img/classes/rogue/assassin/dall-e-rogue-human-male-2.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Assassin"
            is="are furtive and proeficient killers able to spot vulnerable targets with no match"
            focus="using heavy stealthy tactics, deadly poisons and precise attacks"
            complement="for retrieving information, seeking target enemies and invading risky areas."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Holy Agent", "Ninja", "Lightning Striker"]}
            mainclass="Fighter__Rogue__Assassin"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
