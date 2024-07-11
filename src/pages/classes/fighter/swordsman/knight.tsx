import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Knight() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Knight"
        imgDir={[
          "/img/classes/warrior/dall-e-generic-elf-warrior.jpeg",
          "/img/classes/warrior/dall-e-warrior-orc-green-2.jpeg",
          "/img/classes/warrior/dall-e-warrior-elf-male-1.jpeg",
          "/img/classes/warrior/dall-e-warrior-nelf.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Knight"
            is="are determined, convicted fighters who rely on"
            focus="leading militar tactics, leadership and codes of honor"
            complement="for combat and achieving their great goals."
          />,
          <ClassSubclassesList
            num="five"
            subclasses={[
              "Death Knight",
              "Grove Knight",
              "Paladin",
              "Shadow Knight",
              "Storm Knight",
            ]}
            mainclass="Fighter__Swordsman__Knight"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
