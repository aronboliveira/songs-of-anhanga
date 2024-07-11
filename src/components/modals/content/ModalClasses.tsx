import { useEffect, useRef } from "react";
import {
  addModalClickSwitch,
  addModalSwitchListening,
} from "../../../lib/controller";
import { nullishDlg } from "src/lib/declarations/types";
import { CharsModalProps } from "src/lib/declarations/interfaces";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { formatForSelectors } from "src/lib/handlers/handlersFormatFill";
import ClassIconFigure from "src/components/classes/ClassIconFigure";

export default function ClassesModal({
  routerState,
  dispatch,
  state = true,
  // nFigs = 3,
  id = "classes",
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
      id={`classesDlg`}
      className="modal modal-content charsDlg"
      ref={dlgRef}
      onClick={c => {
        addModalClickSwitch(
          c.currentTarget,
          c,
          dispatch,
          state,
          `Classes Modal`
        );
      }}
    >
      <nav id="navClassIcons">
        <ClassIconFigure
          idf="artist"
          imgSrc="/img/icons/artist/dall-e-artist-2.jpeg"
          caption={[]}
        />
        <ClassIconFigure
          idf="druid"
          imgSrc="/img/icons/druid/dall-e-icon-druid-10.jpeg"
          caption={[]}
        />
        <ClassIconFigure
          idf="fighter"
          imgSrc="/img/icons/fighter/dall-e-icon-fighter-6.jpeg"
          caption={[]}
        />
        <ClassIconFigure
          idf="shooter"
          imgSrc="/img/icons/marksman/dall-e-marksman-2.jpeg"
          caption={[]}
        />
        <ClassIconFigure
          idf="sorcerer"
          imgSrc="/img/icons/sorcerer/dall-e-sorcerer-5.jpeg"
          caption={[]}
        />
        <ClassIconFigure
          idf="tinker"
          imgSrc="/img/icons/tinker/dall-e-tinker-1.jpeg"
          caption={[]}
        />
      </nav>
    </dialog>
  );
}
