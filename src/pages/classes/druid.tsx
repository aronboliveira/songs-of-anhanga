import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Druid() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Druid"
        imgDir={[
          "/img/classes/druids/dall-e-druid-hawk-3.jpeg",
          "/img/classes/druids/dall-e-mannedwolf-1.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Druid"
            is="are beings devoted to the primal forces of the"
            focus="living nature"
            have=", having a deep, spiritual connection to the beings they bond with. Their connections can grow so strong they can"
            ability="shapeshift"
            complement="into hybrids or completely mutate into the beings they form their connections."
          />,
          <ClassSubclassesList
            num="three"
            subclasses={["Aerial", "Aquatic", "Terrestrial"]}
            mainclass="Druid"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
