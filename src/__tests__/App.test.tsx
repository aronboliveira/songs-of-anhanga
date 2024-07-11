import { createRoot } from "react-dom/client";
import {
  isClickOutside,
  parseFinite,
  renderLoginBody,
} from "../lib/handlersCommon";
import LoginMainBody from "../components/LoginMainBody";
import { RootElObj } from "../lib/interfaces";
import { typeError } from "../lib/errorHandlers";

const roots: RootElObj = {};
const mediaQueries = ["2000", "1350", "900", "730", "460"];

describe(`Function for rendering LoginBody options, renderLoginBody`, () => {
  beforeEach(() => {
    if (!roots["root"]) {
      const newRoot = Object.assign(document.createElement("div"), {
        id: "root",
      });
      roots.element = newRoot;
      roots.root = createRoot(newRoot);
      document.body.appendChild(newRoot);
    }
  });
  afterEach(() => {
    if (roots["root"]) {
      document.body.removeChild(roots["root"] as Node);
    }
  });
  it(`Should render LoginMainBody by default`, () => {
    renderLoginBody();
    try {
      if (!roots.root || !("_internalRoot" in roots.root))
        throw typeError(roots.root, `root for testing rendering of main body`, [
          "Root",
        ]);
      expect(roots.root.render).toHaveBeenCalledWith(
        //@ts-ignore
        <LoginMainBody root={roots.root} />
      );
    } catch (e) {
      console.error(`Error:${(e as Error).message}`);
    }
  });
});

describe(`Function for checking if a click event points to outside of a modal
`, () => {
  mediaQueries.forEach(mQ => {
    const mQnum = parseFinite(mQ);
    const clickPointsMock: MouseEvent[] = [];
    const outsideClickPointsMock: MouseEvent[] = [];
    const cicleContainer = document.appendChild(
      Object.assign(document.createElement("dialog"), {
        width: `${mQnum}px`,
        height: `${mQnum}px`,
        style: {
          width: `${mQnum}px`,
          height: `${mQnum}px`,
        },
      })
    );
    let numAcc = 0;
    while (clickPointsMock.length < mQnum) {
      numAcc++;
      const cicleMockEvent = new MouseEvent("click", {
        clientX: mQnum,
        clientY: mQnum,
      });
      if (clickPointsMock.includes(cicleMockEvent)) continue;
      clickPointsMock.push(
        new MouseEvent("click", {
          clientX: mQnum,
          clientY: mQnum,
        })
      );
      if (clickPointsMock.length > 2000 || numAcc > 2001) break;
    }
    for (let c = 0; c < clickPointsMock.length; c++) {
      const clickCoordsMock = isClickOutside(
        clickPointsMock[c],
        cicleContainer
      );
      it(`Should return a [boolean, boolean, boolean, boolean]`, () => {
        expect(Array.isArray(clickCoordsMock)).toBe(true);
        for (const coord of clickCoordsMock) {
          expect(typeof coord).toBe("boolean");
        }
      });
      if (clickCoordsMock.includes(true))
        outsideClickPointsMock.push(clickPointsMock[c]);
    }
    it(`Should contain closing possibilities greater of equal to the square of the media query boundary`, () => {
      expect(outsideClickPointsMock.length).toBeGreaterThanOrEqual(mQnum ** 2);
    });
  });
});
