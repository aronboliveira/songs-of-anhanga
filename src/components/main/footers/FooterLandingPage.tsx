import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useRef } from "react";
import { nullishFooter } from "src/lib/declarations/types";
import { htmlElementNotFound } from "src/lib/handlers/handlersErrors";
import { initFillAttrs } from "src/lib/handlers/handlersCommon";
import { convertToHex } from "src/lib/handlers/handlersMath";
import GenericErrorComponent from "../../errors/ErrorComponentGeneric";
import LinkDlg from "../../anchoreds/LinkDlg";
import LinkSocialIcon from "src/components/anchoreds/LinkSocialIcon";

export default function FooterLandingPage(): JSX.Element {
  const footerRef = useRef<nullishFooter>(null);
  useEffect(() => {
    try {
      if (
        !(
          footerRef.current instanceof HTMLElement &&
          footerRef.current.tagName === "FOOTER"
        )
      )
        throw htmlElementNotFound(
          footerRef.current,
          `validation of Footer Reference`,
          ["<footer>"]
        );
      initFillAttrs(`FooterMainPage`, footerRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for footerRef:\n${(e as Error).message}`
      );
    }
  }, []);
  useEffect(() => {
    if (!document.getElementById("modalRoot")) {
      try {
        const mainRoot = document.getElementById("root");
        if (!(mainRoot instanceof HTMLElement))
          throw htmlElementNotFound(
            mainRoot,
            `validation of mainRoot in Footer useEffect`
          );
        mainRoot.insertAdjacentElement(
          "afterend",
          Object.assign(document.createElement("div"), {
            id: `modalRoot`,
            width: "0",
            height: "0",
          })
        );
      } catch (e) {
        console.error(
          `Error executing useEffect for inserint modalRoot:${
            (e as Error).message
          }`
        );
      }
    }
  }, []);
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Error rendering Footer" />
      )}
    >
      <footer ref={footerRef}>
        <section id="fSectPolicy">
          <span className="p">
            Please read our{" "}
            <strong>
              <LinkDlg
                innerTextL={`terms and conditions`}
                href={"#"}
                target={"_self"}
                rel={"noopener noreferrer license nofollow"}
                ComponentCase="terms"
                color={`${convertToHex(`rgba(226, 221, 221, 0.61)`)}`}
              />
            </strong>{" "}
            clicking in the link.
          </span>
        </section>
        <section id="fSectSocial">
          <nav id="fSectSocialMedia">
            <p>
              <strong>SOCIAL MEDIA</strong>
            </p>
            <ul>
              <li>
                <LinkSocialIcon
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer nofollow external"
                  iconCase="discord"
                  innerTextL="discord"
                />
              </li>
              <li>
                <LinkSocialIcon
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer nofollow external"
                  iconCase="instagram"
                  innerTextL="instagram"
                />
              </li>
              <li>
                <LinkSocialIcon
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer nofollow external"
                  iconCase="facebook"
                  innerTextL="facebook"
                />
              </li>
              <li>
                <LinkSocialIcon
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer nofollow external"
                  iconCase="twitter"
                  innerTextL="twitterX"
                />
              </li>
            </ul>
          </nav>
          <nav id="fSectAbout">
            <ul>
              <li>
                <p>
                  <strong>ABOUT</strong>
                </p>
              </li>
              <li>
                <LinkDlg
                  innerTextL={`Know our members`}
                  href={"#"}
                  target={"_self"}
                  rel={"noopener noreferrer author"}
                  ComponentCase="authors"
                  color={`${convertToHex(`rgb(33, 37, 41)`)}`}
                />
              </li>
              <li>
                <LinkDlg
                  innerTextL={`Join us`}
                  href={"#"}
                  target={"_self"}
                  rel={"noopener noreferrer"}
                  ComponentCase="team"
                  color={`${convertToHex(`rgb(33, 37, 41)`)}`}
                />
              </li>
            </ul>
          </nav>
          <nav id="fSectSupport">
            <ul>
              <li>
                <p>
                  <strong>SUPPORT</strong>
                </p>
              </li>
              <li>
                <LinkDlg
                  innerTextL={`Contact us`}
                  href={"#"}
                  target={"_self"}
                  rel={"noopener noreferrer help"}
                  ComponentCase="contact"
                  color={`${convertToHex(`rgb(33, 37, 41)`)}`}
                />
              </li>
              <li>
                <LinkDlg
                  innerTextL={`Cookies`}
                  href={"#"}
                  target={"_self"}
                  rel={"noopener noreferrer"}
                  ComponentCase="cookies"
                  color={`${convertToHex(`rgb(33, 37, 41)`)}`}
                />
              </li>
            </ul>
          </nav>
        </section>
      </footer>
    </ErrorBoundary>
  );
}
