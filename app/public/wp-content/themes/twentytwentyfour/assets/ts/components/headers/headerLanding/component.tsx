import { Component, createRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../components/errors/GenericErrorComponent";
import LogoMain from "../../../components/icon/logos/LogoMain";
export default class HeaderLanding extends Component {
  mainNavRef = createRef<HTMLElement>();
  render() {
    return (
      <ErrorBoundary
        FallbackComponent={() => (
          <GenericErrorComponent message="Error rendering header" />
        )}
      >
        <LogoMain logoCase="spread" />
        <div className="headerBtns">
          <nav id="mainNav" ref={this.mainNavRef}>
            <div className="App">
              <nav className="App-body">
                <section>
                  <button
                    className="btn-primary"
                    id="btnChars"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Characters
                  </button>
                  <button
                    className="btn-primary"
                    id="btnClasses"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Classes
                  </button>
                  <button
                    className="btn-primary"
                    id="btnDlgRaces"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Races
                  </button>
                  <button
                    className="btn-primary"
                    id="btnCreat"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Creatures
                  </button>
                </section>
                <section className="singleBtnSect">
                  <button
                    className="btn-primary"
                    id="btnStart"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Login
                  </button>
                </section>
              </nav>
            </div>
          </nav>
        </div>
      </ErrorBoundary>
    );
  }
}
