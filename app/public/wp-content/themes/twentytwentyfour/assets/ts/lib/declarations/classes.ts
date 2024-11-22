import { imgFormats } from "../../controller";
import { FigureCharsProps, roUser } from "./interfaces";
import { validImgExntesions } from "./types";

export class FigureData implements Omit<FigureCharsProps, "router"> {
  #mainPart: string;
  #extension: validImgExntesions;
  #prefix: string | undefined;
  constructor({
    mainPart: _mainPart,
    extension: _extension,
    prefix: _prefix,
  }: FigureCharsProps) {
    if (_prefix) this.#prefix = _prefix;
    this.#mainPart = _mainPart;
    this.#extension = imgFormats.has(_extension)
      ? _extension
      : "invalidExtension";
  }
  get mainPart(): string {
    return this.#mainPart;
  }
  get extension(): validImgExntesions {
    return this.#extension;
  }
  getPrefix(): string | void {
    return this.#prefix ? this.#prefix : console.warn(`No prefix for Figure`);
  }
  setExtension(newExtension: validImgExntesions): void {
    if (imgFormats.has(newExtension)) this.#extension = newExtension;
    else console.warn(`Argued extension value invalid. Set denied.`);
  }
}

export class User implements roUser {
  readonly #userClass: string;
  readonly #userName: string;
  readonly #userEmail: string;
  constructor(_userClass: string, _userName: string, _userEmail?: string) {
    this.#userClass = _userClass;
    this.#userName = _userName;
    this.#userEmail = _userEmail || "Não preenchido";
  }
  get userClass(): string {
    return this.#userClass;
  }
  get userName(): string {
    return this.#userName;
  }
  get userEmail(): string {
    return this.#userEmail;
  }
}

export class UniqueMap extends Map {
  set(key: any, value: any) {
    try {
      if (this.has(key)) {
        if (Number.isNaN(key)) {
          if (typeof key === "object" && key[key]) {
            super.set(key, value);
          } else throw new Error(`Self-references are not qualified.`);
        } else throw new Error(`NaN values are not qualified.`);
      } else throw new Error(`Map already has specified key.`);
    } catch (err) {
      console.error(
        `Error adding entry to UniqueMap: ${(err as Error).message}`
      );
    }
    return this;
  }
}

