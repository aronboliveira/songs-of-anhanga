import { useEffect, useRef } from "react";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import { RoutedDialogProps } from "src/lib/declarations/interfaces";
import { nullishDlg } from "src/lib/declarations/types";
import { styleClass } from "src/lib/handlers/handlersStyles";
import { initCloseableDlg } from "src/lib/controller";
import { useRouter } from "next/router";

export default function ModalAlertReturn({
  dispatch,
  router,
  state,
}: RoutedDialogProps): JSX.Element {
  router ??= useRouter();
  const mainDlgRef = useRef<nullishDlg>(null);
  useEffect(() => {
    try {
      if (!(mainDlgRef.current instanceof HTMLDialogElement))
        throw htmlElementNotFound(
          mainDlgRef.current,
          `instance validation of Main Dialog Reference for ${ModalAlertReturn.prototype.constructor.name}`,
          ["HTMLDialogElement"]
        );
      state && mainDlgRef.current.showModal();
      initFillAttrs(`ModalAlertReturn`, mainDlgRef.current);
      styleClass(mainDlgRef.current, "section", "fullCenteredFlex");
      initCloseableDlg(mainDlgRef.current, state, dispatch);
    } catch (e) {
      console.error(
        `Error executing useEffect com ModalAlertReturn:\n${
          (e as Error).message
        }`
      );
    }
  }, [mainDlgRef]);
  return (
    <dialog
      ref={mainDlgRef}
      className="modal modal-content modal-content-fit modal-alert"
      id="modalAlertNewUserToMainPage"
    >
      <section>
        <hgroup className="flexWC flexAlItCt flexJC">
          <h2>
            <strong>Are you sure you want to return?</strong>
          </h2>
          <h4>
            <em>There are elements that still need to be filled!</em>
          </h4>
        </hgroup>
        <button
          className="btn-close"
          onClick={() => {
            try {
              if (!(mainDlgRef.current instanceof HTMLElement))
                throw htmlElementNotFound(
                  mainDlgRef.current,
                  `instance validation of Main Dialog Reference for ${ModalAlertReturn.prototype.constructor.name}`,
                  ["HTMLDialogElement"]
                );
              dispatch(!state);
              !state && mainDlgRef.current.close();
            } catch (e) {
              console.error(
                `Error executing callback for Closing Button in ${
                  ModalAlertReturn.prototype.constructor.name
                }:${(e as Error).message}`
              );
            }
          }}
        ></button>
      </section>
      <section>
        <button
          className="btn-warning"
          onClick={() => {
            console.log(router);
            router?.push("/");
          }}
        >
          <strong>Confirm</strong>
        </button>
      </section>
    </dialog>
  );
}
