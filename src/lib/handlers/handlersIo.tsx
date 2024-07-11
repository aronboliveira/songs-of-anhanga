import {
  entryEl,
  inputLikeEl,
  rMouseEvent,
  rSubmitEvent,
  scopeNode,
  voidishHtmlEl,
  voidishInpLikeEl,
} from "../declarations/types";
import {
  evTargNotFound,
  htmlElementNotFound,
  markWithCommentary,
  nodeNotFound,
  typeError,
} from "./handlersErrors";
import { checkScope } from "./handlersCommon";
import { capitalizeFirstLetter, highlightChange } from "./handlersStyles";
import { inpFillings } from "../declarations/interfaces";
import { voidishEl } from "../declarations/types";
import { documentData } from "../controller";

export function fetchEntries(
  scope: HTMLElement | Document = document
): Array<[string, string | boolean]> | Array<undefined> {
  try {
    scope = checkScope(scope, `validation for fetchEntires`);
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw new Error(`Invalid scope passed to fetchEntires`);
    const allEntries: Array<[string, string | boolean]> = [
      ...Array.from(scope.querySelectorAll("input")).map<
        [string, string | boolean | null]
      >(input => {
        if (input instanceof HTMLInputElement) {
          if (input.type === "checkbox" || input.type === "radio") {
            return [input.id || input.name, input.checked];
          } else if (
            input.type === "text" ||
            input.type === "email" ||
            input.type === "tel" ||
            input.type === "password" ||
            input.type === "number" ||
            input.type === "search" ||
            input.type === "date" ||
            input.type === "time" ||
            input.type === "week" ||
            input.type === "month"
          ) {
            return [input.id || input.name, input.value];
          } else return [input.id, null];
        } else return [(input as any).id, null];
      }),
      ...Array.from(document.getElementsByClassName("select")).map<
        [string, string | null]
      >(select =>
        select instanceof HTMLSelectElement
          ? [select.id || select.name, select.value]
          : [select.id, null]
      ),
      ...Array.from(document.getElementsByClassName("textarea")).map<
        [string, string | null]
      >(textarea =>
        textarea instanceof HTMLTextAreaElement
          ? [textarea.id || textarea.name, textarea.value]
          : [textarea.id, null]
      ),
    ].filter<[string, string | boolean]>(
      (
        entry: [string, string | boolean | null]
      ): entry is [string, string | boolean] => entry[1] !== null
    );
    return allEntries;
  } catch (e) {
    console.error(`Error executing fetchEntries:\n${(e as Error).message}`);
    return [];
  }
}

export async function submitFormData(form: voidishHtmlEl): Promise<number> {
  try {
    if (!(form instanceof HTMLFormElement))
      throw htmlElementNotFound(form, `Form argument for submitFormData`, [
        "HTMLFormElement",
      ]);
    const formData = new FormData(form);
    const res = await fetch("/PLACEHOLDER-SUBMIT", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) return res.status;
    const data = await res.json();
    console.log(data);
    return res.status;
  } catch (e) {
    console.error(`Error executing submitFormData:\n${(e as Error).message}`);
    return -1;
  }
}

