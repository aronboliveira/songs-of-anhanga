import { useRef, useEffect } from "react";
import { nullishForm } from "../../../lib/declarations/types";
import { addFormListeners } from "../../../lib/fetchScript";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { nullishBtn, nullishDlg, nullishInp } from "src/lib/declarations/types";
import { RoutedDialogProps } from "src/lib/declarations/interfaces";
import {
  addModalClickSwitch,
  addModalSwitchListening,
  roots,
} from "src/lib/controller";
import { switchPwVisibility } from "src/lib/handlers/handlersStyles";
import {
  initLocalRoots,
  initProvid,
  syncAriaStates,
} from "src/lib/handlers/handlersCommon";
import {
  formatForBst,
  formatForSelectors,
  formatRootIdf,
} from "src/lib/handlers/handlersFormatFill";
import { defineValidations } from "src/lib/handlers/handlersIo";

export default function LoginModal(props: RoutedDialogProps): JSX.Element {
  const router = props.routerState ?? props.router;
  const dlgRef = useRef<nullishDlg>(null);
  const formLoginRef = useRef<nullishForm>(null);
  const inpRef = useRef<nullishInp>(null);
  const visBtnRef = useRef<nullishBtn>(null);
  useEffect(() => {
    if (!(dlgRef.current instanceof HTMLElement))
      throw htmlElementNotFound(
        dlgRef.current,
        `Current reference for Login Modal`,
        ["HTMLElement"]
      );
    formatForBst(dlgRef.current);
    addModalSwitchListening(
      dlgRef.current,
      props.dispatch,
      props.state,
      "Login Modal"
    );
    formatForSelectors(dlgRef.current);
    defineValidations(dlgRef.current);
    syncAriaStates(dlgRef.current);
    initProvid(dlgRef.current);
  }, [dlgRef]);
  useEffect(() => {
    try {
      if (!(formLoginRef.current instanceof HTMLFormElement))
        throw htmlElementNotFound(formLoginRef.current, `Form for user login`, [
          "<form>",
        ]);
      addFormListeners();
    } catch (e) {
      console.error(`Error validating Form for Login:
      ${(e as Error).message}`);
    }
  }, [formLoginRef]);
  useEffect(() => {
    try {
      if (!(visBtnRef.current instanceof HTMLButtonElement))
        throw htmlElementNotFound(
          visBtnRef.current,
          `Password Visibility Button`,
          ["<button>"]
        );
      initLocalRoots(visBtnRef.current);
    } catch (eV) {
      console.error(
        `Error executing useEffect com visBtnRef:${(eV as Error).message}`
      );
    }
  }, [visBtnRef]);
  useEffect(() => {
    if (
      router &&
      (router as any).asPath !== "?login" &&
      !location.href.endsWith("?login")
    )
      history.pushState({}, "", `?login`.replaceAll("//", "/"));
  }, [router]);
  useEffect(() => {
    return () => {
      router &&
        (location.href.endsWith("?login") ||
          (router as any).asPath.endsWith("?login")) &&
        history.pushState({}, "", `/`);
    };
  }, [router]);
  return (
    <dialog
      id="loginDlg"
      className="modal modal-content"
      ref={dlgRef}
      onClick={c => {
        addModalClickSwitch(
          c.currentTarget,
          c,
          props.dispatch,
          props.state,
          `Login Modal`
        );
      }}
    >
      <form
        id="outerLoginCont"
        name="outerLoginContFormName"
        action="../../srcBack/backend.cjs"
        method="post"
        target="_self"
        className="form-padded"
        ref={formLoginRef}
      >
        <div id="loginCont">
          <div id="logoCont"></div>
          <hgroup id="headerCont">
            <div id="titleCont1">
              <h1 id="titleText">
                <span className="fade-in-element" id="spanTitle">
                  User login
                </span>
              </h1>
              <button className="btn-close"></button>
            </div>
            <div id="titleCont2">
              <h2 id="subtitleText">
                <span className="fade-in-late-element" id="spanSubtitle">
                  Enter your user information
                </span>
              </h2>
            </div>
          </hgroup>
          <section id="inputCont">
            <fieldset className="loginInputCont1">
              <div className="loginInputCont2 blBg">
                <input
                  className="form-control fade-in-element entry ssPersist"
                  id="user"
                  type="text"
                  placeholder="User name"
                  title="Por favor, preencha este
                  campo."
                  minLength={5}
                  maxLength={30}
                  data-title="Usuário"
                  required
                />
              </div>
            </fieldset>
            <small className="customValidityWarn" id="userWarn"></small>
            <fieldset className="loginInputCont1">
              <div className="loginInputCont2 entry">
                <div
                  className="form-control flexDiv fade-in-element entry"
                  id="loginInputCont3"
                >
                  {/* <!-- TODO INSERIR VALIDAÇÃO DO LADO DO SERVIDOR NESSES INPUTS AQUI --> */}
                  <input
                    className="fade-in-element userInput entry ssPersist"
                    id="pw"
                    type="password"
                    autoComplete="password"
                    placeholder="Password"
                    pattern="^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                    minLength={1}
                    maxLength={30}
                    required
                    ref={inpRef}
                  />
                  <button
                    ref={visBtnRef}
                    type="button"
                    id="spanShowPw"
                    className="halfL fade-in-late-element entry eyeBtn"
                    onClick={function (c) {
                      switchPwVisibility(
                        c.currentTarget,
                        inpRef.current,
                        roots[`${formatRootIdf(c.currentTarget)}`]
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </fieldset>
            <small className="customValidityWarn" id="pwWarn"></small>
            <nav className="flexJtSb" id="loginBtnCont">
              <a
                id="newAccA"
                className="fade-in-late-element"
                href="#"
                target="_self"
                onClick={() => {
                  console.log(router);
                  router.push("/userPanelNew");
                }}
              >
                Sign up
              </a>
              <button
                type="submit"
                className="btn btn-primary fade-in-element"
                id="submitBtn"
                onClick={() => {
                  router.push("/userPanelActive");
                }}
              >
                Sign in
              </button>
            </nav>
          </section>
        </div>
      </form>
    </dialog>
  );
}
