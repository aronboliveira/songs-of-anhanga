import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Warlock() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Warlock"
        imgDir={[
          "/img/classes/sorcerer/warlock/dall-e-warlock-20.jpeg",
          "/img/classes/sorcerer/warlock/dall-e-warlock-3.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Warlock"
            is="are eerie sorcerers devoted to obscure magic to manipulate"
            focus="demonic, necrotic, shadow and violent fire magic"
            complement="being ambiguous and threatening figures that often lead cults and dangerous studies."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Cabalist", "Demonologist", "Necromancer"]}
            mainclass="Sorcerer__Warlock"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
