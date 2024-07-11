import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ClassDescription from "src/components/classes/ClassDescription";
import ClassSubclassesList from "src/components/classes/ClassSubclassesList";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Priest() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel
        className="Priest"
        imgDir={[
          "/img/classes/sorcerer/Priest/dall-e-priest-38.jpeg",
          "/img/classes/sorcerer/Priest/dall-e-priest-9.jpeg",
        ]}
        captions={[
          <ClassDescription
            className="Priest"
            is="are sorcerers heavily connected to"
            focus="spiritual, sacred and supportive magic,"
            complement="frequently represented by religious leaders and political representants."
          />,
          <ClassSubclassesList
            num="two"
            subclasses={["Cleric", "Shaman"]}
            mainclass="Sorcerer__Priest"
          />,
        ]}
      />{" "}
    </ErrorBoundary>
  );
}