export function linkLabelToEntry(
  label: voidishHtmlEl,
  cicle = "undefined",
  context = "No context"
): void {
  let elType = "Inp";
  try {
    if (!(label instanceof HTMLLabelElement))
      throw htmlElementNotFound(
        label,
        `Label for cicle ${cicle || `undefined`} of ${context || "No context"}`,
        ["HTMLLabelElement"]
      );
    const labelFor = label.htmlFor;
    let relEl: voidishEl = label.nextElementSibling;
    if (
      !(
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLSelectElement ||
        relEl instanceof HTMLTextAreaElement ||
        relEl instanceof HTMLOutputElement
      )
    )
      relEl = label.previousElementSibling;
    if (
      !(
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLSelectElement ||
        relEl instanceof HTMLTextAreaElement ||
        relEl instanceof HTMLOutputElement
      )
    )
      relEl =
        label.nextElementSibling?.querySelector("input") ||
        label.nextElementSibling?.querySelector("select") ||
        label.nextElementSibling?.querySelector("textarea") ||
        label.nextElementSibling?.querySelector("output");
    if (
      !(
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLSelectElement ||
        relEl instanceof HTMLTextAreaElement ||
        relEl instanceof HTMLOutputElement
      )
    )
      relEl =
        label.previousElementSibling?.querySelector("input") ||
        label.previousElementSibling?.querySelector("select") ||
        label.previousElementSibling?.querySelector("textarea") ||
        label.previousElementSibling?.querySelector("output");
    if (
      !(
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLSelectElement ||
        relEl instanceof HTMLTextAreaElement ||
        relEl instanceof HTMLOutputElement
      )
    )
      throw htmlElementNotFound(relEl, `HTMLElement related to ${label.id}`, [
        "HTMLInputElement",
        "HTMLSelectElement",
        "HTMLTextAreaElement",
      ]);
    if (relEl instanceof HTMLOutputElement) elType = "Outp";
    if (relEl.id === "") relEl.id = labelFor;
    if (relEl.id !== "" && relEl.id !== labelFor) label.htmlFor = relEl.id;
    if (
      relEl instanceof HTMLInputElement ||
      relEl instanceof HTMLTextAreaElement ||
      relEl instanceof HTMLSelectElement
    ) {
      if (/email/gi.test(label.htmlFor)) relEl.type === "email";
      try {
        if (
          relEl.classList.contains("form-select") ||
          relEl.classList.contains("form-control")
        )
          label.classList.add("form-label");
        if (
          label.classList.contains("form-label") &&
          !(
            relEl.classList.contains("form-control") ||
            relEl.classList.contains("form-select")
          )
        ) {
          relEl instanceof HTMLSelectElement
            ? relEl.classList.add("form-select")
            : relEl.classList.add("form-control");
        }
      } catch (eC) {
        markWithCommentary(label, `addition of BS classes`);
        console.error(
          `Error adding BS classes for ${label.htmlFor}:\n${
            (eC as Error).message
          }`
        );
      }
    }
    try {
      let relDiv = label.parentElement;
      if (
        label.parentElement &&
        !(
          relDiv instanceof HTMLDivElement ||
          relDiv instanceof HTMLFieldSetElement
        )
      )
        relDiv = label.parentElement.parentElement;
      if (!(relDiv instanceof HTMLElement))
        throw htmlElementNotFound(
          relDiv,
          `Related ancestral for ${label.htmlFor}`,
          ["HTMLElement"]
        );
      const relGrp = relEl.parentElement?.parentElement;
      if (!(relGrp instanceof HTMLElement))
        throw htmlElementNotFound(
          relGrp,
          `Group element related to ${label.htmlFor}`,
          ["HTMLElement"]
        );
      if (
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLTextAreaElement ||
        relEl instanceof HTMLSelectElement
      ) {
        const relFs = relDiv.closest("fieldset");
        if (!(relFs instanceof HTMLFieldSetElement) || relFs === relDiv)
          throw htmlElementNotFound(
            relFs,
            `Fieldset related to label ${label.htmlFor}`,
            ["HTMLElement"]
          );
        relFs.classList.add(
          `fs${label.htmlFor.slice(label.htmlFor.indexOf(elType))}`
        );
        if (relGrp === relFs) {
          console.warn(
            `Related group and Related Fieldset similar for ${label.htmlFor}. Aborting classification for group`
          );
          return;
        }
      }
      const grpClass = `grpDiv_${label.htmlFor.slice(
        label.htmlFor.indexOf(elType)
      )}`;
      relDiv.classList.add(
        `div${label.htmlFor.slice(label.htmlFor.indexOf(elType))}`
      );
      if (!relGrp.classList.contains(grpClass)) relGrp.classList.add(grpClass);
    } catch (eP) {
      markWithCommentary(label, `addition of classes for ancestral`);
      console.error(
        `Error applying className for ancestral of ${label.htmlFor}:\n${
          (eP as Error).message
        }`
      );
    }
    try {
      if (
        relEl instanceof HTMLInputElement ||
        relEl instanceof HTMLTextAreaElement
      ) {
        if (relEl.placeholder === "") {
          const checkText = () => {
            if (label.innerText !== "") {
              if (/confirm/gi.test(label.innerText)) {
                let iniPh = `Enter your ${label.innerText
                  .slice(0, 1)
                  .toLowerCase()}${label.innerText
                  .slice(1)
                  .toLowerCase()
                  .replace(/confirm\s?/gi, "")} again`;

                (relEl as HTMLInputElement).placeholder = iniPh.replace(
                  "confirm ",
                  ""
                );
              } else if (/bday/gi.test(label.innerText)) {
                label.innerText = label.innerText.replace(/Bday/gi, "Birthday");
              } else
                (
                  relEl as HTMLInputElement
                ).placeholder = `Enter your ${label.innerText
                  .slice(0, 1)
                  .toLowerCase()}${label.innerText.slice(1).toLowerCase()}`;
            }
          };
          setTimeout(() => {
            checkText();
          }, 100);
          setTimeout(() => {
            checkText();
          }, 100);
        }
        if (/name/gi.test(relEl.id)) {
          relEl.autocapitalize = "on";
          relEl.classList.add("autocorrect");
          if (/first/gi.test(relEl.id) || /given/gi.test(relEl.id))
            relEl.autocomplete = "given-name";
          else if (/family/gi.test(relEl.id)) {
            relEl.autocomplete = "family-name";
            relEl.classList.add("autocorrect-full");
          }
        } else if (/password/gi.test(relEl.id))
          relEl.autocomplete = "new-password";
        else if (/email/gi.test(relEl.id)) relEl.autocomplete = "email";
        else if (/username/gi.test(relEl.id)) relEl.autocomplete = "username";
        else if (/gender/gi.test(relEl.id)) {
          if (relEl instanceof HTMLSelectElement)
            relEl.title = `Please select your gender here`;
        } else if (/countryname/gi.test(relEl.id)) {
          if (relEl instanceof HTMLInputElement)
            relEl.classList.add("autocorrect", "autocorrect-full");
          else if (relEl instanceof HTMLSelectElement)
            relEl.title = `Please select your current country here`;
        } else if (/age/gi.test(relEl.id)) {
          relEl.required = true;
        }
        const insertTitle = () => {
          if (
            (relEl instanceof HTMLInputElement ||
              relEl instanceof HTMLTextAreaElement) &&
            relEl.placeholder !== ""
          ) {
            relEl.title = `Please ${relEl.placeholder.toLowerCase()} here`;
            if (/password/gi.test(relEl.id))
              relEl.title += `.\nThe password must contain a symbol, a number, and, in the case of romanic languages, an upper case and a lower case character.`;
            if (/(?<!user\s*)name/gi.test(relEl.id)) {
              relEl.title += `.\nThe name cannot contain non-alphanumeric symbols or numbers`;
              if (/first/gi.test(relEl.id) || /given/gi.test(relEl.id))
                relEl.title += `.\nThe name cannot contain white-space characters.`;
              else if (/family/gi.test(relEl.id))
                relEl.title = relEl.title
                  .replaceAll(/names(?=\()/g, "name")
                  .replaceAll("name ", "name(s) ");
            }
          }
        };
        setTimeout(() => {
          insertTitle();
        }, 300);
        setTimeout(() => {
          insertTitle();
        }, 700);
      }
    } catch (ePh) {
      markWithCommentary(relEl, `addition of placeholders`);
      console.error(
        `Error placing Placeholders for ${relEl.id}:${(ePh as Error).message}`
      );
    }
  } catch (eL) {
    markWithCommentary(label, `execution of linkLabelToEntry`);
    console.error(
      `Error executing cicle of linkLabelToEntry for Label:\n${
        (eL as Error).message
      }`
    );
  }
}

export function defineValidations(scope: scopeNode = document) {
  try {
    scope = checkScope(scope, `defineValidations`);
    if (!(scope instanceof HTMLElement || scope instanceof Document))
      throw nodeNotFound(scope, `validation of scope in defineValidations`, [
        "Document",
        "HTMLElement",
      ]);
    [
      ...scope.querySelectorAll("input"),
      ...scope.querySelectorAll("textarea"),
    ].forEach((inp, i) => {
      try {
        if (
          !(
            inp instanceof HTMLInputElement ||
            inp instanceof HTMLTextAreaElement
          )
        )
          throw htmlElementNotFound(
            inp,
            `input id ${(inp as any)?.id || "unidentified"} cicle ${i}`,
            ["HTMLInputElement", "HTMLTextAreaElement"]
          );
        let scopeIdf = "";
        scope instanceof HTMLElement
          ? (scopeIdf = scope.id || scope.classList.toString() || scope.tagName)
          : (scopeIdf = "documentElement");
        documentData.inpValidations.set(
          inp.id ||
            inp.name ||
            `brkInp${i}Nest${capitalizeFirstLetter(scopeIdf)}`,
          {
            inpId: inp.id,
            inpValue: inp.value,
            inpValidity: false,
            inpName: inp.name || "noName",
          }
        );
        if (/name/gi.test(inp.id)) {
          inp.minLength = 3;
          applyValidator(
            inp,
            /^[a-záàâãéèêíïóôõöúüçA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜÇ]{1,2}$/,
            /[0-9]+/g,
            /\s+/g,
            /[!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?~`]+/g
          );
          if (/first/gi.test(inp.id) || /given/gi.test(inp.id))
            inp.required = true;
        } else if (/password/gi.test(inp.id)) {
          inp.minLength = 8;
          inp.maxLength = 30;
          inp.required = true;
          //TODO INSERIR AVALIAÇÃO DE FORÇA DE SENHA
          applyValidator(
            inp,
            /^.{8,30}$/,
            /[a-záàâãéèêíïóôõöúüç]+/g,
            /[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜÇ]+/g,
            /[!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?~`]/g
          );
        } else if (/email/gi.test(inp.id)) {
          inp.minLength = 5;
          inp.maxLength = 50;
          applyValidator(inp, /^.{1,4}$/, /^.{50,}$/, /@/g, /\./g);
        } else if (/username/gi.test(inp.id)) {
          inp.minLength = 5;
          inp.maxLength = 30;
          inp.required = true;
          applyValidator(inp, /^\S+$/g);
        } else if (/age/gi.test(inp.id)) {
          inp.minLength = 1;
          inp.maxLength = 3;
          inp.required = true;
          if (inp.type === "number") {
            inp.setAttribute("max", "255");
            inp.setAttribute("min", "1");
          }
          applyValidator(inp, /[1-9]+/g);
        }
      } catch (eI) {
        markWithCommentary(
          inp,
          `cicle ${i} of inputs for ${scope?.nodeName || "undefined scope"}`
        );
        console.error(
          `Error executing iteration ${i} for cicles of inputs in defineValidations:\n${
            (eI as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing defineValidations for ${scope || "undefined scope"}:\n${
        (e as Error).message
      }`
    );
  }
}

export function applyValidator(inp: voidishInpLikeEl, ...validators: RegExp[]) {
  try {
    if (
      !(inp instanceof HTMLInputElement || inp instanceof HTMLTextAreaElement)
    )
      throw htmlElementNotFound(
        inp,
        `validating instance of input for applyValidator`,
        ["HTMLInputElement", "HTMLTextAreaElement"]
      );
    if (!validators.every(validator => validator instanceof RegExp))
      throw typeError(
        validators,
        `validation of validators argument in applyValidator for ${
          inp.id || inp.name || inp.tagName
        }`,
        ["RegExp[]"]
      );
    inp.dataset.validators = validators.toString();
    inp.addEventListener("input", ev => {
      try {
        if (
          !(
            (ev.currentTarget instanceof HTMLInputElement ||
              ev.currentTarget instanceof HTMLTextAreaElement) &&
            ev.currentTarget.dataset.validators
          )
        )
          throw evTargNotFound(ev.currentTarget, ev, [
            "HTMLInputElement",
            "HTMLTextAreaElement",
          ]);
        try {
          const arrStrValidators =
            ev.currentTarget.dataset.validators.split(",/");
          if (
            !(
              Array.isArray(arrStrValidators) &&
              arrStrValidators.every(validator => typeof validator === "string")
            )
          )
            throw typeError(
              arrStrValidators?.toString() || "undefined",
              `validating Array of String Validators`,
              ["string[]"]
            );
          const arrRegexValidators = arrStrValidators.map((validator, i) => {
            const stringFlags: string[] = [];
            [/\/gi/, /\/ig/, /\/g/, /\/i/].forEach(flag => {
              const stringFlag = flag
                .toString()
                .replaceAll("/", "")
                .replaceAll("\\", "");
              if (flag.test(validator)) {
                validator = validator.slice(0, validator.indexOf(stringFlag));
                stringFlags.push(stringFlag);
              }
            });
            return new RegExp(
              validator.replaceAll("/", "").replaceAll("\\", ""),
              stringFlags[i]
            );
          });
          const validations = arrRegexValidators.map(validator => {
            if (validator.test((ev.currentTarget as inputLikeEl).value))
              console.warn(`Capture invalid case by validator: ` + validator);
            return validator.test((ev.currentTarget as inputLikeEl).value);
          });
          if (validations.every(invalidation => invalidation === false)) {
            documentData.inpValidations.get(
              ev.currentTarget.id || ev.currentTarget.name
            )!.inpValidity = true;
          } else
            documentData.inpValidations.get(
              ev.currentTarget.id || ev.currentTarget.name
            )!.inpValidity = false;
          if (
            !documentData.inpValidations.get(
              ev.currentTarget.id || ev.currentTarget.name
            )?.inpValidity
          ) {
            console.warn(
              `Error validating value for ${
                ev.currentTarget.id || ev.currentTarget.name
              }`
            );
            //TODO CHAMAR STYLE DE ALERTA
          }
        } catch (eI) {
          markWithCommentary(inp, `checking validators in ${ev.type}`);
          console.error(`Error checking input :${(eI as Error).message}`);
        }
      } catch (e) {
        if (ev.currentTarget instanceof Node)
          markWithCommentary(
            ev.currentTarget,
            `calling callback for ${ev.type}`
          );
        console.error(
          `Error executing callbock for ${ev.type}:\n${(e as Error).message}`
        );
      }
    });
  } catch (e) {
    markWithCommentary(inp, `validation of arguments for applyValidator`);
    console.error(
      `Error executing applyValidationCheck:${(e as Error).message}`
    );
  }
}

export function evalSubmitForm(
  btn: voidishHtmlEl,
  ev: rMouseEvent | rSubmitEvent
): void {
  try {
    if (!(btn instanceof HTMLButtonElement))
      throw htmlElementNotFound(
        btn,
        `checking btn argument for evalSubmitForm`,
        ["HTMLButtonElement"]
      );
    if (!(ev instanceof Event || ev.constructor.name === "SyntheticBaseEvent"))
      throw typeError(
        ev,
        `checking ev argument for evalSubmitForm with ${btn.id || btn.name}`,
        ["Event"]
      );
    if (btn.type === "submit") ev.preventDefault();
    const relForm = btn.closest("form");
    if (!(relForm instanceof HTMLFormElement))
      throw htmlElementNotFound(
        relForm,
        `fetching closest form for button ${btn.id || btn.name}`,
        ["HTMLFormElement"]
      );
    const validations = [
      ...relForm.querySelectorAll("input"),
      ...relForm.querySelectorAll("textarea"),
      ...relForm.querySelectorAll("select"),
    ]
      .filter(entryEl => "validators" in entryEl.dataset)
      .map<[string, boolean]>(entryEl => {
        console.log("validators" in entryEl.dataset);
        const entryValidity = documentData.inpValidations.get(
          `${entryEl.id || entryEl.name}`
        )?.inpValidity;
        return entryValidity
          ? [entryEl.id || entryEl.name, entryValidity]
          : [entryEl.id || entryEl.name, false];
      });
    if (validations.every(validation => validation[1] === true)) {
      console.log("All entry elements were validated.");
      submitFormData(relForm);
    } else {
      for (let e = 0; e < validations.length; e++) {
        try {
          const relEl =
            document.getElementById(validations[e][0]) ||
            document.getElementsByName(validations[e][0])[0];
          if (!relEl || !relEl.parentElement) {
            console.warn(
              `Could not fetch entry el for cicle ${e} for validations in form ${
                relForm.id || relForm.name || "unidentified form"
              }`
            );
            continue;
          }
          if (
            !documentData.inpValidations.get(
              relEl.id || (relEl as entryEl).name
            )?.inpValidity ||
            ((relEl instanceof HTMLInputElement ||
              relEl instanceof HTMLTextAreaElement) &&
              relEl.validity.valid === false)
          ) {
            highlightChange(relEl);
            relEl.parentElement!.insertBefore(
              document.createComment(
                `invalidated during ${ev.timeStamp} submission`
              ),
              relEl
            );
          }
        } catch (eC) {
          console.error(
            `Error executing cicle ${e} for validations in form ${
              relForm.id || relForm.name || "unidentified form"
            }:${(eC as Error).message}`
          );
        }
      }
      console.warn(`Error checking validity of form entry elements.
		Obtained validities: ${JSON.stringify(validations)}`);
    }
  } catch (e) {
    markWithCommentary(btn, `checking instance for evalSubmitForm`);
    console.error(`Error executing evalSubmitForm:\n${(e as Error).message}`);
  }
}

export function evalInpsFill(
  scope: scopeNode = document,
  onlyReq: boolean = true
): inpFillings[] | void {
  try {
    scope = checkScope(scope);
    if (!(typeof onlyReq === "boolean"))
      throw typeError(
        onlyReq,
        `validation of onlyReq argument for evalInpsFill`,
        ["boolean"]
      );
    const inps: inputLikeEl[] = [];
    if (onlyReq) {
      scope
        .querySelectorAll("input[required]")
        .forEach(inp => inp instanceof HTMLInputElement && inps.push(inp));
      scope
        .querySelectorAll("textarea[required]")
        .forEach(ta => ta instanceof HTMLTextAreaElement && inps.push(ta));
    } else {
      scope
        .querySelectorAll("input")
        .forEach(inp => inp instanceof HTMLInputElement && inps.push(inp));
      scope
        .querySelectorAll("textarea")
        .forEach(ta => ta instanceof HTMLTextAreaElement && inps.push(ta));
    }
    return inps.map((inp, i) => {
      return inp.value.length > 0
        ? {
            idf: inp.id || inp.name || `brkInp${i}_${scope?.nodeType}`,
            filled: true,
          }
        : {
            idf: inp.id || inp.name || `brkInp${i}_${scope?.nodeType}`,
            filled: false,
          };
    });
  } catch (e) {
    console.error(`Error executing evalInpsFill:\n${(e as Error).message}`);
  }
}
