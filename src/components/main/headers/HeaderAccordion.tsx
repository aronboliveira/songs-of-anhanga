import { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  funcVoidishJsx,
  nullishBtn,
  nullishNav,
  rDispatch,
  voidishJsx,
} from "src/lib/declarations/types";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import LoginModal from "../../modals/content/ModalLogin";
import CharsModal from "../../modals/content/ModalChars";
import { formatForBst } from "src/lib/handlers/handlersFormatFill";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { roots } from "src/lib/controller";
import IconList from "../../icons/states/IconList";
import IconClose from "../../icons/guidance/IconClose";
import {
  equalizeWidths,
  generateAccordion,
  stickToRelative,
} from "src/lib/handlers/handlersStyles";
import LogoMain from "../../icons/logos/LogoMain";
import { HeaderSubtypeProps } from "src/lib/declarations/interfaces";
import clearRootDef, {
  renderAccordionIconDef,
} from "src/lib/handlers/handlersDef";
import ClassesModal from "src/components/modals/content/ModalClasses";

export default function HeaderAccordion(
  props: HeaderSubtypeProps
): JSX.Element {
  const router = props.routerState ?? props.router;
  const accordSectRef = useRef<nullishNav>(null);
  const accordBtnRef = useRef<nullishBtn>(null);
  const [stateAccordBtn, setAccordBtn] = useState<boolean>(false);
  const [stateLogin, setLogin] = useState<boolean>(false);
  const [stateChars, setChars] = useState<boolean>(false);
  const [stateDlgClasses, setDlgClasses] = useState<boolean>(false);
  const [stateDlgRaces, setDlgRaces] = useState<boolean>(false);
  const [stateDlgCreat, setDlgCreat] = useState<boolean>(false);
  const toggleState = (state: boolean, dispatch: rDispatch<boolean>): void => {
    dispatch(!state);
  };
  const renderLoginScreen = useMemo(
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
  const renderCharsScreen = useMemo(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateChars === true) {
            return (
              <CharsModal
                dispatch={setChars}
                state={stateChars}
                id={"chars"}
                router={router}
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
  const renderDlgClassesScreen = useMemo(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgClasses === true) {
            return (
              <ClassesModal
                dispatch={setDlgClasses}
                state={stateDlgClasses}
                id={"classes"}
                router={router}
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
  const renderDlgRacesScreen = useMemo(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgRaces === true) {
            return (
              <CharsModal
                dispatch={setDlgRaces}
                state={stateDlgRaces}
                id={"races"}
                router={router}
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
  const renderDlgCreatScreen = useMemo(
    (): funcVoidishJsx =>
      function (): voidishJsx {
        try {
          if (stateDlgCreat === true) {
            router?.push("/creats");
            return (
              <CharsModal
                dispatch={setDlgCreat}
                state={stateDlgCreat}
                id={"creats"}
                router={router}
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
    const header = accordSectRef.current?.closest("header");
    initFillAttrs(`HeaderAccordion`, header);
    try {
      if (!(header instanceof HTMLElement && header.tagName === "HEADER"))
        throw htmlElementNotFound(
          header,
          `validation of header element in useEffect`,
          ["<header>"]
        );
      header.style.position = "relative";
    } catch (e) {
      console.error(
        `Error executing routine for adjusting header positioning:\n${
          (e as Error).message
        }`
      );
    }
    try {
      const accordMainCont = document.querySelector(".accordionMainCont");
      if (!(accordMainCont instanceof HTMLElement))
        throw htmlElementNotFound(
          accordMainCont,
          `validation of Accordion Main Container`,
          ["HTMLElement"]
        );
      if (accordMainCont.id === "")
        accordMainCont.id = `${
          accordMainCont.closest("header")?.id ||
          accordMainCont.closest("section")?.id ||
          accordMainCont.closest("div")?.id ||
          accordMainCont.closest("main")?.id ||
          `accordMainContInvalidParent${
            document.querySelectorAll('[id^="accordMainContInvalidParent"]')
              .length
          }`
        }MainCont`;
    } catch (e) {
      console.error(
        `Error executing routine for Accordion Main Container:${
          (e as Error).message
        }`
      );
    }
  }, []);
  useEffect(() => {
    // console.log("!ACCORDION: useEffect called for stateAccordBtn");
    try {
      if (!(accordBtnRef.current instanceof HTMLButtonElement))
        throw htmlElementNotFound(
          accordBtnRef.current,
          `validation of Accordion Button Reference`,
          ["HTMLButtonElement"]
        );
      if (accordBtnRef.current.id === "") accordBtnRef.current.id = "accordBtn";
      renderAccordionIconDef(roots, accordBtnRef.current, stateAccordBtn);
    } catch (e1) {
      console.error(
        `Error executing useEffect for stateAccordBtn:\n${
          (e1 as Error).message
        }`
      );
    }
    try {
      if (
        !(
          accordSectRef.current instanceof HTMLElement &&
          accordSectRef.current.tagName === "NAV"
        )
      )
        throw htmlElementNotFound(
          accordSectRef.current,
          `validation of Reference to Accordion Section`,
          ["<nav>"]
        );
      if (stateAccordBtn) {
        accordSectRef.current.classList.remove("hidden");
        accordSectRef.current.classList.add("shown");
        accordSectRef.current.style.transform = `translateX(0%)`;
      } else {
        accordSectRef.current.classList.add("hidden");
        accordSectRef.current.classList.remove("shown");
        accordSectRef.current.style.transform = `translateX(100%)`;
      }
    } catch (e2) {
      console.error(
        `Error executing routine for adjusting Main Accordion Container:\n${
          (e2 as Error).message
        }`
      );
    }
    return () => {
      try {
        if (!(accordBtnRef.current instanceof HTMLButtonElement))
          throw htmlElementNotFound(
            accordBtnRef.current,
            `validation of Accordion Button during unmount process`,
            ["HTMLButtonElement"]
          );
        clearRootDef(roots, accordBtnRef.current.id);
      } catch (e) {
        console.error(
          `Error executing return for useEffect for stateAccordBtn:\n${
            (e as Error).message
          }`
        );
      }
    };
  }, [stateAccordBtn]);
  useLayoutEffect(() => {
    if (!(accordSectRef.current instanceof HTMLElement))
      throw htmlElementNotFound(
        accordSectRef.current,
        `validation of Accordion Block Reference`,
        ["HTMLElement"]
      );
    generateAccordion(accordSectRef.current);
    formatForBst(accordSectRef.current);
    equalizeWidths(
      Array.from(accordSectRef.current.querySelectorAll("button"))
    );
    accordSectRef.current.closest("header")!.style.position = `relative`;
    stickToRelative(
      accordSectRef.current.closest("header"),
      accordSectRef.current
    );
  }, [accordSectRef]);
  //routing
  useEffect(() => {
    try {
      if (!router) throw new Error(`No NextRouter defined.`);
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
        router.query.races === "true" ? setDlgRaces(true) : setDlgRaces(false);
      else console.warn(`No query found for races modal state in router`);
      if (router.query.creats)
        router.query.creats === "true" ? setDlgCreat(true) : setDlgCreat(false);
      else console.warn(`No query found for creatures modal state in router`);
    } catch (e) {
      console.error(
        `Error executing producre to check query:\n${(e as Error).message}`
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
        <nav className="accordionMainCont hidden" ref={accordSectRef}>
          <ul>
            <li>
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
            </li>
            <li>
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
            </li>
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
          {stateLogin && renderLoginScreen()}
          {stateChars && renderCharsScreen()}
          {stateDlgClasses && renderDlgClassesScreen()}
          {stateDlgRaces && renderDlgRacesScreen()}
          {stateDlgCreat && renderDlgCreatScreen()}
        </nav>
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
        <section className="singleBtnSect">
          <button
            className="accordion"
            onClick={() => setAccordBtn(!stateAccordBtn)}
          >
            {!stateAccordBtn && <IconList></IconList>}
            {stateAccordBtn && <IconClose></IconClose>}
          </button>
        </section>
      </div>
    </ErrorBoundary>
  );
}
