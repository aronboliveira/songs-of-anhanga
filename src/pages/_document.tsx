import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { DocumentProps } from "src/lib/declarations/interfaces";
import { voidishStr } from "src/lib/declarations/types";

export const gameName: voidishStr = undefined;

export default function MyDocument() {
  //<Head> vs Metadata
  //<Html> vs <html>
  //<NextScript> vs implicit script
  return (
    <Html lang="en-US">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="RPG, Gaming, Folklore, Brazil, Next.js"
        />
        <meta
          name="description"
          content={`Landing page for login ${gameName || "undefined"}`}
        />
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=yes, maximum-scale=2.0, minimum-scale=0.5"
        /> */}
        <meta name="theme-color" content="#000000" />
        <meta name="x-ua-compatible" content="IE=edge" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        {/* <meta httpEquiv="content-security-policy" content="INDEFINIDO" /> */}
        {/* <link rel="canonical" href="https://INDEFINIDO"/> */}
        <link rel="icon" href="/img/icons/favicon/SVG/dall-e-tree-export.svg" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        {/* <title>Game App</title> */}
      </Head>
      <body>
        <Main />
      </body>
      <NextScript />
    </Html>
  );
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentProps> => {
  // console.log("AppTree:");
  // console.log(ctx.AppTree);
  // console.log("Render Page:");
  // console.log(ctx.renderPage());
  // console.log("Res:");
  // console.log(ctx.res);
  // console.log("Req:");
  // console.log(ctx.req);
  // console.log("asPath:");
  // console.log(ctx.asPath);
  // console.log("pathname:");
  // console.log(ctx.pathname);
  // console.log("query:");
  // console.log(ctx.query);
  // console.log("locale:");
  // console.log(ctx.locale);
  // ctx.defaultLocale;
  // console.log("initial props:");
  // console.log({ ...(await Document.getInitialProps(ctx)) });
  return { ...(await Document.getInitialProps(ctx)) };
};
