import { Component, createRef } from "react";
export default class HeaderLandingWatcher extends Component {
  r = createRef<HTMLSpanElement>();
  render(): JSX.Element {
    return (
      <span
        ref={this.r}
        id="headerLandingWatcher__callee"
        style={{ display: "none" }}
      ></span>
    );
  }
}
