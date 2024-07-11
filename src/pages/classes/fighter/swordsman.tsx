import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Swordsman() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Swordsman"
        imgDir={[
          "/img/classes/warrior/dall-e-warrior-human-female-10.jpeg",
          "/img/classes/warrior/dall-e-paladin-draeneilike-1.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Swordsman"
            is="are brute warriors that mastered the use of"
            focus="heavy weapons (such as maces, swords, axes and spears)"
            complement="for direct, violent combat."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Barbarian", "Knight"]}
            mainclass="Fighter__Swordsman"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