export class DataProvider {
  #sessionDataState: { [key: string]: any };
  constructor(_dataSessionState: { [key: string]: any }) {
    this.#sessionDataState = _dataSessionState;
    window.addEventListener("beforeunload", () => {
      this.#sessionDataState = {};
      ["loginDlg", "regstNewUser"].forEach((form) => {
        sessionStorage.getItem(form) && sessionStorage.setItem(form, "");
      });
    });
  }
  initPersist(element: HTMLElement, componentProvider: DataProvider) {
    setTimeout(() => {
      if (sessionStorage[element!.id]) {
        componentProvider.parseSessionStorage(element!, element!.id);
      } else
        setTimeout(() => {
          if (sessionStorage[element!.id]) {
            componentProvider.parseSessionStorage(element!, element!.id);
          }
        }, 300);
    }, 100);
    const storageTimeout = setTimeout(() => {
      if (!(document.getElementById(`${element.id}`) || !element))
        clearTimeout(storageTimeout);
      const storageInterval = setInterval(() => {
        DataProvider.checkForm(element.id, storageInterval);
        componentProvider.cicleSessionStorage(element!);
      }, 1_000);
      componentProvider.cicleSessionStorage(element!);
    }, 500);
  }
  async cicleSessionStorage(
    scope: HTMLElement | Document = document
  ): Promise<{ [key: string]: string }> {
    this.#sessionDataState = await DataProvider.persistSessionEntries(scope);
    if (scope instanceof HTMLElement)
      sessionStorage.setItem(
        `${scope.id}`,
        JSON.stringify(this.#sessionDataState)
      );
    return this.#sessionDataState;
  }
  static async persistSessionEntries(
    scope: HTMLElement | Document = document
  ): Promise<{ [key: string]: string }> {
    const persisters = [
      ...scope.querySelectorAll(".ssPersist"),
      ...scope.querySelectorAll(".lcPersist"),
    ];
    const sessionData: { [key: string]: string } = {};
    for (const persister of persisters) {
      if (
        (persister instanceof HTMLInputElement &&
          !(
            persister.type === "radio" ||
            persister.type === "checkbox" ||
            persister.type === "button" ||
            persister.type === "reset" ||
            persister.type === "submit"
          )) ||
        persister instanceof HTMLTextAreaElement ||
        persister instanceof HTMLSelectElement
      )
        sessionData[`${persister.id || persister.name}`] = persister.value;
      else if (
        persister instanceof HTMLInputElement &&
        (persister.type === "radio" || persister.type === "checkbox")
      )
        sessionData[`${persister.id || persister.name}`] =
          persister.checked.toString();
      else if (persister instanceof HTMLElement)
        sessionData[
          `${
            persister.id ||
            (persister instanceof HTMLSlotElement && persister.name)
          }`
        ] = persister.innerHTML;
    }
    return sessionData;
  }
  async parseSessionStorage(
    scope: HTMLElement | Document = document,
    scopeRef: string
  ): Promise<void> {
    const persisters =
      sessionStorage.getItem(scopeRef) ||
      JSON.stringify(this.#sessionDataState);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach((entry) => {
        if (entry[0]) {
          const fetchedEl =
            scope.querySelector(`#${entry[0]}`) ||
            document.querySelector(`#${entry[0]}`);
          if (
            (fetchedEl instanceof HTMLInputElement &&
              !(
                fetchedEl.type === "radio" ||
                fetchedEl.type === "checkbox" ||
                fetchedEl.type === "button" ||
                fetchedEl.type === "reset" ||
                fetchedEl.type === "submit"
              )) ||
            fetchedEl instanceof HTMLTextAreaElement ||
            fetchedEl instanceof HTMLSelectElement
          ) {
            fetchedEl.value = entry[1] as string;
          } else if (
            fetchedEl instanceof HTMLInputElement &&
            (fetchedEl.type === "radio" || fetchedEl.type === "checkbox")
          ) {
            entry[1] === "true" || entry[1] === true
              ? (fetchedEl.checked = true)
              : (fetchedEl.checked = false);
          } else if (fetchedEl instanceof HTMLElement) {
            fetchedEl.innerHTML = entry[1] as string;
          }
        }
      });
    }
  }
  static initStorageParsing(
    scope: HTMLElement | Document = document,
    scopeRef: string
  ) {
    const persisters = sessionStorage.getItem(scopeRef);
    if (persisters) {
      Object.entries(JSON.parse(persisters)).forEach((entry) => {
        const fetchedEl =
          scope.querySelector(`#${entry[0]}`) ||
          document.querySelector(`#${entry[0]}`);
        if (
          (fetchedEl instanceof HTMLInputElement &&
            !(
              fetchedEl.type === "radio" ||
              fetchedEl.type === "checkbox" ||
              fetchedEl.type === "button" ||
              fetchedEl.type === "reset" ||
              fetchedEl.type === "submit"
            )) ||
          fetchedEl instanceof HTMLTextAreaElement ||
          fetchedEl instanceof HTMLSelectElement
        ) {
          fetchedEl.value = entry[1] as string;
        } else if (
          fetchedEl instanceof HTMLInputElement &&
          (fetchedEl.type === "radio" || fetchedEl.type === "checkbox")
        ) {
          entry[1] === "true" || entry[1] === true
            ? (fetchedEl.checked = true)
            : (fetchedEl.checked = false);
        } else if (fetchedEl instanceof HTMLElement) {
          fetchedEl.innerHTML = entry[1] as string;
        }
      });
    }
  }
  static checkForm(elementId: string, storageInterval?: NodeJS.Timer): boolean {
    if (!document.getElementById(elementId) || !elementId) {
      console.warn(`Persistência em sessão cílica interrompida`);
      console.log(`id do elemento: ${elementId || "UNIDENTIFIED"}`);
      console.dir(document.getElementById(elementId));
      storageInterval && clearInterval(storageInterval as any);
      return false;
    }
    return true;
  }
}
