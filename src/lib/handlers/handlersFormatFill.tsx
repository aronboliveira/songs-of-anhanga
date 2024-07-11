import { voidishHtmlEl } from "../declarations/types";
import {
  ListError,
  elementNotFound,
  htmlElementNotFound,
  markWithCommentary,
  typeError,
} from "./handlersErrors";
import { checkScope } from "./handlersCommon";
import { parseFinite } from "./handlersMath";
import { linkLabelToEntry } from "./handlersIo";
import { normalizeReadText } from "./handlersNormalize";
import { capitalizeFirstLetter } from "./handlersStyles";
import { listableEl, nullishHTMLEl } from "../declarations/types";
import { documentData } from "../controller";

export function fillFiguresData(
  figure: nullishHTMLEl,
  simplifyCapt: boolean = false
): void {
  try {
    if (!(figure instanceof HTMLElement))
      throw htmlElementNotFound(figure, `Figure element`, ["HTMLElement"]);
    if (!(typeof simplifyCapt === "boolean"))
      throw typeError(
        simplifyCapt,
        `validation of simplifyCapt for fillFiguresData`,
        ["boolean"]
      );
    const img = figure.querySelector("img");
    if (!(img instanceof HTMLImageElement))
      throw htmlElementNotFound(img, `validating image for char figure`, [
        "HTMLImageElement",
      ]);
    // @ts-ignore
    if (String.prototype.replaceAll) {
      figure.id = figure.id.replaceAll(/unfilled/gi, img.id);
    } else {
      console.warn(
        `The used navigator does not provide support for ES2020+. That might result in wrongly constructed figures ids.`
      );
      figure.id = figure.id.replace("unfilled", img.id);
    }
    const caption = figure.querySelector("figcaption");
    if (!(caption instanceof HTMLElement && caption.tagName === "FIGCAPTION"))
      throw htmlElementNotFound(
        caption,
        "validating figure caption for char figure",
        ["<figcaption>"]
      );
    // @ts-ignore
    if (String.prototype.replaceAll) {
      caption.id = caption.id.replaceAll(/unfilled/gi, img.id);
    } else {
      console.warn(
        `The used navigator does not provide support for ES2020+. That might result in wrongly constructed figcaption ids.`
      );
      caption.id = caption.id.replace("unfilled", img.id);
    }
    caption.innerText = `${img.id.slice(0, 1).toUpperCase()}${img.id.slice(1)}`;
    caption.innerText = caption.innerText
      .replace(/-[0-9]+/g, "")
      .replace(/generic-/gi, "")
      .replaceAll("-", " ");
    caption.innerText = `${caption.innerText
      .slice(0, 1)
      .toUpperCase()}${caption.innerText.slice(1)}`;
    // @ts-ignore
    if (String.prototype.matchAll) {
      Array.from(img.id.slice(1).matchAll(/[A-Z]/g)).forEach((match, i) => {
        if (
          match instanceof Object &&
          "index" in match &&
          typeof match.index === "number"
        ) {
          caption.innerText = `${caption.innerText.slice(0, 1)}${img.id.slice(
            1,
            match.index + 1
          )} ${img.id.slice(match.index + 1)}`;
        } else
          console.warn(`RegExpMatchArray index ${i} not validated for constructing innerText
						of the <figcaption> id ${figure.id}`);
      });
    } else {
      console.warn(
        `The used navigator does not provide support for ES2020+. That might result in wrongly constructed texts.`
      );
      const match = /[A-Z]/g.exec(img.id);
      if (
        match instanceof Object &&
        "index" in match &&
        typeof match.index === "number"
      ) {
        caption.innerText = `${img.id.slice(0, match.index + 1)} ${img.id.slice(
          match.index + 1
        )}`;
      } else
        console.warn(
          `RegExpExecArray not validated for constructing innerText
							Obtained instance: ${match?.constructor.name ?? "nullish"};
							Presence of .index: ${match && "index" in match}
							Type of match.index: ${typeof match?.index === "number"}`
        );
    }
    if (simplifyCapt) {
      if (
        capitalizeFirstLetter(
          caption.innerText.slice(caption.innerText.lastIndexOf(" ")).trim()
        ).length > 3
      ) {
        caption.innerText = capitalizeFirstLetter(
          caption.innerText.slice(caption.innerText.lastIndexOf(" ")).trim()
        );
      } else {
        caption.innerText = capitalizeFirstLetter(caption.innerText.trim());
      }
    }
    const imgRect = img.getBoundingClientRect();
    caption.style.top = `${
      Math.abs(imgRect.y * 1.1 + 2 * imgRect.height) * 0.92
    }px`;
    try {
      const relCanvas = figure.querySelector("canvas");
      if (!(relCanvas instanceof HTMLCanvasElement))
        htmlElementNotFound(
          relCanvas,
          `instance validation for ${figure.id || "unidentified figure"}`,
          ["HTMLCanvasElement"]
        );
      if (getComputedStyle(img).boxSizing === "border-box") {
        relCanvas!.style.width = `${
          (img.offsetWidth -
            (parseFinite(getComputedStyle(img).paddingLeft) +
              parseFinite(getComputedStyle(img).paddingRight)) *
              2) /
          documentData.rem
        }rem`;
        relCanvas!.style.height = `${
          (img.offsetHeight -
            (parseFinite(getComputedStyle(img).paddingTop) +
              parseFinite(getComputedStyle(img).paddingBottom)) *
              2) /
          documentData.rem
        }rem`;
        window.addEventListener("resize", () => {
          relCanvas!.style.width = `${
            (img.offsetWidth -
              (parseFinite(getComputedStyle(img).paddingLeft) +
                parseFinite(getComputedStyle(img).paddingRight)) *
                2) /
            documentData.rem
          }rem`;
          relCanvas!.style.height = `${
            (img.offsetHeight -
              (parseFinite(getComputedStyle(img).paddingTop) +
                parseFinite(getComputedStyle(img).paddingBottom)) *
                2) /
            documentData.rem
          }rem`;
        });
      } else {
        relCanvas!.style.width = getComputedStyle(img).width;
        relCanvas!.style.height = getComputedStyle(img).height;
        window.addEventListener("resize", () => {
          relCanvas!.style.width = getComputedStyle(img).width;
          relCanvas!.style.height = getComputedStyle(img).height;
        });
      }
      relCanvas!.style.borderRadius = getComputedStyle(img).borderRadius;
      relCanvas!.style.padding = getComputedStyle(img).padding;
      relCanvas!.style.margin = getComputedStyle(img).margin;
    } catch (e) {
      console.error(
        `Error executing routine for adjusting canvas:\n${(e as Error).message}`
      );
    }
    img.alt = caption.innerText;
  } catch (imgErr) {
    console.warn(`IMAGE ERROR:
				figure id: ${figure?.id ?? "Unidentified"}
				OBTAINED MESSAGE:
				${(imgErr as Error).message}`);
  }
}

