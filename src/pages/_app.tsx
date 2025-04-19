import App, { AppContext } from "next/app";
import { AppProps } from "next/dist/pages/_app";
import HeaderDefault from "src/components/headers/HeaderDefault";
import { Toaster, toast } from "react-hot-toast";
import "../styles/gStyle.scss";
import "../styles/globals.scss";
import "../styles/index.scss";
interface MyAppProps extends AppProps {
  pageProps: AppProps["pageProps"] & { isLoggedIn: boolean };
}
export default function GameApp({ Component, pageProps }: MyAppProps) {
  return (
    <div id="homeRoot">
      <Toaster />
      <HeaderDefault isLoggedIn={pageProps.isLoggedIn} />
      <Component {...pageProps} />
    </div>
  );
}
GameApp.getInitialProps = async (appCtx: AppContext) => {
  let isLoggedIn = false,
    appProps = {
      pageProps: {},
    };
  try {
    appProps = await App.getInitialProps(appCtx);
    const { ctx } = appCtx,
      proto = ctx.req?.headers["x-forwarded-proto"] ?? "http",
      host = ctx.req?.headers?.host ?? "localhost",
      res = await fetch(`${proto}://${host}/api/auth/isLoggedIn`);
    if (!res.ok) throw new Error(`Unsuccessful fetch`);
    const loggedIn = (await res.json()).isLoggedIn;
    loggedIn && toast.success(`Successfully verified log in!`);
  } catch (e) {
    toast.error(`Ops! There was an error while checking if you are logged in`);
    console.error(
      `Error executing getServerSideProps for HeaderDefault:\n ${
        (e as Error).name
      } — ${(e as Error).message}`
    );
  }
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      isLoggedIn,
    },
  };
};
