import { numberError, stringError, typeError } from "./handlersErrors";

export function roundToTenth(
  num: number,
  multiplier: number = 1,
  fixeds: number = 2,
  up: boolean = false
): string {
  try {
    if (typeof num !== "number")
      throw typeError(num, `validation of num argument for roundToTenth`, [
        "number",
      ]);
    if (typeof multiplier !== "number")
      throw typeError(
        multiplier,
        `validation of multipler argument for roundToTenth`,
        ["number"]
      );
    if (typeof fixeds !== "number")
      throw typeError(
        fixeds,
        `validation of fixeds argument for roundToTenth`,
        ["number"]
      );
    if (typeof up !== "boolean")
      throw typeError(up, `validation of up argument for roundToTenth`, [
        "boolean",
      ]);
    const tenth = 10 ** multiplier;
    return up
      ? (Math.ceil(num * tenth) / tenth).toFixed(fixeds)
      : (Math.floor(num * tenth) / tenth).toFixed(fixeds);
  } catch (e) {
    console.error(`Error executing roundToTenth:\n${(e as Error).message}`);
    return num.toFixed(2);
  }
}

export function parseFinite(
  value: string,
  context: string = "float",
  def: number = 0
): number {
  try {
    if (typeof value !== "string")
      throw typeError(value, `reading first argument of parseFinite`, [
        "string",
      ]);
    if (typeof context !== "string")
      throw typeError(context, `reading second argument of parseFinite`, [
        "string",
      ]);
    if (context !== "int" && context !== "float")
      throw stringError(context, '"int" or "float"');
    if (typeof def !== "number")
      throw typeError(def, `reading third argument of parseFinite`, ["number"]);
    // @ts-ignore
    if (Number.isFinite) {
      if (context === "float") {
        if (!Number.isFinite(parseFloat(value))) {
          console.warn(`Error processing parseFloat. Value defaulted`);
          return def;
        } else return parseFloat(value);
      } else {
        if (!Number.isFinite(parseInt(value))) {
          console.warn(`Error processing parseInt. Value defaulted`);
          return def;
        } else return parseInt(value);
      }
    } else {
      console.warn(
        `The current browser does not support ES6. Please update your current active browser. That might result in misleading numbers.`
      );
      if (context === "float") {
        if (isNaN(parseFloat(value)) || parseFloat(value) === Infinity) {
          console.warn(`Error processing parseFloat. Value defaulted`);
          return def;
        } else return parseFloat(value);
      } else {
        if (isNaN(parseInt(value)) || parseInt(value) === Infinity) {
          console.warn(`Error processing parseInt. Value defaulted`);
          return def;
        } else return parseInt(value);
      }
    }
  } catch (err) {
    console.error(`Error executing parseFinite():
    ${(err as Error).message}`);
    return -1;
  }
}

export function convertPercToDec(value: string): string {
  try {
    if (typeof value !== "string")
      throw typeError(
        value,
        `validation of value argument in converPercToDec`,
        ["string"]
      );
    if (/%/g.test(value))
      value = `${parseFinite(value.replace("%", "")) * 0.01}`;
    return value;
  } catch (e) {
    console.error(`Error executing convertPercToDec:\n${(e as Error).message}`);
    return value;
  }
}

