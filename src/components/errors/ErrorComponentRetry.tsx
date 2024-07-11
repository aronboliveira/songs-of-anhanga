import { Root, createRoot } from "react-dom/client";
import { RetryErrorComponentProps } from "src/lib/declarations/interfaces";
import { elementNotFound } from "../../lib/handlers/handlersErrors";
import { useEffect } from "react";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";

export default function RetryErrorComponent({
  message = "Erro indefinido",
  altRoot,
  altJsx,
}: RetryErrorComponentProps): JSX.Element {
  altRoot ??= document.querySelector("main");
  useEffect(() => {
    //setTimeout invoca um Node.timer para executar uma rotina (callback, primeiro argumento) com um delay definido em microssegundos (segundo argumento)
    setTimeout(() => {
      try {
        if (altRoot instanceof Element) {
          let altRooted: Root | undefined;
          if (!("_internalRoot" in altRoot)) createRoot(altRoot);
          if (altJsx instanceof Object && "props" in altJsx) {
            (altRooted as Root).render(altJsx);
          } else
            throw elementNotFound(altJsx, "validating altJsx", ["JSX.Element"]);
          setTimeout(() => {
            altRooted = undefined;
          }, 2000);
        } else
          throw elementNotFound(altRoot, "validating altRoot", ["Element"]);
      } catch (err) {
        setTimeout(() => {
          document.getElementById("productsRoot")!.innerHTML = `
          <div>The webpage couldn't recover! 😭 
            <p><strong>Reloading in 5 seconds</strong>.</p>
          </div>
        `;
        }, 3000);
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    }, 3000);
    syncAriaStates();
  }, []);
  return (
    <div className="errorCont retryError">
      <h2>Oops...! Seems like something has gone wrong 🤖📑 😱</h2>
      <p className="errMessage">{`${message}`}</p>
      <p>
        Try <strong>reloading</strong> the page, or wait a few seconds!
      </p>
    </div>
  );
}
