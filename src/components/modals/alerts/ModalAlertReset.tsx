import { useEffect, useRef } from "react";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import { ResetDlgProps } from "src/lib/declarations/interfaces";
import { nullishDlg } from "src/lib/declarations/types";
import { styleClass } from "src/lib/handlers/handlersStyles";
import { initCloseableDlg } from "src/lib/controller";

export default function ModalAlertReset({
  dispatch,
  state,
  relForm,
}: ResetDlgProps): JSX.Element {
  const mainDlgRef = useRef<nullishDlg>(null);
  useEffect(() => {
    try {
      if (!(mainDlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          mainDlgRef.current,
          `instance validation of Main Dialog Reference for ${ModalAlertReset.prototype.constructor.name}`,
          ["HTMLDialogElement"]
        );
      state && mainDlgRef.current.showModal();
      initFillAttrs(`ModalAlertReset`, mainDlgRef.current);
      styleClass(mainDlgRef.current, "section", "fullCenteredFlex");
      initCloseableDlg(mainDlgRef.current, state, dispatch);
    } catch (e) {
      console.error(
        `Error executing useEffect com ModalAlertReset:\n${
          (e as Error).message
        }`
      );
    }
  }, [mainDlgRef]);
  return (
    <dialog
      ref={mainDlgRef}
      className="modal modal-content modal-content-fit modal-alert"
      id="modalAlertNewUserReset"
    >
      <section>
        <hgroup className="flexWC flexAlItCt flexJC">
          <h2>
            <strong>Are you sure you want to reset?</strong>
          </h2>
          <h4>
            <em>This process is irreversible!</em>
          </h4>
        </hgroup>
        <button
          className="btn-close"
          onClick={() => {
            try {
              if (!(mainDlgRef.current instanceof HTMLElement))
                throw htmlElementNotFound(
                  mainDlgRef.current,
                  `instance validation of Main Dialog Reference for ${ModalAlertReset.prototype.constructor.name}`,
                  ["HTMLDialogElement"]
                );
              dispatch(!state);
              !state && mainDlgRef.current.close();
            } catch (e) {
              console.error(
                `Error executing callback for Closing Button in ${
                  ModalAlertReset.prototype.constructor.name
                }:${(e as Error).message}`
              );
            }
          }}
        ></button>
      </section>
      <section>
        <button
          className="btn-warning"
          onClick={ev => {
            try {
              if (!(relForm instanceof HTMLFormElement))
                throw htmlElementNotFound(
                  relForm,
                  `validation of relForm in ${ModalAlertReset.prototype.constructor.name}`,
                  ["HTMLFormElement"]
                );
              relForm.reset();
              dispatch(!state);
            } catch (e) {
              console.error(
                `Error executing callback associated with ${ev.type}, element ${
                  ev.currentTarget.id || ev.currentTarget.tagName
                }:\n${(e as Error).message}`
              );
            }
          }}
        >
          <strong>Confirm</strong>
        </button>
      </section>
    </dialog>
  );
}
