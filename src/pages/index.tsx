import { useState, useEffect, createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setRouter } from "src/redux/slices/routerSlice";
import { Dispatch } from "redux";
import { setMainComponent } from "src/redux/slices/mainComponentsSlice";
import GenericErrorComponent from "src/components/errors/ErrorComponentGeneric";
import LoginMainBody from "src/components/main/bodies/LoginMainBody";
import { voidishAppContext } from "src/lib/declarations/types";
import ModalDevelopment from "src/components/modals/alerts/ModalDevelopment";

export const AppContext = createContext<voidishAppContext>(undefined);
export default function Home(): JSX.Element {
  const [_, setDispatch] = useState<boolean>(false);
  const [shouldShowDev, setDev] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch(setRouter(router));
    setDispatch(true);
  }, [dispatch]);
  useEffect(() => {
    const handleRouteChange = (url: string = "/"): void => {
      if (url.endsWith("/userPanelNew"))
        dispatch(setMainComponent({ v: "NewUserPanel" }));
      else if (url.endsWith("/userPanelActive"))
        dispatch(setMainComponent({ v: "ActiveUserPanel" }));
      else dispatch(setMainComponent({ v: "LoginMainBody" }));
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    handleRouteChange(location.pathname);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router, dispatch]);
  return (
    <AppContext.Provider value={{ router }}>
      <div id="root">
        <ErrorBoundary
          FallbackComponent={() => (
            <GenericErrorComponent message="Error loading page" />
          )}
        >
          <LoginMainBody root={<Home />} />
          {shouldShowDev && (
            <ModalDevelopment dispatch={setDev} state={shouldShowDev} />
          )}
        </ErrorBoundary>
      </div>
      <div id="modalRoot" style={{ width: "0", height: "0" }}></div>
    </AppContext.Provider>
  );
}
