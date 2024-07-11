import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Rogue() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Rogue"
        imgDir={[
          "/img/classes/rogue/dall-e-rogue-7.jpeg",
          "/img/classes/rogue/dall-e-jester-6.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Rogue"
            is="are agile and oportunistic fighters who focus on the use of"
            focus="light weapons (such as daggers, katars, and sabers), stealth and critical strikes"
            complement="for facing their targets in combat, and picking their adventures as they will."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Assassin", "Trickster"]}
            mainclass="Fighter__Rogue"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
