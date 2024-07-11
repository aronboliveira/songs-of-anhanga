import { ListError } from "./handlers/handlersErrors";
import { fetchEntries } from "./handlers/handlersIo";

export function addFormListeners(
  argsforms?:
    | NodeListOf<HTMLFormElement>
    | HTMLCollectionOf<HTMLFormElement>
    | HTMLFormElement[]
    | undefined
): HTMLCollectionOf<Element> | undefined {
  let forms;
  if (!argsforms) forms = document.getElementsByTagName("form");
  const validatedIterations: boolean[] = [];
  try {
    if (
      (forms instanceof HTMLCollection ||
        forms instanceof NodeList ||
        Array.isArray(forms)) &&
      forms.length > 0 &&
      Array.from(forms).every(form => form instanceof HTMLFormElement)
    ) {
      for (const form of forms) {
        console.log(
          `form id ${
            form.id ?? "NÃO IDENTIFICADO"
          } validado. Adicionando listener de submissão.`
        );
        form.addEventListener("submit", (ev: SubmitEvent) => {
          console.log("FORM SUBMETIDO!");
          const allEntries = fetchEntries(ev.currentTarget as HTMLElement);
          const formData = new FormData();
          for (const entries of allEntries) {
            if (
              entries &&
              (typeof entries[1] === "string" ||
                typeof entries[1] === "boolean")
            ) {
              formData.append(entries[0], entries[1].toString());
            } else console.warn(`formData entry invalidated`);
          }
          (async (formData: FormData) => {
            try {
              const res = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                body: formData,
              });
              if (!res.ok)
                throw new Error(`Error fetching form data to server!`);
              else return await res.json();
            } catch (err) {
              console.error((err as Error).message);
            }
          })(formData).then((result: Promise<{ [key: string]: string }>) => {
            console.log(result ?? "No Result for fetch");
            validatedIterations.push(true);
          });
        });
      }
    } else throw ListError(forms, [..."form"], "fetching forms from DOM");
  } catch (err) {
    console.error((err as Error).message);
  }
  return forms;
}
