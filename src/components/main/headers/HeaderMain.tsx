import { useRef, useEffect, useState } from "react";
import { nullishHeader } from "src/lib/declarations/types";
import {
  htmlElementNotFound,
  typeError,
} from "src/lib/handlers/handlersErrors";
import { roots } from "src/lib/controller";
import { equalizeWidths } from "src/lib/handlers/handlersStyles";
import { HeaderMainProps } from "src/lib/declarations/interfaces";
import { checkButtonsOverlap } from "src/lib/handlers/handlersStyles";
import HeaderSpread from "./HeaderSpread";
import HeaderAccordion from "./HeaderAccordion";
import { Root } from "react-dom/client";
import Spinner from "src/components/icons/states/IconSpiner";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import RetryErrorComponent from "src/components/errors/ErrorComponentRetry";
import LoginMainBody from "../bodies/LoginMainBody";
import { useDispatch, useSelector } from "react-redux";
import {
  AccordionRefsState,
  RootObj,
  RouterState,
  StoreStateConfiguration,
} from "src/lib/declarations/interfacesRedux";
import clearRootDef, { addCheckButtonsDef } from "src/lib/handlers/handlersDef";
import { AppThunk } from "src/lib/declarations/typesRedux";
import { useRouter } from "next/router";

export default function HeaderMain({
  idf,
  root,
}: HeaderMainProps): JSX.Element {
  const router = useRouter();
  const routerSelect = useSelector<StoreStateConfiguration, RouterState>(
    (s: StoreStateConfiguration) => s.router
  );
  const rootsSelect = useSelector<StoreStateConfiguration, RootObj>(
    (s: StoreStateConfiguration) => s.roots
  );
  const accordionRefs = useSelector<
    StoreStateConfiguration,
    AccordionRefsState
  >((s: StoreStateConfiguration) => s.accordionRefs);
  const dispatch = useDispatch<AppThunk>();
  const headerRef = useRef<nullishHeader>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const renderHeader = (hRoot: Root): void | JSX.Element => {
    const renderAttempt = (hRoot: Root) => {
      innerWidth > 630
        ? hRoot.render(
            <HeaderSpread
              routerState={router ?? routerSelect}
              isServerComponent={false}
              selectors={{
                accordionSelector: accordionRefs,
                rootSelector: rootsSelect,
              }}
              dispatch={dispatch}
            />
          )
        : hRoot.render(
            <HeaderAccordion
              routerState={router ?? routerSelect}
              isServerComponent={false}
              selectors={{
                accordionSelector: accordionRefs,
                rootSelector: rootsSelect,
              }}
              dispatch={dispatch}
            />
          );
    };
    try {
      if (!window) throw new Error(`No active window object found.`);
      if (!(hRoot && "_internalRoot" in hRoot))
        throw typeError(hRoot, `validation of hRoot in renderHeader`, ["Root"]);
      renderAttempt(hRoot);
      hRoot.render(
        <Spinner
          spinnerClass="spinner-border"
          spinnerColor="text-light"
          message="Loading header..."
        />
      );
      const headerInterval = setInterval(() => {
        document.querySelector("header")?.querySelector(".spinner")
          ? renderAttempt(hRoot)
          : clearInterval(headerInterval);
      }, 50);
      setTimeout(() => {
        clearInterval(headerInterval);
        document.querySelector("header")?.querySelector(".spinner") &&
          hRoot &&
          "_internalRoot" in hRoot &&
          hRoot.render(
            <GenericErrorComponent message="Error loading Header" />
          );
      }, 10000);
    } catch (e) {
      console.error(`Error executing renderHeader:\n${(e as Error).message}`);
      return hRoot ? (
        hRoot.render(
          <HeaderSpread
            routerState={routerSelect}
            selectors={{
              accordionSelector: accordionRefs,
              rootSelector: rootsSelect,
            }}
            dispatch={dispatch}
          />
        )
      ) : (
        <RetryErrorComponent
          altRoot={root}
          altJsx={<LoginMainBody root={root} />}
          message="Error loading Header elements"
        />
      );
    }
  };
  //listener for width change
  useEffect(() => {
    try {
      if (
        !(
          headerRef.current instanceof HTMLElement &&
          headerRef.current.tagName === "HEADER"
        )
      )
        throw htmlElementNotFound(
          headerRef.current,
          `validation of Header Reference in Main Page`,
          ["<header>"]
        );
      if (headerRef.current.id === "") headerRef.current.id = "headerMainPage";
      addCheckButtonsDef(headerRef.current, roots, renderHeader);
      const headerEl = document.querySelector("header");
      try {
        if (!(headerEl instanceof HTMLElement))
          throw htmlElementNotFound(headerEl, `validation of <header>`, [
            "HTMLElement",
          ]);
        equalizeWidths(Array.from(headerEl.querySelectorAll("button")));
      } catch (e) {
        console.error(
          `Error executing for header styling:${(e as Error).message}`
        );
      }
    } catch (e) {
      console.error(
        `Error executing useEffect for <header>:\n${(e as Error).message}`
      );
    }
    setLoaded(true);
    return () => {
      try {
        if (
          !(
            headerRef.current instanceof HTMLElement &&
            headerRef.current.tagName === "HEADER"
          )
        )
          throw htmlElementNotFound(
            headerRef.current,
            `validation of Header Reference in Main Page`,
            ["<header>"]
          );
        clearRootDef(roots, headerRef.current.id);
        removeEventListener("resize", () =>
          checkButtonsOverlap(headerRef.current)
        );
        removeEventListener("resize", () =>
          renderHeader(roots[`${document.querySelector("header")?.id}`])
        );
      } catch (e) {
        console.error(
          `Error executing unmounting for header reference in Main Page:\n${
            (e as Error).message
          }`
        );
      }
    };
  }, []);
  useEffect(() => {}, [loaded]);
  return <header id={`${idf}`} ref={headerRef}></header>;
}
