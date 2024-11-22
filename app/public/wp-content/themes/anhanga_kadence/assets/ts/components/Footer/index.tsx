import ReactDOM from "react-dom";
import FooterLandingPage from "./FooterDefault";
addEventListener("DOMContentLoaded", () => {
  try {
    const footer = document.querySelector("footer");
    if (!footer) throw new Error(`Failed to locate the instance`);
    ReactDOM.render(<FooterLandingPage />, footer);
  } catch (e) {
    console.error(`Error rendering footer:\n${(e as Error).message}`);
  }
});
