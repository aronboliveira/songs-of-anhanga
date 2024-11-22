import { useEffect } from "react";
import { syncAriaStates } from "../../lib/handlers/handlersCommon";
import { GenericErrorProps } from "../../lib/declarations/interfaces";
export default function GenericErrorComponent({
  message = "Erro indefinido",
}: GenericErrorProps): JSX.Element {
  useEffect(() => {
    syncAriaStates();
  }, []);
  return (
    <div className="errorCont genericError">
      <h2>Oops...! Seems like something has gone wrong 🤖📑 😨</h2>
      <p className="errMessage">{`${message}`}</p>
      <p>
        <strong>Try reloading the page!</strong>
      </p>
    </div>
  );
}
