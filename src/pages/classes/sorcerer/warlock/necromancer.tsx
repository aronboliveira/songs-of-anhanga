import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Necromancer() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Necromancer"
        imgDir={[
          "/img/classes/sorcerer/warlock/Necromancer/dall-e-necromancer-25.jpeg",
          "/img/classes/sorcerer/warlock/Necromancer/dall-e-necromancer-8.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Necromancer"
            is="are mischievous sorcerers that devoted their studies to the control over"
            focus="necrotic and blood magic,"
            complement="twisting and draining the life force out of other living beings for their deeds."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Lich", "Vampire"]}
            mainclass="Sorcerer__Warlock__Necromancer"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
