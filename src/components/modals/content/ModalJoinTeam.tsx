import { useRef, useEffect } from "react";
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
import { fillSection } from "src/lib/handlers/handlersFormatFill";

export default function ModalJoinTeam({
  dispatch,
  state,
}: DialogReducedProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  //mounting and unmounting
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          dlgRef.current,
          `validation of Dialog Reference`,
          ["HTMLDialogElement"]
        );
      state.isOpen && dlgRef.current.showModal();
      initFillAttrs(`ModalTeam`, dlgRef.current);
      initCloseableDlg(dlgRef.current, state, dispatch, "TOGGLE");
      fillSection(dlgRef.current, `ModalJoinTeam`);
    } catch (e) {
      markWithCommentary(dlgRef.current);
      console.error(
        `Error executing useEffect for Dialog Reference in Modal for Team:\n${
          (e as Error).message
        }`
      );
    }
  }, [dlgRef]);
  //routing
  useEffect(() => {
    !location.href.endsWith("?team") && history.pushState({}, ``, `?team`);
    return () => {
      location.href.endsWith("?team") && history.pushState({}, ``, "/");
    };
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Modal Window for Team!" />
      )}
    >
      {state.isOpen && (
        <dialog className="modal modal-content modal-link" ref={dlgRef}>
          <section>
            <h3 style={{ paddingLeft: "40%" }}>Join our team!</h3>
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
                  console.log("!Team: State -> " + state.isOpen);
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
          <hr />
          <section>
            <ul>
              <li>
                <p style={{ textTransform: "unset" }}>
                  <span>
                    We are glad you are considering joining our team!{" "}
                  </span>
                  <hr />
                  <span>
                    Our development is in continuous process of learning,{" "}
                  </span>
                  <span>
                    and new contributors with objectives aligning with ours are
                    a great addition.
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span>For applying to our selection procces, please </span>
                  <strong>click on the following link</strong>
                  <span>and fill the form:</span>
                </p>
                <br />
                <button
                  className="btn-info"
                  title="Click here for getting to the form for application"
                >
                  <span>Form for joining</span>
                  <a href="#" target="_self" id="anchorJoinForm"></a>
                </button>
              </li>
              <hr />
            </ul>
          </section>
        </dialog>
      )}
    </ErrorBoundary>
  );
}
