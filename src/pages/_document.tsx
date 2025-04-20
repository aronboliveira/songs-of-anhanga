import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { DocumentProps } from "src/lib/declarations/interfaces";
import { voidishStr } from "src/lib/declarations/types";
import { GoogleFonts } from "next-google-fonts";

export const gameName: voidishStr = undefined;

export default function MyDocument() {
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
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap"
          as="style"
        />
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" />
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
  return { ...(await Document.getInitialProps(ctx)) };
};
