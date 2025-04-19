import { useEffect, useRef, useState } from "react";
import {
  evTargNotFound,
  htmlElementNotFound,
} from "src/lib/handlers/handlersErrors";
import {
  initProvid,
  renderLoginBody,
  syncAriaStates,
} from "src/lib/handlers/handlersCommon";
import { nullishFooter, nullishForm } from "src/lib/declarations/types";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/ErrorComponentGeneric";
import { defineDatePhVisib } from "src/lib/handlers/handlersStyles";
import {
  fillOptionsCountries,
  fillOptionsText,
  formatForBst,
  formatForSelectors,
} from "src/lib/handlers/handlersFormatFill";
import { normalizeNumber } from "src/lib/handlers/handlersNormalize";
import {
  defineValidations,
  evalInpsFill,
  evalSubmitForm,
} from "src/lib/handlers/handlersIo";
import {
  addEmailExtension,
  autoCapitalizeInputs,
} from "src/lib/handlers/handlersFormatAuto";
import { roots } from "src/lib/controller";
import { createRoot } from "react-dom/client";
import ModalAlertReturn from "../components/modals/alerts/ModalAlertReturn";
import ModalAlertReset from "../components/modals/alerts/ModalAlertReset";
import { RoutedProps } from "src/lib/declarations/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppThunk } from "src/lib/declarations/typesRedux";
import {
  RootObj,
  StoreStateConfiguration,
} from "src/lib/declarations/interfacesRedux";
import { setRoot } from "src/redux/slices/rootsSlice";

