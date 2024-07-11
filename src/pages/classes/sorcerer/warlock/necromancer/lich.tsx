import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Lich() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Lich"
        imgDir={[
          "/img/classes/sorcerer/warlock/Necromancer/Lich/dall-e-lich-10.jpeg",
          "/img/classes/sorcerer/warlock/Necromancer/Lich/dall-e-lich-23.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Lich"
            is="are necromancers that focus all their magic energy into"
            focus="corrupting life forces to control the undead,"
            complement="being extremely disruptive and eroding beings."
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
