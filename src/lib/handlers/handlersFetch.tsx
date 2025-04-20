import { documentData, gUser, roots } from "../controller";
import { FileProps, roUser } from "../declarations/interfaces";
import {
  ListError,
  fetchError,
  htmlElementNotFound,
  typeError,
} from "./handlersErrors";
import { createRoot } from "react-dom/client";
import CarouselComponent from "src/components/carousel/CarouselComponent";
import { voidishHtmlEl, voidishRoot } from "../declarations/types";

export async function fetchUserData(): Promise<roUser | undefined> {
  try {
    const res = await fetch(`/data/user.json`, { method: "GET" });
    if (!res.ok) throw fetchError(res);
    gUser.currentUser = await res.json();
    return gUser.currentUser;
  } catch (e) {
    console.error(`Error executing fetchUserData:\n${(e as Error).message}`);
  }
}

export async function fetchImagesDef(
  mainEl: voidishHtmlEl,
  mainId: string,
  root: voidishRoot
): Promise<JSX.Element> {
  try {
    // if (!(mainEl instanceof HTMLElement))
    //   throw htmlElementNotFound(mainEl, `validation of mainEl for fetchImages`);
    // if (typeof mainId !== "string")
    //   throw typeError(mainId, `validation of mainId in fetchImages`, [
    //     "string",
    //   ]);
    const res = await fetch(`/data/images.json`, { method: "GET" });
    if (!res.ok) throw fetchError(res);
    const parsedImages = await res.json();
    // @ts-ignore
    let campaigns: [string, Array<FileProps>] = Object.entries(
      parsedImages
    ).filter(
      subdir => subdir[0] === "campaigns" && subdir[1] instanceof Object
    )[0];
    console.log();
    if (campaigns.length < 1)
      throw ListError(
        campaigns,
        ["{[k: string]: string}"],
        `validating campaigns json`,
        ...campaigns
      );
    Object.values(campaigns)
      .filter(campaign => campaign[1] instanceof Object)
      .forEach(campaignNames => {
        let safeAcc = 0;
        //@ts-ignore
        while (!("extension" in campaignNames[0])) {
          //@ts-ignore
          campaignNames = Object.fromEntries(
            Object.entries(campaignNames).filter(
              campaign => campaign[1] instanceof Object
            )
          );
          safeAcc++;
          if (safeAcc > 999) break;
        }
        for (const campaignName of campaignNames) {
          if (!documentData.carouselImgs[mainId])
            documentData.carouselImgs[mainId] = [];
          documentData.carouselImgs[mainId]?.push(
            `${(campaignName as FileProps).name}${
              (campaignName as FileProps).extension
            }`
          );
          // console.log("CAROUSEL IMAGES");
          // console.log(documentData.carouselImgs[mainId]);
        }
      });
    documentData.carouselImgs[mainId] &&
      documentData.carouselImgs[mainId].length === 0 &&
      documentData.carouselImgs[mainId]?.push("");
    // !mainEl && console.warn("Error fetching main element");
    // if (mainEl && !roots[`${mainId}`]) roots[`${mainId}`] = createRoot(mainEl);
    // if (!document.querySelector(".carousel")) {
    // console.log(
    //   "!CAROUSEL: 1.2. REACHED RENDERING POINT THROUGH RENDER CAROUSEL"
    // );
    return (
      <CarouselComponent
        root={root}
        ParentComponentName="LoginMainBody"
        imgNames={documentData.carouselImgs[mainId]}
      />
    );
    // }
    // return <></>;
    // console.log("CAROUSEL IMAGES");
    // console.log(documentData.carouselImgs[mainId]);
  } catch (e) {
    console.error(
      `Error defining images for carousel: ${(e as Error).message}`
    );
    documentData.carouselImgs[mainId]?.push("");
    return <></>;
  }
}
