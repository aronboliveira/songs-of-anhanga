import { useState, useEffect, useRef } from "react";
import App from "../../../pages/index";
import {
  NextRouterInstance,
  nlDiv,
  nlMain,
} from "../../../lib/declarations/types";
import { ErrorBoundary } from "react-error-boundary";
import {
  LoginMainBodyProps,
  RouterSelectState,
} from "src/lib/declarations/interfaces";
import RetryErrorComponent from "../../errors/ErrorComponentRetry";
import {
  fetchError,
  htmlElementNotFound,
  numberError,
  stringError,
} from "src/lib/handlers/handlersErrors";
import { defineDocumentData } from "src/lib/handlers/handlersStyles";
import { syncAriaStates } from "src/lib/handlers/handlersCommon";
import { fetchImagesDef, fetchUserData } from "src/lib/handlers/handlersFetch";
import { gUser, roots, documentData } from "src/lib/controller";
import {
  fillSection,
  formatForBst,
  formatForSelectors,
} from "src/lib/handlers/handlersFormatFill";
import { createRoot } from "react-dom/client";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import FooterLandingPage from "../footers/FooterLandingPage";
import HeaderMain from "../headers/HeaderMain";
import { useDispatch, useSelector } from "react-redux";
import {
  CarouselImgsState,
  StoreStateConfiguration,
} from "src/lib/declarations/interfacesRedux";
import { AppThunk } from "src/lib/declarations/typesRedux";
import clearRootDef, {
  generateFootRootDef,
} from "src/lib/handlers/handlersDef";

