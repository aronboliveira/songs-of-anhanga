import { Component, createRef } from "react";
import {
  initFillAttrs,
  syncAriaStates,
} from "../../../lib/handlers/handlersCommon";
import { LinkDlgProps } from "lib/declarations/interfaces";
import { capitalizeFirstLetter } from "lib/handlers/handlersStyles";
export default class FooterWatcher extends Component<
  Partial<
    Omit<LinkDlgProps, "innerTextL"> & { innerTextLs?: { [k: string]: string } }
  >
> {
  r = createRef<HTMLSpanElement>();
  componentDidMount(): void {
    const footer =
      document.getElementById("footer") ?? document.querySelector("footer");
    if (!footer) return;
    initFillAttrs(`FooterMainPage`, footer);
    if (document.getElementById("modalRoot")) return;
    footer.insertAdjacentElement(
      "afterend",
      Object.assign(document.createElement("div"), {
        id: `modalRoot`,
        width: "0",
        height: "0",
      })
    );
    if (!footer) return;
    (() => {
      if (this.props.color) {
        if (!this.r.current) return;
        const p = this.r.current.closest("footer");
        if (!p) return;
        for (const l of p.querySelectorAll(".linkDlg")) {
          if (!(l instanceof HTMLElement)) continue;
          if (!l.dataset.preventing || l.dataset.preventing !== "true")
            l.addEventListener("click", (ev) => ev.preventDefault());
          l.style.color = this.props.color || l.style.color;
          const a = p.querySelector(
            `#anchor${capitalizeFirstLetter(l.innerText)}`
          );
          if (!a) continue;
          initFillAttrs(`${capitalizeFirstLetter(l.innerText)}`, l);
        }
      }
    })();
    syncAriaStates(footer);
  }
  render(): JSX.Element {
    return (
      <span
        id="footerWatcher__callee"
        ref={this.r}
        style={{ display: "none" }}
      ></span>
    );
  }
}
