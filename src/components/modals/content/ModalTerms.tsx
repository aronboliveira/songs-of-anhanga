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
import { initCloseableDlg, roots } from "src/lib/controller";

export default function ModalTerms({
  dispatch,
  state,
}: DialogReducedProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  //mounting
  useEffect(() => {
    try {
      if (!(dlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          dlgRef.current,
          `validation of Dialog Reference`,
          ["HTMLDialogElement"]
        );
      state.isOpen && dlgRef.current.showModal();
      initFillAttrs(`ModalTerms`, dlgRef.current);
      initCloseableDlg(dlgRef.current, state, dispatch, "TOGGLE");
    } catch (e) {
      markWithCommentary(dlgRef.current);
      console.error(
        `Error executing useEffect for Dialog Reference in Modal for Terms:\n${
          (e as Error).message
        }`
      );
    }
  }, []);
  //unmounting
  useEffect(() => {
    return () => {
      try {
        if (roots["modalRoot"]) {
          roots["modalRoot"].unmount();
          delete roots["modalRoot"];
        } else console.warn(`No reference found for modalRoot`);
      } catch (e) {
        console.error(
          `Error executing unmounting for modalRoot:\n${(e as Error).message}`
        );
      }
    };
  }, []);
  //routing
  useEffect(() => {
    !location.href.endsWith("?terms") && history.pushState({}, ``, `?terms`);
    return () => {
      location.href.endsWith("?terms") && history.pushState({}, ``, "/");
    };
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error loading Modal Window for Authors!" />
      )}
    >
      (
      <dialog
        className="modal modal-content modal-link"
        ref={dlgRef}
        style={{ color: "#000" }}
        id={`modalTerms`}
      >
        <section>
          <h3>MODAL DE TERMOS</h3>
          <button
            className="btn-close"
            onClick={ev => {
              try {
                !state.isOpen && dlgRef.current?.close();
                dispatch({ type: "TOGGLE" });
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
        <section>
          <ul>
            <li>
              <p>
                <em>All</em>
                <span> of our images, by default, were generated using </span>
                <strong>Generative AI</strong>
                <span> technologies</span>, namely:
                <ol>
                  <li>
                    <strong>Dall-E®</strong>
                    <span>, by OpenAI©;</span>
                  </li>
                </ol>
              </p>
              <p>
                <span>Therefore, we </span>
                <em>do not </em>
                <span>
                  claim copyright over the images themselves, only the{" "}
                </span>
                <strong>prompts</strong>
                <span> used to generate those.</span>
              </p>
              <p>
                <span>Many of the images, though, were </span>
                <em>modified</em>
                <span>
                  {" "}
                  by the use of image editing software by professionals in our
                  team, namely:
                </span>
                <ol>
                  <li>
                    <strong>Photoshop®</strong>
                    <span>, by Adobe©;</span>
                  </li>
                  <li>
                    <strong>Ilustrator®</strong>
                    <span>, by Adobe©;</span>
                  </li>
                </ol>
              </p>
              <p>
                <span>
                  The list of modified images can be checked in our GitHub
                  Readme, following the link:{" "}
                </span>
                <a href="https://github.com" rel="external" target="_blank">
                  GITHUB
                </a>
              </p>
            </li>
          </ul>
        </section>
      </dialog>
      )
    </ErrorBoundary>
  );
}