export default function NewUserPanel({ router }: RoutedProps): JSX.Element {
  const formRef = useRef<nullishForm>(null);
  const footRef = useRef<nullishFooter>(null);
  const [shouldShowReturnAlert, setReturnAlert] = useState<boolean>(false);
  const [shouldShowResetAlert, setResetAlert] = useState<boolean>(false);
  const dispatch = useDispatch<AppThunk>();
  const rootsSelect = useSelector<StoreStateConfiguration, RootObj>(
    (s: StoreStateConfiguration) => s.roots
  );
  const toggleAlert = (): void => {
    setReturnAlert(!shouldShowReturnAlert);
  };
  useEffect(() => {
    if (!(formRef.current instanceof HTMLElement))
      throw htmlElementNotFound(
        formRef.current,
        `Reference for form of NewUserPanel`,
        ["HTMLElement"]
      );
    formatForBst(formRef.current, /inpnewuser/gi, NewUserPanel);
    [
      ...formRef.current.querySelectorAll("select"),
      ...formRef.current.querySelectorAll("datalist"),
    ].forEach(listEl => {
      fillOptionsText(listEl);
    });
    formRef.current.querySelectorAll("section").forEach((sect, i) => {
      try {
        if (!(sect instanceof HTMLElement && sect.tagName === "SECTION"))
          throw htmlElementNotFound(
            sect,
            `Section cicle ${i} for New user form`,
            ["HTMLElement"]
          );
        sect.classList.add(`sectsNewUser`, `flexJBt`);
        if (
          (sect.querySelector("h1") || sect.querySelector("h2")) &&
          !formRef.current!.querySelector("#hNewUser")
        ) {
          sect.id = `hNewUser`;
          [
            ...sect.querySelectorAll("h1"),
            ...sect.querySelectorAll("h2"),
          ].forEach(hd => {
            hd.classList.add(`titleNewUser`);
            hd.querySelectorAll("*").forEach(textEl => {
              textEl.classList.add(`textElNewUser`);
            });
          });
        } else if (!formRef.current!.querySelector("#bNewUser"))
          sect.id = `bNewUser`;
        else if (
          sect.querySelector('button[type="submit"]') &&
          !sect.querySelector("#sectSubmitNewUser")
        ) {
          sect.id = `sectSubmitNewUser`;
          sect.querySelectorAll("button").forEach((btn, i) => {
            try {
              if (!(btn instanceof HTMLButtonElement))
                throw htmlElementNotFound(
                  btn,
                  `Button cicle ${i} for section ${sect.id}`,
                  ["HTMLButtonElement"]
                );
              btn.classList.add("widMinThird");
              if (btn.type === "submit") {
                btn.classList.add("btn-success");
                btn.innerText = `Submit`;
              } else if (
                btn.type === "reset" ||
                btn.classList.contains("reset")
              ) {
                btn.classList.add("btn-warning");
                btn.style.fontWeight = "500";
                btn.innerText = `Reset`;
              }
            } catch (eB) {
              console.error(
                `Error classifying buttons:\n${(eB as Error).message}`
              );
            }
          });
        } else sect.id = `sect${i}NewUser`;
      } catch (eS) {
        console.error(
          `Error executing routine for sections classification:\n${
            (eS as Error).message
          }`
        );
      }
    });
    formatForSelectors(formRef.current);
    fillOptionsCountries();
    defineDatePhVisib(formRef.current);
    defineValidations(formRef.current);
    formRef.current
      .querySelectorAll(".autocorrect")
      .forEach(autocompletable => {
        autocompletable.addEventListener("input", ev => {
          try {
            if (!(ev.currentTarget instanceof HTMLElement))
              throw evTargNotFound(ev.currentTarget, ev, ["HTMLElement"]);
            autoCapitalizeInputs(ev.currentTarget);
          } catch (e) {
            console.error(
              `Error executing callback for ${ev.type} autocompetable:${
                (e as Error).message
              }`
            );
          }
        });
      });
    [
      ...formRef.current.querySelectorAll('input[type="email"]'),
      ...formRef.current.querySelectorAll('input[id*="email"]'),
    ].forEach(emailEl => {
      const checkForListener = (ev: Event) => {
        try {
          if (!(ev.currentTarget instanceof HTMLElement))
            throw evTargNotFound(ev.currentTarget, ev, ["HTMLElement"]);
          addEmailExtension(ev.currentTarget);
        } catch (e) {
          console.error(
            `Error executing checkForListener:\n${(e as Error).message}`
          );
        }
      };
      emailEl.addEventListener("input", checkForListener);
      emailEl.addEventListener("click", checkForListener);
    });
    syncAriaStates(formRef.current);
    initProvid(formRef.current);
  }, [formRef]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent
          message={`Erro carregando formulário de novo usuário! 👾`}
        />
      )}
    >
      <form className={`screenPanel`} id="regstNewUser" ref={formRef}>
        <section>
          <h1>
            <strong>New User Registration</strong>
          </h1>
          <button
            type="button"
            id="returnBtn"
            className="btn btn-secondary"
            onClick={ev => {
              try {
                console.log(shouldShowReturnAlert);
                if (!(formRef.current instanceof HTMLFormElement))
                  throw htmlElementNotFound(
                    formRef.current,
                    `Form reference for New User Panel`,
                    ["HTMLFormElement"]
                  );
                const fillings = evalInpsFill(formRef.current);
                if (
                  fillings &&
                  fillings.some(filling => filling.filled === false)
                ) {
                  try {
                    if (!(footRef.current instanceof HTMLElement))
                      throw htmlElementNotFound(
                        footRef.current,
                        `Footer reference in ${ev.type} callback for ${ev.currentTarget} within ${NewUserPanel.prototype.constructor.name}`,
                        ["HTMLElement"]
                      );
                    //TODO ELIMINAR VARIANTE DEF
                    if (!roots[`${footRef.current.id}`])
                      roots[`${footRef.current.id}`] = createRoot(
                        footRef.current
                      );
                    !rootsSelect[`${footRef.current.id}`] &&
                      dispatch(
                        setRoot({
                          k: footRef.current.id,
                          v: createRoot(footRef.current),
                        })
                      );
                    toggleAlert();
                  } catch (e) {
                    console.error(
                      `Error executing creation of Root for rendering Alert Modal:\n${
                        (e as Error).message
                      }`
                    );
                  }
                } else {
                  try {
                    if (!router) throw new Error(`No valid router found`);
                    if (!("asPath" in router || "path" in router))
                      throw new Error(`No valid path found for router`);
                    renderLoginBody(router as any, "home");
                  } catch (e) {
                    console.error(
                      `Error executing procedure for routing:\n${
                        (e as Error).message
                      }`
                    );
                  }
                }
              } catch (e) {
                console.error(
                  `Error executing callback for ${
                    ev.type
                  } in Return Button for ${
                    NewUserPanel.prototype.constructor.name
                  }:\n${(e as Error).message}`
                );
                try {
                  if (!router) throw new Error(`No valid router found`);
                  if (!("asPath" in router || "path" in router))
                    throw new Error(`No valid path found for router`);
                  renderLoginBody(router as any, "/");
                } catch (e) {
                  console.error(
                    `Error executing procedure for routing:\n${
                      (e as Error).message
                    }`
                  );
                }
              }
            }}
          >
            Return to Main Page
          </button>
        </section>
        <section>
          <fieldset>
            <div>
              <div>
                <label htmlFor="firstNameInpNewUser"></label>
                <input className="ssPersist" required></input>
              </div>
              <div>
                <label htmlFor="familyNameInpNewUser"></label>
                <input className="ssPersist"></input>
              </div>
              <div>
                <label htmlFor="genderInpNewUser"></label>
                <select className="ssPersist">
                  <option value={`female`}></option>
                  <option value={`male`}></option>
                  <option value={`non-binary`}></option>
                  <option value={`other`}></option>
                </select>
              </div>
              <div>
                <label htmlFor="ageInpNewUser"></label>
                <input
                  className="ssPersist"
                  type="number"
                  min={0}
                  max={255}
                  onInput={ev => {
                    ev.currentTarget.value = `${normalizeNumber(
                      ev.currentTarget.value,
                      "whole"
                    )}`;
                  }}
                  onChange={ev => {
                    ev.currentTarget.value = `${normalizeNumber(
                      ev.currentTarget.value,
                      "whole"
                    )}`;
                  }}
                ></input>
              </div>
              <div>
                <label htmlFor="bdayInpNewUser"></label>
                <input type="date"></input>
              </div>
              <div>
                <label htmlFor="emailInpNewUser"></label>
                <input required></input>
              </div>
              <div>
                <label htmlFor="countryNameInpNewUser"></label>
                <select></select>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="usernameInpNewUser"></label>
                <input required></input>
              </div>
              <div>
                <label htmlFor="passwordInpNewUser"></label>
                <input type="password" required></input>
              </div>
              <div>
                <label htmlFor="confirmPasswordInpNewUser"></label>
                <input type="password" required></input>
              </div>
            </div>
          </fieldset>
          <section>
            <button
              type="submit"
              onClick={ev => {
                evalSubmitForm(ev.currentTarget, ev);
                const fillings = evalInpsFill(formRef.current);
                if (fillings) {
                  for (const filling of fillings.filter(
                    filling => filling.filled === false
                  )) {
                    const filled =
                      document.querySelector(`#${filling.idf}`) ||
                      document.getElementsByName(`${filling.idf}`)[0];
                    if (filled instanceof Element) {
                      filled.scrollIntoView();
                      break;
                    }
                  }
                }
              }}
            ></button>
            <button
              type="reset"
              onClick={ev => {
                if (ev.currentTarget.type === "reset") ev.preventDefault();
                setResetAlert(!shouldShowResetAlert);
              }}
            ></button>
          </section>
        </section>
      </form>
      <footer id="footerNewUser" ref={footRef}>
        {shouldShowReturnAlert && (
          <ModalAlertReturn
            dispatch={setReturnAlert}
            state={shouldShowReturnAlert}
          />
        )}
        {shouldShowResetAlert && (
          <ModalAlertReset
            dispatch={setResetAlert}
            state={shouldShowResetAlert}
            relForm={formRef.current}
          />
        )}
      </footer>
    </ErrorBoundary>
  );
}
