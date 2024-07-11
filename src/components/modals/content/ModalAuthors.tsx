import {
  useRef,
  useEffect,
  // useState
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import {
  htmlElementNotFound,
  markWithCommentary,
} from "src/lib/handlers/handlersErrors";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import { DialogReducedProps } from "src/lib/declarations/interfaces";
import { nullishDlg } from "src/lib/declarations/types";
import { initCloseableDlg } from "src/lib/controller";
// import { useRouter } from "next/router";

export default function ModalAuthors({
  dispatch,
  state,
}: DialogReducedProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  //adjustments
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          dlgRef.current,
          `validation of Dialog Reference`,
          ["HTMLDialogElement"]
        );
      state.isOpen && dlgRef.current.showModal();
      initFillAttrs(`ModalAuthors`, dlgRef.current);
      initCloseableDlg(dlgRef.current, state, dispatch, "TOGGLE");
    } catch (e) {
      markWithCommentary(dlgRef.current);
      console.error(
        `Error executing useEffect for Dialog Reference in Modal for Authors:\n${
          (e as Error).message
        }`
      );
    }
  }, [dlgRef]);
  //routing
  useEffect(() => {
    !location.href.endsWith("?authors") &&
      history.pushState({}, ``, `?authors`);
    return () => {
      location.href.endsWith("?authors") && history.pushState({}, ``, "/");
    };
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Modal Window for Authors!" />
      )}
    >
      {state.isOpen && (
        <dialog className="modal modal-content" ref={dlgRef}>
          <section>
            <h3>MODAL DE AUTORES</h3>
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
                  dispatch({ type: "TOGGLE" });
                  console.log("!AUTHORS: State -> " + state.isOpen);
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
        </dialog>
      )}
    </ErrorBoundary>
  );
}
