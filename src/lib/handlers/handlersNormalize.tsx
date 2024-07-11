import { stringError, typeError } from "./handlersErrors";
import { parseFinite } from "./handlersMath";
import { looseNum, numSets, scopeNode } from "../declarations/types";

export function normalizeReadText(
  text: string,
  cicle: string = "No cicle",
  context: string = "No context"
): string {
  let formatText = text;
  try {
    if (!(typeof text === "string"))
      throw typeError(text, `checking argument for normalizeReadText`, [
        "string",
      ]);
    formatText = `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
    const separatorMatches = formatText.matchAll(/-(?=[a-z])(?!bin)/g);
    //@ts-ignore
    for (const separator of separatorMatches) {
      const execMatch = /-(?=[a-z])(?!bin)/g.exec(formatText);
      if (execMatch) {
        const indx = execMatch.index;
        formatText = `${formatText.slice(0, indx + 1)}${formatText[
          indx + 1
        ].toUpperCase()}${formatText.slice(indx + 2)}`;
      }
    }
    formatText = formatText.replaceAll("_", " ").replaceAll(/-(?!bin)/gi, ", ");
    let safeAcc = 0;
    while (/[a-z][A-Z]/g.test(formatText)) {
      safeAcc++;
      let idx = /[a-z][A-Z]/g.exec(formatText)?.index ?? 0;
      if (idx) {
        idx = ++idx;
        formatText = `${formatText.slice(0, idx)} ${formatText.slice(idx)}`;
      }
      if (safeAcc > 100) break;
    }
    if (/familyname/gi.test(formatText.replaceAll(" ", "")))
      formatText += `(s)`;
    return formatText;
  } catch (e) {
    console.error(
      `Error executing normalizeReadText for cicle ${
        cicle || "undefined"
      } and context ${context || "undefined"}:${(e as Error).message}`
    );
  }
  return formatText;
}

export function normalizeNumber(
  num: looseNum,
  numCase: numSets = "natural"
): looseNum {
  try {
    if (!(typeof num === "number" || typeof num === "string"))
      throw typeError(num, "number argument for normalizeNumber", [
        "number",
        "string",
      ]);
    if (num !== "") {
      if (typeof num === "string") num = parseFinite(num, "int");
      if (!(typeof numCase === "string"))
        throw typeError(numCase, `numCase argument for normalizeNumber`, [
          "string",
        ]);
      if (
        !(
          numCase === "whole" ||
          numCase === "natural" ||
          numCase === "integer" ||
          numCase === "rational" ||
          numCase === "real"
        )
      )
        throw stringError(numCase, "any name for a set of numbers");
      switch (numCase) {
        case "whole":
          if (num < 1) num = 1;
          return num;
        case "natural":
          if (num < 0) num = 0;
          return num;
        case "integer":
          const initialNum = num;
          num = parseFinite(num.toFixed(1), "int", initialNum);
          return num;
        case "rational":
          return num;
        case "real":
          return num;
        default:
          throw stringError(numCase, "any name for a set of numbers");
      }
    } else return num;
  } catch (e) {
    console.error(`Error executing normalizeNumber:\n${(e as Error).message}`);
    return "1";
  }
}

export function normalizeSpacing(value: string): string {
  try {
    if (typeof value !== "string")
      throw typeError(
        normalizeSpacing,
        `validation of value argument for normalizeSpacing`,
        ["string"]
      );
    return value.replaceAll(",", "_").replaceAll(" ", "_");
  } catch (e) {
    console.error(`Error executing normalizeSpacing:\n${(e as Error).message}`);
    return value;
  }
}

export function adjustIdentifiers(scope: scopeNode = document): void {
  try {
    if (
      !(
        scope instanceof HTMLElement ||
        scope instanceof Document ||
        scope instanceof DocumentFragment
      )
    )
      throw new Error(`Invalid scope passed to adjustIdentifiers`);
    if (scope instanceof HTMLElement)
      [scope, ...scope.querySelectorAll("*")].forEach(el => {
        if (el.id !== "") {
          if (/\s/g.test(el.id)) el.id = normalizeSpacing(el.id);
          if (
            /^[0-9]/g.test(el.id) ||
            el.id.startsWith("+") ||
            el.id.startsWith("~") ||
            el.id.startsWith("-")
          )
            el.id = `_${el.id}`;
        }
        if (
          (el instanceof HTMLInputElement ||
            el instanceof HTMLButtonElement ||
            el instanceof HTMLFormElement) &&
          el.name !== ""
        ) {
          if (/\s/g.test(el.name)) el.name = normalizeSpacing(el.name);
          if (
            /^[0-9]/g.test(el.name) ||
            el.name.startsWith("+") ||
            el.name.startsWith("~") ||
            el.name.startsWith("-")
          )
            el.name = `_${el.name}`;
          el.classList.forEach(classListed => {
            if (/\s/g.test(classListed)) {
              const fixedClass = normalizeSpacing(classListed);
              el.classList.remove(fixedClass);
              el.classList.add(fixedClass);
            }
            if (
              /^[0-9]/g.test(classListed) ||
              classListed.startsWith("+") ||
              classListed.startsWith("~") ||
              classListed.startsWith("-")
            ) {
              const fixedClass = `_${classListed}`;
              el.classList.remove(classListed);
              el.classList.add(fixedClass);
            }
          });
        }
      });
    else
      scope.querySelectorAll("*").forEach(el => {
        if (el.id !== "") {
          if (/\s/g.test(el.id)) el.id = normalizeSpacing(el.id);
          if (
            /^[0-9]/g.test(el.id) ||
            el.id.startsWith("+") ||
            el.id.startsWith("~") ||
            el.id.startsWith("-")
          )
            el.id = `_${el.id}`;
        }
        if (
          (el instanceof HTMLInputElement ||
            el instanceof HTMLButtonElement ||
            el instanceof HTMLFormElement) &&
          el.name !== ""
        ) {
          if (/\s/g.test(el.name)) el.name = normalizeSpacing(el.name);
          if (
            /^[0-9]/g.test(el.name) ||
            el.name.startsWith("+") ||
            el.name.startsWith("~") ||
            el.name.startsWith("-")
          )
            el.name = `_${el.name}`;
          el.classList.forEach(classListed => {
            if (/\s/g.test(classListed)) {
              const fixedClass = normalizeSpacing(classListed);
              el.classList.remove(fixedClass);
              el.classList.add(fixedClass);
            }
            if (
              /^[0-9]/g.test(classListed) ||
              classListed.startsWith("+") ||
              classListed.startsWith("~") ||
              classListed.startsWith("-")
            ) {
              const fixedClass = `_${classListed}`;
              el.classList.remove(classListed);
              el.classList.add(fixedClass);
            }
          });
        }
      });
  } catch (e) {
    console.error(
      `Error executing adjustIdentifiers:\n${(e as Error).message}`
    );
  }
}
