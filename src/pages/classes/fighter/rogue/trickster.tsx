import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Trickster() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Trickster"
        imgDir={[
          "/img/classes/rogue/trickster/dall-e-trickster-17.jpeg",
          "/img/classes/rogue/trickster/dall-e-trickster-13.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Trickster"
            is="are mischievous and skittish tacticians able to play with their prey using"
            focus="ingenious traps, illusions and taunts"
            complement="for their violent and playful strategies."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Chaos Gangster", "Demon Jester"]}
            mainclass="Fighter__Rogue__Trickster"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
