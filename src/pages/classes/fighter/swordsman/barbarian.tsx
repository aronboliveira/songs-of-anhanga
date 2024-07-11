import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Barbarian() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Barbarian"
        imgDir={[
          "/img/classes/warrior/dall-e-warrior-demon-1.jpeg",
          "/img/classes/warrior/dall-e-gnome-warrior-2.jpeg",
          "/img/classes/warrior/dall-e-generic-orc-warrior.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Barbarian"
            is="are fierce and burly warriors that relish on intense battles for their living, focusing on"
            focus="fast, charged attacks with tremendous destruction power,"
            complement="making them incredibly threatening in open field."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Annihilator", "Berserker", "Savage Protector"]}
            mainclass="Fighter__Swordsman__Barbarian"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
