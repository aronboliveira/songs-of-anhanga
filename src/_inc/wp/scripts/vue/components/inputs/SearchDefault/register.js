import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import "./style.scss";

registerBlockType("custom/class-search", {
  edit: Edit,
  save: () => null, // render via PHP + Vue
});
