import { ErrorBoundary } from "react-error-boundary";
import { Component, createRef } from "react";
import { convertToHex } from "../../../lib/handlers/handlersMath";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import LinkDlg from "../../anchoreds/LinkDlg";
import LinkSocialIcon from "../../anchoreds/LinkSocialIcon";
import { htmlElementNotFound } from "../../../lib/handlers/handlersErrors";
import { initFillAttrs } from "../../../lib/handlers/handlersCommon";
export default class FooterLandingPage extends Component {
  footerRef = createRef<HTMLDivElement>();
  componentDidMount() {
    try {
      if (
        !(
          this.footerRef.current instanceof HTMLElement &&
          this.footerRef.current.tagName === "FOOTER"
        )
      )
        throw htmlElementNotFound(
          this.footerRef.current,
          `validation of Footer Reference`,
          ["<footer>"]
        );
      initFillAttrs(`FooterMainPage`, this.footerRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for footerRef:\n${(e as Error).message}`
      );
    }
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
  }
  render() {
    return (
      <ErrorBoundary
        FallbackComponent={() => (
          <GenericErrorComponent message="Error rendering Footer" />
        )}
      >
        <div id="footerWrapper" ref={this.footerRef} className={`footer`}>
          <section id="fSectPolicy" className={`section`}>
            <span className={`p`}>
              Please read our
              <strong>
                <LinkDlg
                  innerTextL={`terms and conditions`}
                  href={"#"}
                  target={"_self"}
                  rel={"noopener noreferrer license nofollow"}
                  ComponentCase="terms"
                  color={`${convertToHex(`rgba(226, 221, 221, 0.61)`)}`}
                />
              </strong>
              clicking in the link.
            </span>
          </section>
          <section id="fSectSocial" className={`section fSectSocial`}>
            <nav id="fSectSocialMedia" className={`fSectSocialMedia`}>
              <p className={`p`}>
                <strong>SOCIAL MEDIA</strong>
              </p>
              <ul className={`ul`}>
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
              <ul className={`ul`}>
                <li>
                  <p className={`p`}>
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
              <ul className={`ul`}>
                <li>
                  <p className={`p`}>
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
        </div>
      </ErrorBoundary>
    );
  }
}