export function convertToHex(color: string): string {
  try {
    if (!(typeof color === "string"))
      throw typeError(color, `validation of color argument for convertToHex`, [
        "string",
      ]);
    color = color.trim().toLowerCase();
    if (color.startsWith("#")) return color;
    if (!/[0-9]/g.test(color)) {
      console.warn(
        `${color} is an invalid value for convertToHex due to the absence of numbers. Returning color without effects.`
      );
      return color;
    }
    if (/^rgb/.test(color) || /^hsl/.test(color) || /^hwb/.test(color))
      color = color.replace("(", " ").replace(")", "").replace(",", "");
    else throw stringError(color, "/^rgb/, /^hsl/ or /hwb/");
    const generateLettersArray = (currColor: string): number[] => {
      return currColor
        .split(" ")
        .map(letter => convertPercToDec(letter))
        .map(letter => parseFinite(letter));
    };
    if (/^rgb/.test(color)) {
      if (/^rgba/.test(color) || /\//g.test(color)) {
        if (/\//g.test(color)) {
          color = color.replace(/\s?\/\s?/, "");
        }
        color = color.replace(/^rgba\s?/, "");
        const [r, g, b, a] = generateLettersArray(color);
        return rgbaToHex(r, g, b, a);
      } else {
        color = color.replace(/^rgb\s?/, "");
        const [r, g, b] = generateLettersArray(color);
        return rgbToHex(r, g, b);
      }
    } else if (/^hsl/.test(color)) {
      if (/^hsla/.test(color) || /\//g.test(color)) {
        color = color.replace(/^hsla\s?/, "");
        const [h, s, l, a] = generateLettersArray(color);
        return hslaToHex(h, s, l, a);
      } else {
        color = color.replace(/^hsl\s?/, "");
        const [h, s, l] = generateLettersArray(color);
        return hslToHex(h, s, l);
      }
    } else if (/^hwb/.test(color)) {
      color = color.replace(/^hwb\s?/, "");
      generateLettersArray(color);
    }
    return color;
  } catch (e) {
    console.error(`Error executing convertToHex:\n${(e as Error).message}`);
    return color;
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  try {
    if (typeof r !== "number")
      throw typeError(r, `validation of typeof r argument for rgbToHex`, [
        "number",
      ]);
    if (r < 0 || r > 255)
      throw numberError(r, `validation of value of r argument for rgbToHex`);
    if (typeof g !== "number")
      throw typeError(g, `validation of typeof g argument for rgbToHex`, [
        "number",
      ]);
    if (g < 0 || g > 255)
      throw numberError(g, `validation of value of g argument for rgbToHex`);
    if (typeof b !== "number")
      throw typeError(b, `validation of typeof b argument for rgbToHex`, [
        "number",
      ]);
    if (b < 0 || b > 255)
      throw numberError(b, `validation of value of b argument for rgbToHex`);
    const normalizeToHex = (value: number): string => {
      return value.toString(16).padStart(2, "0").slice(-2);
    };
    return `#${normalizeToHex(r)}${normalizeToHex(g)}${normalizeToHex(b)}`;
  } catch (e) {
    console.error(`Error executing rgbToHex:\n${(e as Error).message}`);
    return `rgb(${r} ${g} ${b})`;
  }
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  try {
    if (typeof r !== "number")
      throw typeError(r, `validation of typeof r argument for rgbaToHex`, [
        "number",
      ]);
    if (r < 0 || r > 255)
      throw numberError(r, `validation of value of r argument for rgbaToHex`);
    if (typeof g !== "number")
      throw typeError(g, `validation of typeof g argument for rgbaToHex`, [
        "number",
      ]);
    if (g < 0 || g > 255)
      throw numberError(g, `validation of value of g argument for rgbaToHex`);
    if (typeof b !== "number")
      throw typeError(b, `validation of typeof b argument for rgbaToHex`, [
        "number",
      ]);
    if (b < 0 || b > 255)
      throw numberError(b, `validation of value of b argument for rgbaToHex`);
    if (typeof a !== "number")
      throw typeError(a, `validation of typeof a argument for rgbaToHex`, [
        "number",
      ]);
    if (a < 0 || a > 1)
      throw numberError(a, `validation of value of a argument for rgbaToHex`);
    return `${rgbToHex(r, g, b)}${Math.round(a * 255)
      .toString(16)
      .padStart(2, "0")
      .slice(-2)}`;
  } catch (e) {
    console.error(`Error executing rgbaToHex:\n${(e as Error).message}`);
    return `rgb(${r} ${g} ${b} ${a})`;
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hslToHex`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hslToHex`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hslToHex`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hslToHex`);
    if (typeof l !== "number")
      throw typeError(l, `validation of typeof l argument for hslToHex`, [
        "number",
      ]);
    if (l < 0 || l > 1)
      throw numberError(l, `validation of value of l argument for hslToHex`);
    const [r, g, b] = hslToRgb(h, s, l)
      .replace("rgb(", "")
      .replace(")", "")
      .split(" ")
      .map(letter => parseFinite(letter));
    return rgbToHex(r, g, b);
  } catch (e) {
    console.error(`Error executing hslToHex:\n${(e as Error).message}`);
    return `hsl(${h} ${s} ${l})`;
  }
}

export function hslaToHex(h: number, s: number, l: number, a: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hslaToHex`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hslaToHex`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hslaToHex`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hslaToHex`);
    if (typeof l !== "number")
      throw typeError(l, `validation of typeof l argument for hslaToHex`, [
        "number",
      ]);
    if (l < 0 || l > 1)
      throw numberError(l, `validation of value of l argument for hslaToHex`);
    if (typeof a !== "number")
      throw typeError(a, `validation of typeof a argument for hslaToHex`, [
        "number",
      ]);
    if (a < 0 || a > 1)
      throw numberError(a, `validation of value of a argument for hslaToHex`);
    const [r, g, b, a2] = hslaToRgba(h, s, l, a)
      .replace("rgba(", "")
      .replace(")", "")
      .split(" ")
      .map(letter => parseFinite(letter));
    return rgbaToHex(r, g, b, a2);
  } catch (e) {
    console.error(`Error executing hslaToHex:\n${(e as Error).message}`);
    return `hsla(${h} ${s} ${l} ${a})`;
  }
}

