//@ts-ignore
import { registerBlockType } from "@wordpress/blocks";
//@ts-ignore
import { useBlockProps } from "@wordpress/block-editor";
import FooterLandingPage from "components/Footer/FooterDefault";
registerBlockType("anhanga_kadenceFooter", {
  title: "Default Footer",
  icon: "",
  category: "",
  attributes: {},
  edit: () => (
    <div {...useBlockProps}>
      <FooterLandingPage />
    </div>
  ),
  save: () => null,
});