export default function LoginMainBody(props: LoginMainBodyProps): JSX.Element {
  const modalsRefsDispatch = useDispatch<AppThunk>(),
    carouselSelect = useSelector<StoreStateConfiguration, CarouselImgsState>(
      (s: StoreStateConfiguration) => s.carouselImgs
    ),
    mainBodyRef = useRef<nlDiv>(null),
    mainElRef = useRef<nlMain>(null),
    [stateCarousel, setCarousel] = useState<number>(0),
    selectRouter = useSelector<RouterSelectState, NextRouterInstance>(
      state => state.router
    ),
    renderCarousel = async (): Promise<void> => {
      const mainEl = document.querySelector("main");
      const mainId = mainEl?.id || "loginMainEl";
      // try {
      //   if (!(mainEl instanceof HTMLElement))
      //     throw htmlElementNotFound(
      //       mainEl,
      //       `<main> element for ${LoginMainBody.prototype.constructor.name}`,
      //       ["HTMLElement"]
      //     );
      //   if (mainEl.id === "") mainEl.id = "loginMainEl";
      // } catch (eM) {
      //   console.error(
      //     `Error executing routine for fetching <main>:\n${
      //       (eM as Error).message
      //     }`
      //   );
      // }
      const carousel = await fetchImagesDef(mainEl, mainId, props.root);
      console.log(carousel);
      setCarouselEl(carousel);
    },
    [header, setHeader] = useState<JSX.Element>(<></>),
    [footer, setFooter] = useState<JSX.Element>(<></>),
    [carouselEl, setCarouselEl] = useState<JSX.Element>(<></>);
  useEffect(() => {
    [
      ...Array.from(document.getElementsByTagName("header")),
      ...Array.from(document.getElementsByTagName("footer")),
    ].forEach(e => e?.isConnected && e.remove());
    setTimeout(() => {
      for (const r of [mainBodyRef.current, mainElRef.current]) {
        if (!r) continue;
        const tr = "height 0.5s ease-in-out";
        if (!getComputedStyle(r).transition) r.style.transition = tr;
        else r.style.transition += `, ${tr}`;
      }
      setHeader(<HeaderMain idf={`LoginMainBody`} root={props.root} />);
      setFooter(<FooterLandingPage />);
    }, 200);
  }, []);
  //image fetch
  useEffect(() => {
    try {
      if (!(mainElRef.current instanceof HTMLElement))
        throw htmlElementNotFound(
          mainElRef.current,
          `Main reference for login main body`,
          ["HTMLElement"]
        );
      defineDocumentData();
      fetchUserData()
        .then(() => {
          console.log(gUser.currentUser);
        })
        .catch(err => fetchError(err));
      fillSection(mainElRef.current, `LoginMainBody`);
      formatForBst(mainElRef.current);
      renderCarousel();
      formatForSelectors(mainElRef.current);
      syncAriaStates(mainElRef.current);
      return () => {
        let arrows = Array.from(
          document.querySelectorAll('[class^="carousel-control"]')
        ).map(arrow => arrow.id);
        if (arrows.length === 0)
          arrows = Object.keys(roots).filter(
            key => /arrow/gi.test(key) && /Carousel/gi.test(key)
          );
        try {
          if (arrows.length === 0)
            throw numberError(
              arrows.length,
              `Length of arrows NodeList during return of LoginMainBody`
            );
          arrows.forEach((arrow, a) => {
            // console.log(`!CAROUSEL: executing iteration ${a} for arrows`);
            try {
              if (!(typeof arrow === "string"))
                throw htmlElementNotFound(
                  arrow,
                  `Reference for arrow Element`,
                  ["HTMLElement"]
                );
              clearRootDef(roots, `${arrow}`);
            } catch (e) {
              console.error(
                `Error executing iteration ${a} for arrow elements in carousel:\n${
                  (e as Error).message
                }`
              );
            }
          });
        } catch (e) {
          console.error(
            `!CAROUSEL: Error executing cicle for arrows:\n${
              (e as Error).message
            }\n
            Available keys: ${Object.keys(roots)}`
          );
        }
        const mainEl = document.querySelector("main");
        const mainId =
          mainEl?.id || [
            Object.keys(roots).filter(key => /mainEl$/i.test(key)),
          ] ||
          "loginMainEl";
        clearRootDef(roots, `${mainId}`);
      };
    } catch (e) {
      console.error(
        `Error executing useEffect for mainElRef:\n${(e as Error).message}`
      );
    }
  }, []);
  //carousel rendering
  useEffect(() => {
    // console.log("!CAROUSEL: 1.1. useEffect for stateCarousel called");
    // console.log(stateCarousel);
    const mainEl = document.querySelector("main");
    const mainId = mainEl?.id || "loginMainEl";
    // if (!mainEl) console.warn("Error fetching main element");
    // if (mainEl) {
    //   mainEl.innerHTML = `
    //   <div class="spinner-border" role="status">
    //     <span class="visually-hidden">Loading...</span>
    //   </div>
    //   `;
    // }
    // // const imgInterval =
    // setTimeout(() => {
    //   try {
    //     // const _mainEl = document.querySelector("main");
    //     // const _mainId = _mainEl?.id || "loginMainEl";
    //     // console.log("ATTEMP TO RENDER CAROUSEL WITH SELECTOR " + _mainId);
    //     // if (!_mainEl)
    //     //   throw htmlElementNotFound(
    //     //     _mainEl,
    //     //     `Reference for <main> em interval`,
    //     //     ["HTMLElement"]
    //     //   );
    //     // if (!documentData.carouselImgs[_mainId] && !carouselSelect[mainId])
    //     //   throw stringError(_mainId, "loginMainEl");
    //     renderCarousel();
    //     // _mainEl &&
    //     //   _mainEl.querySelector(".carousel") &&
    //     //   _mainEl.querySelector("img") &&
    //     //   clearInterval(imgInterval);
    //   } catch (e) {
    //     console.error(
    //       `Error executing interval for rendering main carousel:\n${
    //         (e as Error).message
    //       }`
    //     );
    //   }
    // }, 100);
    setTimeout(() => {
      if (!document.querySelector(".carousel")) {
        console.warn(`Failed to render carousel:\n
        Was <main> on screen? ${
          document.querySelector("main") instanceof HTMLElement
        };\n
        What was the recognized id? ${
          document.querySelector("main")?.id || "none"
        };\n`);
      }
      // clearInterval(imgInterval);
      if (`${mainId}` in roots) {
        let alertRoot = roots[`${mainId}`];
        if (document.querySelector("main")?.querySelector(".carousel"))
          alertRoot = createRoot(
            document.querySelector("main")!.querySelector(".carousel")!
          );
        else if (document.querySelector("main")) {
          alertRoot = createRoot(document.querySelector("main")!);
          if (!document.querySelector(".carousel")?.querySelector("img"))
            alertRoot.render(
              <GenericErrorComponent message="Timeout for mounting carousel! Please try reloading or checking your connection "></GenericErrorComponent>
            );
        }
      }
    }, 5000);
  }, [stateCarousel]);
  //footer adjustments
  useEffect(() => {
    const footerInterval = setInterval(() => {
      const footer = document.querySelector("footer");
      if (!footer?.querySelector("section"))
        footer instanceof HTMLElement && generateFootRootDef(roots, footer);
      else clearInterval(footerInterval);
    }, 100);
    setTimeout(() => {
      if (!document.querySelector("footer")?.querySelector("section")) {
        const footer = document.querySelector("footer");
        try {
          if (!(footer instanceof HTMLElement && footer.tagName === "FOOTER"))
            throw htmlElementNotFound(
              footer,
              `validation of Footer within callback of error for footer rendering error`,
              ["<footer>"]
            );
          if (
            !footer.querySelector("section") &&
            roots[`${footer.id || footer.tagName}`]
          )
            roots[`${footer.id || footer.tagName}`].render(
              <RetryErrorComponent
                altRoot={props.root}
                altJsx={<LoginMainBody root={props.root} />}
                message="Error loading Footer"
              />
            );
        } catch (e) {
          console.error(
            `Error executing routine for displaying Footer error on ${
              LoginMainBody.prototype.constructor.name
            }:\n${(e as Error).message}`
          );
        }
      }
    }, 10000);
    return () => {
      const footer = document.querySelector("footer");
      footer instanceof HTMLElement &&
        footer.tagName === "FOOTER" &&
        roots[`${footer.id || footer.tagName}`] &&
        clearRootDef(roots, `${footer.id || footer.tagName}`);
    };
  }, []);
  //dispatch
  useEffect(() => {
    // modalsRefsDispatch([
    //   "/authors",
    //   "/chars",
    //   "/classes",
    //   "/contact",
    //   "/cookies",
    //   "/creats",
    //   "/login",
    //   "/team",
    //   "/terms",
    // ]);
  }, [modalsRefsDispatch]);
  //routing
  useEffect(() => {
    try {
      if (!(props.router || props.routerState || selectRouter))
        throw new Error(`No valid Next.js Router found.`);
      console.log("REDUX SELECTION");
      console.log(selectRouter);
      const possibleModalStates = [
        "?authors",
        "?chars",
        "?classes",
        "?contact",
        "?cookies",
        "?creats",
        "?login",
        "?team",
        "?terms",
      ];
      const possiblePages = [
        "/classPanel",
        "/userPanelActive",
        "/userPanelNew",
      ];
      setTimeout(() => {
        !possibleModalStates.some(modalState =>
          location.href.endsWith(modalState)
        ) &&
          !possiblePages.some(pageState => location.href.endsWith(pageState)) &&
          history.pushState({}, "", "/home");
      }, 1000);
    } catch (e) {
      console.error(
        `Error executing useEffect for router:\n${(e as Error).message}`
      );
      history.pushState({}, "", "/");
    }
  }, [selectRouter]);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <RetryErrorComponent
          message={`Erro renderizado HTML principal`}
          altJsx={<App />}
          altRoot={props.root}
        />
      )}
    >
      <div id="mainBody" ref={mainBodyRef}>
        {header}
        <main ref={mainElRef}>{carouselEl}</main>
        {footer}
      </div>
    </ErrorBoundary>
  );
}