export function hslToRgb(h: number, s: number, l: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hslToRgb`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hslToRgb`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hslToRgb`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hslToRgb`);
    if (typeof l !== "number")
      throw typeError(l, `validation of typeof l argument for hslToRgb`, [
        "number",
      ]);
    if (l < 0 || l > 1)
      throw numberError(l, `validation of value of l argument for hslToRgb`);
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `rgb(${r} ${g} ${b})`;
  } catch (e) {
    console.error(`Error executing hslToRgb:\n${(e as Error).message}`);
    return `hsl(${h} ${s} ${l})`;
  }
}

export function hslaToRgba(h: number, s: number, l: number, a: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hslaToRgba`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hslaToRgba`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hslaToRgba`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hslaToRgba`);
    if (typeof l !== "number")
      throw typeError(l, `validation of typeof l argument for hslaToRgba`, [
        "number",
      ]);
    if (l < 0 || l > 1)
      throw numberError(l, `validation of value of l argument for hslaToRgba`);
    if (typeof a !== "number")
      throw typeError(a, `validation of typeof a argument for hslaToRgba`, [
        "number",
      ]);
    if (a < 0 || a > 1)
      throw numberError(a, `validation of value of a argument for hslaToRgba`);
    return `rgba(${hslToRgb(h, s, l)
      .replace("rgb(", "")
      .replace(")", "")}${a})`;
  } catch (e) {
    console.error(`Error executing hslaToRgba:\n${(e as Error).message}`);
    return `hsla(${h} ${s} ${l} ${a})`;
  }
}

export function hswToRgb(h: number, s: number, w: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hswToRgb`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hswToRgb`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hswToRgb`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hswToRgb`);
    if (typeof w !== "number")
      throw typeError(w, `validation of typeof w argument for hswToRgb`, [
        "number",
      ]);
    if (w < 0 || w > 0)
      throw numberError(w, `validation of value of w argument for hswToRgb`);
    const v = 1 - w;
    // const hueToRgb = (p: number, q: number, t: number): number => {
    //   if (t < 0) t += 1;
    //   if (t > 1) t -= 1;
    //   if (t < 1 / 6) return p + (q - p) * 6 * t;
    //   if (t < 1 / 2) return q;
    //   if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    //   return p;
    // };
    const q =
      v *
      (1 +
        (s * Math.cos((h * Math.PI) / 180)) /
          Math.cos(((60 - (h % 60)) * Math.PI) / 180));
    const p = 2 * v - q;
    let r, g, b;
    if (h < 60) {
      r = v;
      g = q;
      b = p;
    } else if (h < 120) {
      r = q;
      g = v;
      b = p;
    } else if (h < 180) {
      r = p;
      g = v;
      b = q;
    } else if (h < 240) {
      r = p;
      g = q;
      b = v;
    } else if (h < 300) {
      r = q;
      g = p;
      b = v;
    } else {
      r = v;
      g = p;
      b = q;
    }
    return `rgb(${Math.round((r * (1 - w) + w) * 255)} ${Math.round(
      (g * (1 - w) + w) * 255
    )} ${Math.round((b * (1 - w) + w) * 255)}`;
  } catch (e) {
    console.error(`Error executing hswToRgb:\n${(e as Error).message}`);
    return `hsw(${h} ${s} ${w})`;
  }
}

export function hswToHex(h: number, s: number, w: number): string {
  try {
    if (typeof h !== "number")
      throw typeError(h, `validation of typeof h argument for hswToHex`, [
        "number",
      ]);
    if (h < 0 || h > 360)
      throw numberError(h, `validation of value of h argument for hswToHex`);
    if (typeof s !== "number")
      throw typeError(s, `validation of typeof s argument for hswToHex`, [
        "number",
      ]);
    if (s < 0 || s > 1)
      throw numberError(s, `validation of value of s argument for hswToHex`);
    if (typeof w !== "number")
      throw typeError(w, `validation of typeof w argument for hswToHex`, [
        "number",
      ]);
    if (w < 0 || w > 0)
      throw numberError(w, `validation of value of w argument for hswToHex`);
    const [r, g, b] = hslToRgb(h, s, w)
      .replace("rgb(", "")
      .replace(")", "")
      .split(" ")
      .map(letter => parseFinite(letter));
    return rgbToHex(r, g, b);
  } catch (e) {
    console.error(`Error executing hswToHex:\n${(e as Error).message}`);
    return `hsw(${h} ${s} ${w})`;
  }
}
