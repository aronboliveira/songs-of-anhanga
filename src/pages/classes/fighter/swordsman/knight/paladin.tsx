import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import ClassPanel from "src/components/main/bodies/ClassPanel";
export default function Paladin() {
  useEffect(() => {}, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading page" />
      )}
    >
      {" "}
      <ClassPanel className="Paladin" imgDir={[""]} />{" "}
    </ErrorBoundary>
  );
}
