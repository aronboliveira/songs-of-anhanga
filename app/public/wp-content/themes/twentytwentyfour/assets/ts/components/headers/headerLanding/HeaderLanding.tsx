//@ts-ignore
import { registerBlockType } from "@wordpress/blocks";
//@ts-ignore
import { useBlockProps } from "@wordpress/block-editor";
import HeaderLanding from "./component";
registerBlockType("anhanga/header", {
  title: "Landing Header",
  icon: "archive",
  category: "anhanga_custom",
  attributes: {
    preview: {
      type: "boolean",
      default: false,
    },
  },
  example: {
    attributes: {
      preview: true,
    },
    description: "Preview of the Anhanga Header for landing",
    innerBlocks: [],
  },
  edit: ({ attributes }: { attributes: { [k: string]: any } }) => {
    return attributes.preview ? (
      <figure>
        <img
          src="http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-monk-42.webp"
          alt="Monk image"
          loading="lazy"
          decoding="async"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        ></img>
      </figure>
    ) : (
      <HeaderLanding />
    );
  },
});
