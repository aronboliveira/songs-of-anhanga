import { useState, useMemo, useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  NextRouterInstance,
  funcVoidishJsx,
  nullishNav,
  rDispatch,
  voidishJsx,
} from "src/lib/declarations/types";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import LoginModal from "../../modals/content/ModalLogin";
import CharsModal from "../../modals/content/ModalChars";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import LogoMain from "../../icons/logos/LogoMain";
import { HeaderSubtypeProps } from "src/lib/declarations/interfaces";
import ClassesModal from "src/components/modals/content/ModalClasses";

export default function HeaderSpread(props: HeaderSubtypeProps): JSX.Element {
  const router: NextRouterInstance = props.routerState ?? props.router;
  const mainNavRef = useRef<nullishNav>(null);
  const [stateLogin, setLogin] = useState<boolean>(false);
  const [stateChars, setChars] = useState<boolean>(false);
  const [stateDlgClasses, setDlgClasses] = useState<boolean>(false);
  const [stateDlgRaces, setDlgRaces] = useState<boolean>(false);
  const [stateDlgCreat, setDlgCreat] = useState<boolean>(false);
  const toggleState = (state: boolean, dispatch: rDispatch<boolean>): void => {
    dispatch(!state);
  };
  const renderLoginScreen = useMemo<funcVoidishJsx>(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateLogin === true) {
            return (
              <LoginModal
                dispatch={setLogin}
                state={stateLogin}
                routerState={router}
                isServerComponent={false}
              />
            );
          }
        } catch (eL) {
          console.error(`Error executing renderLoginScreen:
      ${(eL as Error).message}`);
        }
      },
    [stateLogin]
  );
  const renderCharsScreen = useMemo<funcVoidishJsx>(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateChars === true) {
            return (
              <CharsModal
                dispatch={setChars}
                state={stateChars}
                id={"chars"}
                routerState={router}
              />
            );
          }
        } catch (eCh) {
          console.error(
            `Error executing renderCharsScreen: ${(eCh as Error).message}`
          );
        }
      },
    [stateChars]
  );
  const renderDlgClassesScreen = useMemo<funcVoidishJsx>(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgClasses === true) {
            return (
              <ClassesModal
                dispatch={setDlgClasses}
                state={stateDlgClasses}
                id={"classes"}
                routerState={router}
              />
            );
          }
        } catch (eCl) {
          console.error(
            `Error executing renderDlgClassesScreen: ${(eCl as Error).message}`
          );
        }
      },
    [stateDlgClasses]
  );
  const renderDlgRacesScreen = useMemo<funcVoidishJsx>(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgRaces === true) {
            return (
              <CharsModal
                dispatch={setDlgRaces}
                state={stateDlgRaces}
                id={"races"}
                routerState={router}
              />
            );
          }
        } catch (eR) {
          console.error(
            `Error executing renderDlgRacesScreen: ${(eR as Error).message}`
          );
        }
      },
    [stateDlgRaces]
  );
  const renderDlgCreatScreen = useMemo<funcVoidishJsx>(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgCreat === true) {
            return (
              <CharsModal
                dispatch={setDlgCreat}
                state={stateDlgCreat}
                id={"creats"}
                routerState={router}
              />
            );
          }
        } catch (eCr) {
          console.error(
            `Error executing renderDlgCreatScreen: ${(eCr as Error).message}`
          );
        }
      },
    [stateDlgCreat]
  );
  useEffect(() => {
    initFillAttrs(`LoginMainBody`, mainNavRef.current);
  }, [mainNavRef]);
  useEffect(() => {
    try {
      if (!router) throw new Error(`No NextRouter defined.`);
      try {
        if (!(("asPath" in router || "path" in router) && "pathname" in router))
          throw new Error(`Properties for path in router invalidated.`);
        router.asPath === "/login" ? setLogin(true) : setLogin(false);
        router.asPath === "/chars" ? setChars(true) : setChars(false);
        router.asPath === "/classes"
          ? setDlgClasses(true)
          : setDlgClasses(false);
        router.asPath === "/races" ? setDlgRaces(true) : setDlgRaces(false);
        router.asPath === "/creats" ? setDlgCreat(true) : setDlgCreat(false);
      } catch (eP) {
        console.error(
          `Error executing procedure for checking router path:\n${
            (eP as Error).message
          }`
        );
      }
      try {
        if (!("query" in router))
          throw new Error(`No query object defined for NextRouter`);
        if (router.query.login)
          router.query.login === "true" ? setLogin(true) : setLogin(false);
        else console.warn(`No query found for login modal state in router`);
        if (router.query.chars)
          router.query.chars === "true" ? setChars(true) : setChars(false);
        else console.warn(`No query found for chars modal state in router`);
        if (router.query.classes)
          router.query.classes === "true"
            ? setDlgClasses(true)
            : setDlgClasses(false);
        else console.warn(`No query found for classes modal state in router`);
        if (router.query.races)
          router.query.races === "true"
            ? setDlgRaces(true)
            : setDlgRaces(false);
        else console.warn(`No query found for races modal state in router`);
        if (router.query.creats)
          router.query.creats === "true"
            ? setDlgCreat(true)
            : setDlgCreat(false);
        else console.warn(`No query found for creatures modal state in router`);
      } catch (eQ) {
        console.error(
          `Error executing procedure for checking router query:\n${
            (eQ as Error).message
          }`
        );
      }
    } catch (e) {
      console.error(
        `Error executing producre to check router properties:\n${
          (e as Error).message
        }`
      );
    }
  }, [router]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering header"></GenericErrorComponent>
      )}
    >
      <LogoMain logoCase="spread" />
      <div className="headerBtns">
        <nav id="mainNav" ref={mainNavRef}>
          <div className="App">
            <nav className="App-body">
              <section>
                <button
                  className="btn-primary"
                  id="btnChars"
                  onClick={e => {
                    e.stopPropagation();
                    toggleState(stateChars, setChars);
                  }}
                >
                  Characters
                </button>
                <button
                  className="btn-primary"
                  id="btnClasses"
                  onClick={e => {
                    e.stopPropagation();
                    toggleState(stateDlgClasses, setDlgClasses);
                  }}
                >
                  Classes
                </button>
                <button
                  className="btn-primary"
                  id="btnDlgRaces"
                  onClick={e => {
                    e.stopPropagation();
                    toggleState(stateDlgRaces, setDlgRaces);
                  }}
                >
                  Races
                </button>
                <button
                  className="btn-primary"
                  id="btnCreat"
                  onClick={e => {
                    e.stopPropagation();
                    toggleState(stateDlgCreat, setDlgCreat);
                  }}
                >
                  Creatures
                </button>
              </section>
              <section className="singleBtnSect">
                <button
                  className="btn-primary"
                  id="btnStart"
                  onClick={e => {
                    e.stopPropagation();
                    toggleState(stateLogin, setLogin);
                  }}
                >
                  Login
                </button>
              </section>
            </nav>
          </div>
          {stateLogin && renderLoginScreen()}
          {stateChars && renderCharsScreen()}
          {stateDlgClasses && renderDlgClassesScreen()}
          {stateDlgRaces && renderDlgRacesScreen()}
          {stateDlgCreat && renderDlgCreatScreen()}
        </nav>
      </div>
    </ErrorBoundary>
  );
}
