import { useEffect, useRef } from "react";
import {
  addModalClickSwitch,
  addModalSwitchListening,
} from "../../../lib/controller";
import { nullishDlg } from "src/lib/declarations/types";
import { CharsModalProps } from "src/lib/declarations/interfaces";
import GridChars from "../../char/CharsGrid";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { formatForSelectors } from "src/lib/handlers/handlersFormatFill";

export default function CharsModal({
  routerState,
  dispatch,
  state = true,
  nFigs = 3,
  id = "chars",
}: CharsModalProps): JSX.Element {
  const dlgRef = useRef<nullishDlg>(null);
  //adjustments
  useEffect(() => {
    formatForSelectors(dlgRef.current);
    syncAriaStates(dlgRef.current);
    addModalSwitchListening(dlgRef.current, dispatch, state, `${id} Modal`);
  }, [dlgRef]);
  //routing
  useEffect(() => {
    if (document.getElementById(`${id}Dlg`) && routerState)
      history.pushState({}, ``, `?${id}`);
  }, []);
  //routing
  useEffect(() => {
    return () => {
      setTimeout(() => {
        routerState &&
          (location.href.endsWith(`?${id}`) ||
            (routerState as any).asPath === `?${id}`) &&
          history.pushState({}, ``, "/");
      }, 300);
    };
  }, []);
  return (
    <dialog
      id={`${id}Dlg`}
      className="modal modal-content charsDlg"
      ref={dlgRef}
      onClick={c => {
        addModalClickSwitch(c.currentTarget, c, dispatch, state, `Chars Modal`);
      }}
    >
      <GridChars id={id} nFigs={nFigs} tab={id} router={routerState} />
    </dialog>
  );
}
