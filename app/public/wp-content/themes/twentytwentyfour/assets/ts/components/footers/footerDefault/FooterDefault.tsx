//@ts-ignore
import { registerBlockType } from "@wordpress/blocks";
//@ts-ignore
import { useBlockProps } from "@wordpress/block-editor";
import FooterLandingPage from "./component";
registerBlockType("anhanga/footer", {
  title: "Anhanga Footer",
  icon: "feedback",
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
    description: "Preview of the Anhanga Footer",
    innerBlocks: [],
  },
  edit: ({ attributes }: { attributes: { [k: string]: any } }) => {
    return attributes.preview ? (
      <figure>
        <img
          src="http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-g-knight-25.webp"
          alt="Groove Knight Image"
          decoding="async"
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </figure>
    ) : (
      <FooterLandingPage />
    );
  },
  save: () => null,
});
