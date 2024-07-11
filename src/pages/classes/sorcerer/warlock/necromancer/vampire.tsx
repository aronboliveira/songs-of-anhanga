import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Vampire() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Vampire"
        imgDir={[
          "/img/classes/sorcerer/warlock/Necromancer/Vampire/dall-e-vampire-18.jpeg",
          "/img/classes/sorcerer/warlock/Necromancer/Vampire/dall-e-vampire-12.jpeg",
          "/img/classes/sorcerer/warlock/Necromancer/Vampire/dall-e-vampire-gnome-5.jpeg",
          "/img/classes/sorcerer/warlock/Necromancer/Vampire/dall-e-vampire-elf-2.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Vampire"
            is="are warlocks that specialize their unholy magic into"
            focus="draining the life force out of their preys"
            complement="to their own nurishment, studies or perverse purposes."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
