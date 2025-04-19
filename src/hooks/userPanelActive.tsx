import { useEffect, useRef } from "react";
import { initProvid, syncAriaStates } from "src/lib/handlers/handlersCommon";
import { fetchUserData } from "src/lib/handlers/handlersFetch";
import { nullishNav } from "../lib/declarations/types";
import {
  htmlElementNotFound,
  markWithCommentary,
  typeError,
} from "src/lib/handlers/handlersErrors";
import { gUser } from "src/lib/controller";
import { capitalizeFirstLetter } from "src/lib/handlers/handlersStyles";
import { linkLabelToEntry } from "src/lib/handlers/handlersIo";
import {
  formatForBst,
  formatForSelectors,
} from "src/lib/handlers/handlersFormatFill";
import { RoutedProps } from "src/lib/declarations/interfaces";
import { useRouter } from "next/navigation";

export default function ActiveUserPanel({ router }: RoutedProps): JSX.Element {
  router ??= useRouter();
  const mainRef = useRef<nullishNav>(null);
  useEffect(() => {
    try {
      fetchUserData()
        .then(() => {
          mainRef.current!.querySelectorAll("output").forEach((outp, i) => {
            try {
              if (!(outp instanceof HTMLElement))
                throw htmlElementNotFound(
                  outp,
                  `Output iteration ${i} id ${
                    (outp as any)?.id || "unidentified"
                  } for posting user data`,
                  ["HTMLElement"]
                );
              if (!gUser.currentUser)
                throw typeError(
                  gUser.currentUser,
                  `validating currentUser for output iteration ${i} id ${
                    (outp as any)?.id || "unidentified"
                  }`,
                  ["object"]
                );
              const idf = outp.id;
              if (/name/gi.test(idf))
                //@ts-ignore
                outp.innerText = `${gUser.currentUser.name}`;
              if (/class/gi.test(idf))
                outp.innerText = `${capitalizeFirstLetter(
                  //@ts-ignore
                  gUser.currentUser.class
                )}`;
              if (/email/gi.test(idf))
                //@ts-ignore
                outp.innerText = `${gUser.currentUser.email}`;
            } catch (e) {
              console.error(`Error:${(e as Error).message}`);
            }
          });
        })
        .catch((err: Error) => console.error(err));
    } catch (e) {
      console.error(`Error fetching currentUser:${(e as Error).message}`);
    }
    try {
      if (!(mainRef.current instanceof HTMLElement))
        htmlElementNotFound(
          mainRef.current,
          `Main reference for ${ActiveUserPanel.prototype.constructor.name}`,
          ["HTMLElement"]
        );
      setTimeout(() => {
        mainRef.current!.querySelectorAll("section").forEach((sect, i) => {
          try {
            if (!(sect instanceof HTMLElement && sect.tagName === "SECTION"))
              throw htmlElementNotFound(
                sect,
                `Section cicle ${i} for New user form`,
                ["HTMLElement"]
              );
            sect.classList.add(`sectsActiveUser`, `flexJBt`);
            if (
              (sect.querySelector("h1") || sect.querySelector("h2")) &&
              !mainRef.current!.querySelector("#hActiveUser")
            ) {
              sect.id = `hActiveUser`;
              [
                ...sect.querySelectorAll("h1"),
                ...sect.querySelectorAll("h2"),
              ].forEach(hd => {
                hd.classList.add(`titleActiveUser`);
                hd.querySelectorAll("*").forEach(textEl => {
                  textEl.classList.add(`textElActiveUser`);
                });
              });
            } else if (!mainRef.current!.querySelector("#bActiveUser")) {
              sect.id = `bActiveUser`;
            } else if (
              sect.querySelector("output") &&
              !mainRef.current!.querySelector("#panelActiveUser")
            ) {
              sect.id = `panelActiveUser`;
            } else sect.id = `sect${i}ActiveUser`;
          } catch (eS) {
            console.error(
              `Error executing routine for sections classification:\n${
                (eS as Error).message
              }`
            );
          }
        });
      }, 50);
      mainRef.current!.querySelectorAll("label").forEach((lab, i) => {
        linkLabelToEntry(
          lab,
          i.toString(),
          `Validating label for Main reference of ${ActiveUserPanel.prototype.constructor.name}`
        );
      });
      formatForBst(mainRef.current, /outpuser/gi, ActiveUserPanel);
      formatForSelectors(mainRef.current);
      syncAriaStates(mainRef.current);
      initProvid(mainRef.current);
    } catch (e) {
      markWithCommentary(mainRef.current, `validation of Main Reference`);
      console.error(
        `Error executing useEffect for Main Reference:\n${(e as Error).message}`
      );
    }
  }, [mainRef]);
  return (
    <article id="activeUserPanel" className={`screenPanel`} ref={mainRef}>
      <section>
        <h1>
          <strong>User Panel</strong>
        </h1>
      </section>
      <section>
        <section>
          <div>
            <label htmlFor={`nameOutpUser`}></label>
            <output></output>
          </div>
          <div>
            <label htmlFor={`classOutpUser`}></label>
            <output></output>
          </div>
          <div>
            <label htmlFor={`emailOutpUser`}></label>
            <output></output>
          </div>
        </section>
      </section>
      <section>
        <button
          type="button"
          id="returnBtn"
          className="btn-primary"
          onClick={() => {
            try {
              console.log(router);
              router?.push("/");
            } catch (e) {
              console.error(
                `Error executing procedure for routing:\n${
                  (e as Error).message
                }`
              );
            }
          }}
        >
          Return to Main Page
        </button>
      </section>
    </article>
  );
}
