import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/ErrorComponentGeneric";
import { JSX } from "react/jsx-runtime";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import App, { AppContext } from "next/app";
import { GameAppProps } from "src/lib/declarations/interfaces";
import { AppProps } from "next/dist/pages/_app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
import "../styles/gStyle.scss";
import "../styles/classPanelStyle.scss";
import Head from "next/head";

export default function GameApp({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={() => (
          <GenericErrorComponent
            message={`Erro carregando a tela principal! 🕷📃`}
          />
        )}
      >
        <Head>
          <title>Game App</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=yes, maximum-scale=2.0, minimum-scale=0.5"
          />
        </Head>
        <div id="homeRoot">
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </Provider>
  );
}
GameApp.getInitialProps = async (ctx: AppContext): Promise<GameAppProps> => {
  // console.log("AppTree in App:");
  // console.log(ctx.AppTree);
  // console.log("Component in App:");
  // console.log(ctx.Component);
  // console.log("router in App:");
  // console.log(ctx.router);
  // console.log("ctx in App:");
  // console.log(ctx.ctx);
  return { ...(await App.getInitialProps(ctx)) };
};