export function fillOptionsText(listEl: voidishHtmlEl): void {
  try {
    if (
      !(
        listEl instanceof HTMLSelectElement ||
        listEl instanceof HTMLDataListElement
      )
    )
      throw htmlElementNotFound(listEl, `Element for filling <option>s text`, [
        "<select>",
        "<datalist>",
      ]);
    listEl.querySelectorAll("option").forEach((option, i) => {
      try {
        if (!(option instanceof HTMLOptionElement))
          throw htmlElementNotFound(option, `Option Element cicle ${i}`, [
            "<option>",
          ]);
        if (option.value !== "") {
          option.innerText = normalizeReadText(
            option.value,
            i.toString(),
            `options for ${listEl.id}`
          );
        } else {
          if (option.innerText !== "") option.value = option.innerText;
        }
      } catch (eO) {
        console.error(
          `Error executing fillOptionsText for List Element ${
            listEl.id || listEl.tagName
          } option cicle ${i}:${(eO as Error).message}`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing fillOptionsText:\n${(e as Error).message}`);
  }
}

export function fillOptionsCountries(
  countryEls?: NodeList | Array<voidishHtmlEl>
): void {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Côte d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  if (!countryEls) countryEls = document.querySelectorAll('[id*="country"]');
  try {
    if (countryEls.length < 1 || countries.length < 1)
      throw ListError(
        countryEls,
        ["Array", "NodeList"],
        `Validating Elements for Country Input`
      );
    countryEls.forEach((countryEl, i) => {
      try {
        if (
          !(
            countryEl instanceof HTMLSelectElement ||
            (countryEl instanceof HTMLInputElement && countryEl.type === "text")
          )
        ) {
          if (countryEl instanceof Node && countryEl.parentNode)
            countryEl.parentNode.prepend(
              document.createComment(
                `Element invalidated by fillOptionsCountries, cicle ${i}`
              )
            );

          throw htmlElementNotFound(
            countryEl as voidishHtmlEl,
            `Element for country input`,
            ["<select>", '<input type="text">']
          );
        }
        const appendCountriesOptions = (mainListEl: listableEl) => {
          try {
            for (const country of countries)
              mainListEl.append(
                Object.assign(document.createElement("option"), {
                  id: `idOp_${country.toLowerCase()}`,
                  value: `${country.toLowerCase()}`,
                  innerText: `${country}`,
                })
              );
            const brzOp = mainListEl.querySelector("#idOp_brazil");
            if (!(brzOp instanceof HTMLOptionElement))
              throw htmlElementNotFound(brzOp, `Option for Brazil`, [
                "HTMLOptionElement",
              ]);
            brzOp.selected = true;
          } catch (e) {
            console.error(
              `Error executing appendCountriesOptions:\n${(e as Error).message}`
            );
          }
        };
        if (countryEl instanceof HTMLSelectElement)
          appendCountriesOptions(countryEl);
        else if (countryEl instanceof HTMLInputElement)
          appendCountriesOptions(
            Object.assign(document.createElement("datalist"), {
              id: `dl_${countryEl.id || countryEl.name || `brk_${i}`}`,
            })
          );
      } catch (eC) {
        console.error(
          `Error executing iteration ${i} for fillOptionsCountries:\n${
            (eC as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(
      `Error executing fillOptionsCountries:\n ${(e as Error).message}`
    );
  }
}

export function fillSection(scope: voidishHtmlEl, pattern: string) {
  try {
    if (!(scope instanceof HTMLElement))
      throw new Error(`Error validating scope argument`);
    scope.querySelectorAll("section").forEach((sect, i) => {
      try {
        if (!(sect instanceof HTMLElement && sect.tagName === "SECTION"))
          throw htmlElementNotFound(
            sect,
            `validating sect argument for fillSection`,
            ["<section>"]
          );
        if (!(typeof pattern === "string"))
          throw typeError(
            pattern,
            `validating pattern argument for fillSection`,
            ["String"]
          );
        if (
          sect.querySelector("h1") ||
          (sect.querySelector("h2") &&
            !scope.querySelector(`#h${capitalizeFirstLetter(pattern)}`))
        ) {
          sect.id = `h${capitalizeFirstLetter(pattern)}`;
          sect.querySelectorAll("hgroup").forEach((hg, i) => {
            try {
              if (!(hg instanceof HTMLElement && hg.tagName === "HGROUP"))
                throw htmlElementNotFound(
                  hg,
                  `hgroup cicle ${i} for ${sect.id || "unidentified section"}`,
                  ["<hgroup>"]
                );
              hg.classList.add(`hg${capitalizeFirstLetter(pattern)}`);
              hg.id = `hg${i}${capitalizeFirstLetter(pattern)}`;
            } catch (eHg) {
              markWithCommentary(hg, `validating of hgroup cicle`);
              console.error(`Error:${(eHg as Error).message}`);
            }
          });
          [
            ...sect.querySelectorAll("h1"),
            ...sect.querySelectorAll("h2"),
            ...sect.querySelectorAll("h3"),
          ].forEach((hd, i) => {
            try {
              if (!(hd instanceof HTMLHeadingElement))
                throw htmlElementNotFound(
                  hd,
                  `instance of heading cicle ${i} for ${
                    sect.id || "unidentified section"
                  }`,
                  ["HTMLHeadingElement"]
                );
              hd.classList.add(`hd${capitalizeFirstLetter(pattern)}`);
              hd.id = `hd${i}${capitalizeFirstLetter(pattern)}`;
              hd.querySelectorAll("*").forEach((textEl, i) => {
                try {
                  if (!(textEl instanceof HTMLElement))
                    throw htmlElementNotFound(
                      textEl,
                      `Text Element cicle ${i} nested in ${
                        hd.id || "undefined heading"
                      }`,
                      ["HTMLElement"]
                    );
                  textEl.classList.add(`textEl${pattern}`);
                  textEl.id = `textEl-${hd.id || "nullHd"}-${pattern}`;
                } catch (eT) {
                  markWithCommentary(
                    textEl,
                    `validating of text element nested in heading`
                  );
                  console.error(
                    `Error executing cicle ${i} for ${
                      hd.id || "undefined heading"
                    }:\n${(eT as Error).message}`
                  );
                }
              });
            } catch (eH) {
              markWithCommentary(hd, `validation of heading cicle`);
              console.error(
                `Error executing cicle ${i} for heading element in ${
                  sect.id || "undefined section"
                }:${(eH as Error).message}`
              );
            }
          });
        } else if (
          !scope.querySelector(`#b${capitalizeFirstLetter(pattern)}`)
        ) {
          sect.id = `b${capitalizeFirstLetter(pattern)}`;
        } else if (sect.closest("footer")) {
          if (scope.querySelector("footer")!.id === "")
            scope.querySelector("footer")!.id = `f${capitalizeFirstLetter(
              pattern
            )}`;
          if (sect.id === "")
            sect.id = `fSect${i}${capitalizeFirstLetter(pattern)}`;
          sect.classList.add(`fSect`, `fSect${scope.nodeName}`);
          sect.querySelectorAll("nav").forEach((nav, i) => {
            if (nav.id === "")
              nav.id = `navFooter${i}${capitalizeFirstLetter(pattern)}`;
            nav.classList.add(
              `navFooter`,
              `navFooter${capitalizeFirstLetter(pattern)}`
            );
          });
          sect.querySelectorAll("a").forEach((anchor, i) => {
            if (anchor.id === "")
              anchor.id = `aFooter${i}${capitalizeFirstLetter(pattern)}`;
            anchor.classList.add(
              `aFooter`,
              `aFooter${capitalizeFirstLetter(pattern)}`
            );
          });
          [
            ...sect.querySelectorAll("p"),
            ...sect.querySelectorAll("h1"),
            ...sect.querySelectorAll("h2"),
            ...sect.querySelectorAll("h3"),
            ...sect.querySelectorAll("h4"),
            ...sect.querySelectorAll("h5"),
            ...sect.querySelectorAll("h6"),
          ].forEach((headerEl, i) => {
            const formatTag = `${headerEl.tagName
              .slice(0, 1)
              .toUpperCase()}${headerEl.tagName.slice(1).toLowerCase()}`;
            if (headerEl.id === "")
              headerEl.id = `${formatTag}Footer${i}${capitalizeFirstLetter(
                pattern
              )}`;
            headerEl.classList.add(
              `headerEl`,
              `headerElFooter`,
              `headerElFooter${capitalizeFirstLetter(pattern)}`
            );
            [
              ...headerEl.querySelectorAll("span"),
              ...headerEl.querySelectorAll("strong"),
              ...headerEl.querySelectorAll("em"),
            ].forEach((textEl, i) => {
              const formatTagText = `${headerEl.tagName
                .slice(0, 1)
                .toUpperCase()}${headerEl.tagName.slice(1).toLowerCase()}`;
              if (textEl.id === "")
                textEl.id = `${formatTagText}Nest${
                  headerEl.id
                }Footer${i}${capitalizeFirstLetter(pattern)}`;
              textEl.classList.add(
                `textEl`,
                `textElFooter`,
                `textElFooter${capitalizeFirstLetter(pattern)}`,
                `textElFooterNest${formatTag}${capitalizeFirstLetter(pattern)}`,
                `textElFooterNest${headerEl.id}${capitalizeFirstLetter(
                  pattern
                )}`
              );
            });
          });
          [
            ...sect.querySelectorAll("ul"),
            ...sect.querySelectorAll("ol"),
            ...sect.querySelectorAll("dl"),
            ...sect.querySelectorAll("datalist"),
          ].forEach((list, i) => {
            const formatTag = `${list.tagName
              .slice(0, 1)
              .toUpperCase()}${list.tagName.slice(1).toLowerCase()}`;
            if (list.id === "")
              list.id = `${formatTag}Footer${i}${capitalizeFirstLetter(
                pattern
              )}`;
            list.classList.add(
              `listEl`,
              `listElFooter`,
              `listElFooter${capitalizeFirstLetter(pattern)}`
            );
            list.querySelectorAll("li").forEach((item, i) => {
              if (item.id === "")
                item.id = `li${capitalizeFirstLetter(
                  formatTag
                )}Footer${i}${capitalizeFirstLetter(pattern)}`;
              item.classList.add(
                `itemListElFooter`,
                `itemListElFooter${capitalizeFirstLetter(pattern)}`,
                `itemListElFooter${capitalizeFirstLetter(list.id)}`
              );
              try {
                const itemSvg = item.querySelector("svg");
                if (itemSvg) {
                  if (itemSvg.id === "") itemSvg.id = `${item.id}Svg`;
                  itemSvg.classList.add(
                    `footerSvg`,
                    `${formatTag}Svg`,
                    `${sect.id}Svg`
                  );
                }
              } catch (e) {
                console.error(
                  `Error executing routine for adding identifiers to svg in ${
                    item.id
                  }:\n${(e as Error).message}`
                );
              }
            });
          });
        } else if (
          sect.closest("header") &&
          !scope.querySelector(
            `[id*="header${capitalizeFirstLetter(pattern)}"]`
          )
        ) {
          [
            ...scope.querySelector("header")!.querySelectorAll("section"),
            ...Array.from(scope.querySelector("header")!.children).filter(
              child => child instanceof HTMLDivElement
            ),
          ].forEach((section, i) => {
            try {
              if (
                !(
                  section instanceof HTMLElement &&
                  section.tagName === "SECTION"
                )
              )
                throw htmlElementNotFound(
                  section,
                  `validation of Header section`,
                  ["<select>"]
                );
              if (section.id === "")
                section.id = `header${i}${capitalizeFirstLetter(pattern)}`;
              sect.classList.add(`headerSect`, `headerSect${scope.nodeName}`);
              sect.querySelectorAll("nav").forEach((nav, i) => {
                if (nav.id === "")
                  nav.id = `navHeader${i}${capitalizeFirstLetter(pattern)}`;
                nav.classList.add(
                  `navHeader`,
                  `navHeader${capitalizeFirstLetter(pattern)}`
                );
              });
              sect.querySelectorAll("a").forEach((anchor, i) => {
                if (anchor.id === "")
                  anchor.id = `aHeader${i}${capitalizeFirstLetter(pattern)}`;
                anchor.classList.add(
                  `aHeader`,
                  `aHeader${capitalizeFirstLetter(pattern)}`
                );
              });
              [
                ...sect.querySelectorAll("p"),
                ...sect.querySelectorAll("h1"),
                ...sect.querySelectorAll("h2"),
                ...sect.querySelectorAll("h3"),
                ...sect.querySelectorAll("h4"),
                ...sect.querySelectorAll("h5"),
                ...sect.querySelectorAll("h6"),
              ].forEach((headerEl, i) => {
                const formatTag = `${headerEl.tagName
                  .slice(0, 1)
                  .toLowerCase()}${headerEl.tagName.slice(1).toUpperCase()}`;
                if (headerEl.id === "")
                  headerEl.id = `${formatTag}Header${i}${capitalizeFirstLetter}`;
                headerEl.classList.add(
                  `headerEl`,
                  `headerElHeader`,
                  `headerElHeader${capitalizeFirstLetter(pattern)}`
                );
                [
                  ...headerEl.querySelectorAll("span"),
                  ...headerEl.querySelectorAll("strong"),
                  ...headerEl.querySelectorAll("em"),
                ].forEach((textEl, i) => {
                  const formatTagText = `${headerEl.tagName
                    .slice(0, 1)
                    .toLowerCase()}${headerEl.tagName.slice(1).toUpperCase()}`;
                  if (textEl.id === "")
                    textEl.id = `${formatTagText}Nest${headerEl.id}Header${i}${capitalizeFirstLetter}`;
                  textEl.classList.add(
                    `textEl`,
                    `textElHeader`,
                    `textElHeader${capitalizeFirstLetter(pattern)}`,
                    `textElHeaderNest${formatTag}${capitalizeFirstLetter(
                      pattern
                    )}`,
                    `textElHeaderNest${headerEl.id}${capitalizeFirstLetter(
                      pattern
                    )}`
                  );
                });
              });
            } catch (eS) {
              markWithCommentary(section, `validation of section`);
              console.error(
                `Error executing cicle for Header section iteration ${i}:\n${
                  (eS as Error).message
                }`
              );
            }
          });
        } else {
          sect.id = `sect${i}${capitalizeFirstLetter(pattern)}`;
        }
      } catch (e) {
        markWithCommentary(sect, `execution of fillSection`);
        console.error(
          `Error executing fillSection for sect cicle ${i}:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (eS) {
    markWithCommentary(scope, `scope argument in fillSection`);
    console.error(`Error executing fillSection:${(eS as Error).message}`);
  }
}

export function formatForSelectors(
  scope: nullishHTMLEl | Document = document
): void {
  try {
    scope = checkScope(scope, `validation of scope for formatForSelectors`);
    Array.from(scope.querySelectorAll("*"))
      .filter(element => element instanceof Element)
      .forEach(element => {
        const arrAttrs: Array<(Element | string)[]> = [];
        element instanceof HTMLElement
          ? arrAttrs.push([element, element.id, ...element.classList])
          : arrAttrs.push([element, element.id]);
        try {
          for (let g = 0; g < arrAttrs.length; g++) {
            const element = arrAttrs[g].find(
              conjEl => conjEl instanceof Element
            ) as Element;
            const attrs = arrAttrs[g].filter(
              conjEl => typeof conjEl === "string"
            ) as string[];
            for (let attr of attrs) {
              if (
                attr.startsWith("-") ||
                attr.startsWith("#") ||
                attr.startsWith(".") ||
                /^[0-9]/g.test(attr)
              ) {
                const fixedAttr = `_${attr.slice(1)}`;
                if (attr === element.id) element.id = fixedAttr;
                else if (element instanceof HTMLElement) {
                  const matchedClass = Array.from(element.classList).find(
                    classN => classN === attr
                  );
                  matchedClass
                    ? element.classList.remove(matchedClass)
                    : element.classList.remove(attr);
                  element.classList.add(fixedAttr);
                }
              }
            }
          }
        } catch (eA) {
          console.error(
            `Error executing iteration of Elements in formatForSelectors:${
              (eA as Error).message
            }`
          );
        }
      });
  } catch (e) {
    console.error(`Error executing formatForSelectors:${(e as Error).message}`);
  }
}

export function formatRootIdf(el: voidishHtmlEl, sufix?: string) {
  try {
    if (!(el instanceof Element))
      throw elementNotFound(el, `Element for formatRootIdf`, ["Element"]);
    let formatIdf =
      el.id ||
      el.classList.toString().replaceAll(" ", "_").replaceAll(",", "-");
    if (sufix && (!formatIdf || formatIdf === "")) {
      formatIdf = `noId_${sufix}_${
        el!.parentElement!.id || el!.parentElement!.tagName
      }`;
    }
    return formatIdf;
  } catch (e) {
    console.error(`Error executing formatRootIdf:${(e as Error).message}`);
  }
}

export function formatForBst(
  scope: voidishHtmlEl | Document = document,
  labPattern?: RegExp | string,
  Component?: Function
) {
  try {
    let identifier = "";
    scope = checkScope(
      scope,
      `validation of scope for formatForBst for ${
        Component?.prototype.constructor.name || "undefined component"
      }`
    );
    if (scope instanceof HTMLElement) identifier = scope.id;
    if (identifier === "" && scope instanceof HTMLFormElement)
      identifier = scope.name;
    if (scope instanceof Document) {
      console.warn(
        `formatForBst() defaulted scope to Document. Be sure that this is intended.`
      );
      identifier = "documentElement";
    }
    scope.querySelectorAll("input").forEach((inp, i) => {
      try {
        if (!(inp instanceof HTMLInputElement))
          throw htmlElementNotFound(
            inp,
            `Input cicle ${i} for ${identifier || "Unidentified scope"}`,
            ["HTMLInputElement"]
          );
        inp.classList.add("form-control");
      } catch (eI) {
        console.error(`Error classifying inputs :${(eI as Error).message}`);
      }
    });
    scope.querySelectorAll("select").forEach((sel, i) => {
      try {
        if (!(sel instanceof HTMLSelectElement))
          throw htmlElementNotFound(
            sel,
            `Select cicle ${i} for ${identifier || "Unidentified scope"}`,
            ["HTMLSelectElement"]
          );
        sel.classList.add("form-control");
      } catch (eS) {
        console.error(`Error classifying inputs :${(eS as Error).message}`);
      }
    });
    scope.querySelectorAll("button").forEach((btn, i) => {
      try {
        if (!(btn instanceof HTMLButtonElement))
          throw htmlElementNotFound(btn, `Btn cicle ${i} for ${identifier}`, [
            "HTMLButtonElement",
          ]);
        btn.classList.add("btn");
      } catch (eB) {
        console.error(`Erro classifying buttons:\n${(eB as Error).message}`);
      }
    });
    scope.querySelectorAll(".carousel").forEach((carousel, i) => {
      try {
        if (!(carousel instanceof HTMLElement))
          throw htmlElementNotFound(
            carousel,
            `validation of Carousel iteration ${i} in ${
              scope?.nodeName || "unidentified scope"
            }`,
            ["HTMLElement"]
          );
        if (!carousel.parentElement!.classList.contains("container"))
          carousel.parentElement!.classList.add(`container`);
        if (!carousel.classList.contains("slide"))
          carousel.classList.add("slide");
        carousel.setAttribute("data-bs-ride", "true");
        Array.from(carousel.children)
          .filter(child => child instanceof HTMLButtonElement)
          .forEach((btnChild, i) => {
            if (i === 0 || i % 2 === 0) {
              btnChild.classList.add("carousel-control-prev");
              if (btnChild.firstElementChild)
                btnChild.firstElementChild.classList.add(
                  `carousel-control-prev-icon`
                );
            } else {
              btnChild.classList.add("carousel-control-next");
              if (btnChild.firstElementChild)
                btnChild.firstElementChild.classList.add(
                  `carousel-control-next-icon`
                );
            }
          });
        Array.from(carousel.children)
          .filter(child => !(child instanceof HTMLButtonElement))
          .forEach((nonBtnChild, j) => {
            if (nonBtnChild.id === "")
              nonBtnChild.id = `nonBtnChild${j}Nest${
                capitalizeFirstLetter(carousel.id) || `Carousel${i}`
              }`;
            if (
              !nonBtnChild.classList.contains("carousel-indicators") &&
              !nonBtnChild.querySelector("dots")
            )
              nonBtnChild.classList.add("carousel-inner");
            if (nonBtnChild.children.length > 0) {
              nonBtnChild.firstElementChild!.classList.add("active");
              Array.from(nonBtnChild.firstElementChild!.querySelectorAll("*"))
                .filter(el => el instanceof HTMLElement)
                .forEach((el, k) => {
                  if (
                    el.querySelector("p") ||
                    el.querySelector("h1") ||
                    el.querySelector("h2") ||
                    el.querySelector("h3") ||
                    el.querySelector("h4") ||
                    el.querySelector("h5") ||
                    el.querySelector("h6")
                  ) {
                    if (el.id === "")
                      el.id = `carouselCaption${k}Nest${
                        capitalizeFirstLetter(nonBtnChild.id) || "Unidentified"
                      }`;
                    el.classList.add("carousel-caption");
                  }
                  [
                    ...el.querySelectorAll("p"),
                    ...el.querySelectorAll("h1"),
                    ...el.querySelectorAll("h2"),
                    ...el.querySelectorAll("h3"),
                    ...el.querySelectorAll("h4"),
                    ...el.querySelectorAll("h5"),
                    ...el.querySelectorAll("h6"),
                  ].forEach((hd, l) => {
                    if (hd.id === "")
                      hd.id = `carouselHeading${l}Nest${
                        capitalizeFirstLetter(el.id) || "Unidentified"
                      }`;
                    hd.classList.add(
                      "carousel-heading",
                      `carousel-heading-${el.id || "unidentified"}`
                    );
                  });
                });
              for (let cc = 0; cc < nonBtnChild.children.length; cc++) {
                if (nonBtnChild.children[cc].id === "")
                  nonBtnChild.children[cc].id = `nonBtnChild${cc}Nest${
                    capitalizeFirstLetter(nonBtnChild.id) || `NonBtnChild${j}`
                  }`;
                nonBtnChild.children[cc].classList.add("carousel-item");
                nonBtnChild.children[cc].setAttribute(
                  "data-bs-interval",
                  "10000"
                );
              }
            } else
              console.warn(
                `No child found for Non Button child id ${
                  nonBtnChild.id || "unidentified"
                }`
              );
          });
        carousel.querySelectorAll("button").forEach((btn, j) => {
          btn.setAttribute(
            `data-bs-target`,
            `#${carousel.id || `unidentified${j}`}`
          );
          if (
            btn.dataset[`bs-target`] &&
            /unidentified/gi.test(btn.dataset[`bs-target`])
          )
            console.warn(
              `Error constructing bs-target for btn ${
                btn.id || `unidentified, iteration ${j}`
              }`
            );
        });
      } catch (eC) {
        markWithCommentary(carousel, `validation of carousel instance`);
        console.error(
          `Error executing routine for carousel:\n${(eC as Error).message}`
        );
      }
    });
    if (labPattern && Component) {
      if (!(labPattern instanceof RegExp) && !(typeof labPattern === "string"))
        throw typeError(
          labPattern,
          `checking label pattern for ${identifier}`,
          ["string", "RegExp"]
        );
      scope.querySelectorAll("label").forEach((label, i) => {
        linkLabelToEntry(
          label,
          i.toString(),
          Component.prototype.constructor.name
        );
        if (
          label.nextElementSibling instanceof HTMLInputElement ||
          label.nextElementSibling instanceof HTMLSelectElement ||
          label.nextElementSibling instanceof HTMLTextAreaElement ||
          label.previousElementSibling instanceof HTMLInputElement ||
          label.previousElementSibling instanceof HTMLSelectElement ||
          label.previousElementSibling instanceof HTMLTextAreaElement ||
          label.querySelector("input") ||
          label.querySelector("select") ||
          label.querySelector("textarea")
        ) {
          label.innerText = normalizeReadText(
            label.htmlFor.replace(/inpnewuser/gi, ""),
            i.toString(),
            `innertext of label idf ${label.htmlFor}`
          );
        } else if (
          label.nextElementSibling instanceof HTMLOutputElement ||
          label.previousElementSibling instanceof HTMLOutputElement ||
          label.querySelector("output")
        ) {
          console.log("CASE OUTPUT");
          label.innerText = normalizeReadText(
            label.htmlFor.replace(/outpuser/gi, ""),
            i.toString(),
            `innertext of label idf ${label.htmlFor}`
          );
        }
      });
    }
  } catch (e) {
    console.error(`Error executing formatForBst:${(e as Error).message}`);
  }
}
