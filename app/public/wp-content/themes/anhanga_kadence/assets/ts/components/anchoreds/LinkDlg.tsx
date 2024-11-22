import { Component, createRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { capitalizeFirstLetter } from "../../lib/handlers/handlersStyles";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { LinkDlgProps } from "../../lib/declarations/interfaces";
import { initFillAttrs } from "../../lib/handlers/handlersCommon";
import { htmlElementNotFound } from "../../lib/handlers/handlersErrors";
export default class LinkDlg extends Component<LinkDlgProps> {
  aRef = createRef<HTMLAnchorElement>();
  componentDidMount() {
    try {
      if (!(this.aRef.current instanceof HTMLAnchorElement)) {
        throw htmlElementNotFound(
          this.aRef.current,
          `validation of Anchor reference`,
          ["HTMLAnchorElement"]
        );
      }
      if (this.props.color) this.aRef.current.style.color = this.props.color;
      initFillAttrs(
        `${capitalizeFirstLetter(this.props.innerTextL)}`,
        this.aRef.current
      );
    } catch (e) {
      console.error(
        `Error executing useEffect for aRef in ${
          LinkDlg.prototype.constructor.name
        } for case ${this.props.ComponentCase}: ${(e as Error).message}`
      );
    }
  }
  handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
  };
  render() {
    const { innerTextL, href, target, rel } = this.props;
    return (
      <ErrorBoundary
        FallbackComponent={() => (
          <GenericErrorComponent message={`Error loading Link`} />
        )}
      >
        <a
          ref={this.aRef}
          id={`anchor${capitalizeFirstLetter(innerTextL)}`}
          className="highlight"
          href={`${href}`}
          target={`${target}`}
          rel={`${rel}`}
          title={`Click here to check ${innerTextL
            .toLowerCase()
            .replace("know ", "")
            .replace(" us", "")
            .replace("join", "how to join")
            .replace("cookies", "applied cookies")
            .replace("contact", "how to contact")}`}
          onClick={this.handleClick}
        >{`${innerTextL}`}</a>
      </ErrorBoundary>
    );
  }
}
