import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import {
  equalizeWidths,
  checkButtonsOverlap,
} from "src/lib/handlers/handlersStyles";
import { HeaderMainProps } from "src/lib/declarations/interfaces";
import { AppThunk } from "src/lib/declarations/typesRedux";
import HeaderSpread from "./HeaderSpread";
import HeaderAccordion from "./HeaderAccordion";
import Spinner from "src/components/icons/states/IconSpiner";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import {
  AccordionRefsState,
  RootObj,
  RouterState,
  StoreStateConfiguration,
} from "src/lib/declarations/interfacesRedux";
export default function HeaderMain({ idf }: HeaderMainProps): JSX.Element {
  const router = useRouter(),
    dispatch = useDispatch<AppThunk>(),
    routerState = useSelector<StoreStateConfiguration, RouterState>(
      s => s.router
    ),
    rootsState = useSelector<StoreStateConfiguration, RootObj>(s => s.roots),
    accordionRefs = useSelector<StoreStateConfiguration, AccordionRefsState>(
      s => s.accordionRefs
    ),
    headerRef = useRef<HTMLElement>(null),
    [view, setView] = useState<"loading" | "spread" | "accordion" | "error">(
      "loading"
    ),
    [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    setView("loading");
    try {
      const el = headerRef.current;
      if (!el || el.tagName !== "HEADER") {
        throw htmlElementNotFound(el, "HeaderMain initialization", [
          "<header>",
        ]);
      }
      if (!el.id) el.id = idf;
      setTimeout(
        () => setView(window.innerWidth > 630 ? "spread" : "accordion"),
        0
      );
    } catch (e) {
      console.error(`HeaderMain init error: ${(e as Error).message}`);
      setErrorMsg("Error loading Header elements");
      setView("error");
    }
  }, [idf]);
  useEffect(() => {
    const onResize = () => {
      setView(window.innerWidth > 630 ? "spread" : "accordion");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    if (view === "spread" || view === "accordion") {
      try {
        const el = headerRef.current!;
        equalizeWidths(Array.from(el.querySelectorAll("button")));
        const overlapHandler = () => checkButtonsOverlap(el);
        window.addEventListener("resize", overlapHandler);
        return () => window.removeEventListener("resize", overlapHandler);
      } catch (e) {
        console.error(`Header styling error: ${(e as Error).message}`);
      }
    }
  }, [view]);
  return (
    <header ref={headerRef} id={idf}>
      {view === "loading" && (
        <Spinner
          spinnerClass="spinner-border"
          spinnerColor="text-light"
          message="Loading header..."
        />
      )}
      {view === "spread" && (
        <HeaderSpread
          routerState={router ?? routerState}
          isServerComponent={false}
          selectors={{
            accordionSelector: accordionRefs,
            rootSelector: rootsState,
          }}
          dispatch={dispatch}
        />
      )}
      {view === "accordion" && (
        <HeaderAccordion
          routerState={router ?? routerState}
          isServerComponent={false}
          selectors={{
            accordionSelector: accordionRefs,
            rootSelector: rootsState,
          }}
          dispatch={dispatch}
        />
      )}
      {view === "error" && <GenericErrorComponent message={errorMsg} />}
    </header>
  );
}
