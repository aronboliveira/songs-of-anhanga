import { capitalizeFirstLetter } from "src/lib/handlers/handlersStyles";
import { ErrorBoundary } from "react-error-boundary";
import {
  BoolState,
  LinkDlgProps,
  MainFooterToogleCaseActions,
  RouterSelectState,
} from "src/lib/declarations/interfaces";
import { Reducer, useReducer, useRef, useEffect } from "react";
import {
  NextRouterInstance,
  mainFooterCases,
  nullishAnchor,
} from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import GenericErrorComponent from "../errors/ErrorComponentGeneric";
import ModalAuthors from "../modals/content/ModalAuthors";
import ModalTerms from "../modals/content/ModalTerms";
import ModalContact from "../modals/content/ModalContact";
import ModalJoinTeam from "../modals/content/ModalJoinTeam";
import ModalCookies from "../modals/content/ModalCookies";
import ModalAlertError from "../modals/alerts/ModalAlertError";
import { roots } from "src/lib/controller";
import { useSelector } from "react-redux";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import clearRootDef from "src/lib/handlers/handlersDef";

export default function LinkDlg({
  innerTextL,
  href,
  target,
  rel,
  ComponentCase,
  color: _color,
}: LinkDlgProps) {
  const aRef = useRef<nullishAnchor>(null);
  const selectRouter = useSelector<RouterSelectState, NextRouterInstance>(
    state => state.router
  );
  //adjustments
  useEffect(() => {
    try {
      if (!(aRef.current instanceof HTMLAnchorElement))
        throw htmlElementNotFound(
          aRef.current,
          `validation of Anchor reference`,
          ["HTMLAnchorElement"]
        );
      if (_color) aRef.current.style.color = _color;
      initFillAttrs(`${capitalizeFirstLetter(innerTextL)}`, aRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for aRef in ${
          LinkDlg.prototype.constructor.name
        } for case ${ComponentCase}:${(e as Error).message}`
      );
    }
  }, [aRef]);
  //unmounting
  useEffect(() => {
    return () => {
      try {
        clearRootDef(roots, "modalRoot");
      } catch (e) {
        console.error(
          `Error executing unmounting for modalRoot:\n${(e as Error).message}`
        );
      }
    };
  }, []);
  //routing
  const reducer = (
    state: BoolState,
    action: MainFooterToogleCaseActions
  ): BoolState => {
    switch (action.type) {
      case "TOGGLE":
        return { ...state, isOpen: !state.isOpen };
      case "TOGGLE_AUTHORS":
        return ComponentCase === "authors"
          ? { ...state, isOpen: !state.isOpen }
          : { ...state, isOpen: state.isOpen };
      case "TOGGLE_CONTACT":
        return ComponentCase === "contact"
          ? { ...state, isOpen: !state.isOpen }
          : { ...state, isOpen: state.isOpen };
      case "TOGGLE_COOKIES":
        return ComponentCase === "cookies"
          ? { ...state, isOpen: !state.isOpen }
          : { ...state, isOpen: state.isOpen };
      case "TOGGLE_TEAM":
        return ComponentCase === "team"
          ? { ...state, isOpen: !state.isOpen }
          : { ...state, isOpen: state.isOpen };
      case "TOGGLE_TERMS":
        return ComponentCase === "terms"
          ? { ...state, isOpen: !state.isOpen }
          : { ...state, isOpen: state.isOpen };
      default:
        return { ...state, isOpen: state.isOpen };
    }
  };
  // Dispatch(A) -> Reducer<S, A> -> conditional statement(action.prop) -> S
  const [state, dispatch] = useReducer<
    Reducer<BoolState, MainFooterToogleCaseActions>
  >(reducer, { isOpen: false });
  useEffect(() => {
    try {
      if (!(aRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          aRef.current,
          `validation of Anchor Reference`
        );
      if (selectRouter && "asPath" in selectRouter) {
        if (
          selectRouter.asPath === "?authors" ||
          location.href.endsWith("?authors")
        )
          dispatch({ type: "TOGGLE_AUTHORS", payload: "" });
        else if (
          selectRouter.asPath === "?contact" ||
          location.href.endsWith("?contact")
        )
          dispatch({ type: "TOGGLE_CONTACT", payload: "" });
        else if (
          selectRouter.asPath === "?cookies" ||
          location.href.endsWith("?cookies")
        )
          dispatch({ type: "TOGGLE_COOKIES", payload: "" });
        else if (
          selectRouter.asPath === "?team" ||
          location.href.endsWith("?team")
        )
          dispatch({ type: "TOGGLE_TEAM", payload: "" });
        else if (
          selectRouter.asPath === "?terms" ||
          location.href.endsWith("?terms")
        )
          dispatch({ type: "TOGGLE_TERMS", payload: "" });
      } else console.warn(`No router found.`);
    } catch (e) {
      console.error(`Error:${(e as Error).message}`);
    }
  }, []);
  const readCase = (ComponentCase: mainFooterCases): JSX.Element => {
    switch (ComponentCase) {
      case "authors":
        return <ModalAuthors state={state} dispatch={dispatch} />;
      case "contact":
        return <ModalContact state={state} dispatch={dispatch} />;
      case "cookies":
        return <ModalCookies state={state} dispatch={dispatch} />;
      case "team":
        return <ModalJoinTeam state={state} dispatch={dispatch} />;
      case "terms":
        return <ModalTerms state={state} dispatch={dispatch} />;
      default:
        console.warn(
          `No valid case for readCase in LinkGeneric with context ${innerTextL}`
        );
        return <ModalAlertError state={state} dispatch={dispatch} />;
    }
  };
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message={`Error loading Link`} />
      )}
    >
      <a
        ref={aRef}
        id={`anchor${capitalizeFirstLetter(innerTextL)}`}
        className="highlight"
        href={`${href}`}
        target={`${target}`}
        rel={`${rel}`}
        title={`Click here to check ${innerTextL
          .toLowerCase()
          .replace("know ", "")
          .replace(" us", "")
          .replace("join", "how to join")
          .replace("cookies", "applied cookies")
          .replace("contact", "how to contact")}`}
        onClick={ev => {
          ev.preventDefault();
          dispatch({ type: "TOGGLE", payload: "" });
        }}
      >{`${innerTextL}`}</a>
      {state.isOpen && readCase(ComponentCase)}
    </ErrorBoundary>
  );
}
