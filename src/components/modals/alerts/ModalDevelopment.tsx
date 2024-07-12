import { useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import {
  htmlElementNotFound,
  markWithCommentary,
} from "src/lib/handlers/handlersErrors";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import {
  DialogProps,
  DialogReducedProps,
} from "src/lib/declarations/interfaces";
import { nullishDlg } from "src/lib/declarations/types";
import { initCloseableDlg } from "src/lib/controller";

export default function ModalDevelopment({
  dispatch,
  state = true,
}: DialogProps | DialogReducedProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  if (state instanceof Object) state = state.isOpen;
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          dlgRef.current,
          `validation of Dialog Reference`,
          ["HTMLDialogElement"]
        );
      state && dlgRef.current.showModal();
      initFillAttrs(`ModalAlertAuthors`, dlgRef.current);
      initCloseableDlg(dlgRef.current, state, dispatch, "TOGGLE");
    } catch (e) {
      markWithCommentary(dlgRef.current);
      console.error(
        `Error executing useEffect for Dialog Reference in Modal for Error:\n${
          (e as Error).message
        }`
      );
    }
  }, [dlgRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Modal Window for Error!" />
      )}
    >
      {state && (
        <dialog
          className="modal modal-content"
          ref={dlgRef}
          style={{ height: "45vh" }}
        >
          <section
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ color: "red" }}>WARNING!</h3>
            <button
              className="btn-close"
              onClick={ev => {
                try {
                  if (!(dlgRef.current instanceof HTMLDialogElement))
                    throw htmlElementNotFound(
                      dlgRef.current,
                      `validation of Dialog Reference in callback for ${ev.type}`,
                      ["HTMLDialogElement"]
                    );
                  dlgRef.current.close();
                  if (typeof state === "object") dispatch({ type: "TOGGLE" });
                  else if (typeof state === "boolean") dispatch(!state);
                  else
                    console.warn(
                      `Erro verifying state in ${
                        ModalDevelopment.prototype.constructor.name
                      } with callback for ${ev.type} in ${
                        ev.currentTarget.id || ev.currentTarget.tagName
                      }`
                    );
                } catch (e) {
                  console.error(
                    `Error executing callback for ${ev.type} in ${
                      ev.currentTarget.id || ev.currentTarget.tagName
                    }:${(e as Error).message}`
                  );
                }
              }}
            ></button>
          </section>
          <div style={{ width: "80%", fontWeight: "600" }}>
            <p>
              This website is under early development, so most features and
              layouts <em>will</em> be broken.
            </p>
            <p>
              The intent of the current state is mostly for tracking progress
              and testing deployment
            </p>
            <p>
              Feel free to check our commitment and coding pattern in the
              repository bellow:
            </p>
            <a
              target="_blank"
              href="https://github.com/aronboliveira/songs-of-anhanga"
            >
              https://github.com/aronboliveira/songs-of-anhanga
            </a>
          </div>
        </dialog>
      )}
    </ErrorBoundary>
  );
}
