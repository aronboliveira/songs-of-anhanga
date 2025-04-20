"use client";
import { useEffect } from "react";
import { nullishEl } from "src/lib/declarations/types";
// @ts-ignore
import s from "../../../styles/modules/landing-page.module.scss";
export default function LandingWatcher(): JSX.Element {
  useEffect(() => {
    const b = document.body,
      ht = document.querySelector("html");
    if (!b) return;
    const bp = "background-painting";
    if (b.getAttribute(`data-${bp}`) === "true") return;
    const tr = "background 1s ease-in-out";
    b.style.backgroundImage = "none";
    setTimeout(() => {
      for (const tg of [b, ht]) {
        if (!tg?.isConnected) continue;
        tg.style.transition = tr;
        tg.style.background =
          "radial-gradient(at 50% 0%, white 0%, black 100%)";
        setTimeout(() => {
          requestAnimationFrame(() => {
            tg.style.background =
              "radial-gradient(at 50% -200%, white 0%, black 100%)";
            tg.removeAttribute(`data-${bp}`);
          });
        }, 1000);
        b.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "center",
        });
      }
    }, 100);
    b.setAttribute(`data-${bp}`, "true");
  }, []);
  useEffect(() => {
    let acc = 0,
      timer = 300;
    const b = document.body,
      bl = "background-activating";
    if (b.getAttribute(`data-${bl}`) === "true") return;
    const i = setInterval(() => {
      const bg = document.getElementById(`anhangaBg`);
      if (!(bg instanceof HTMLElement)) return;
      const op = getComputedStyle(bg).opacity,
        parsed = parseFloat(op);
      if (op === "0.5" || !Number.isFinite(parsed) || parsed >= 0.5) return;
      if (acc === 0) bg.style.mixBlendMode = "luminosity";
      acc += 0.1;
      if (acc === 0.5) bg.style.mixBlendMode = "normal";
      bg.style.opacity = `${acc}`;
    }, timer);
    setTimeout(() => {
      clearInterval(i);
      b.removeAttribute(`data-${bl}`);
    }, timer * 6);
    b.setAttribute(`data-${bl}`, "true");
  }, []);
  useEffect(() => {
    const hr = document.getElementById("anhangaBg"),
      ancs = [];
    let rel: nullishEl = null;
    if (hr) {
      rel = hr.parentElement;
      while (!(rel instanceof HTMLBodyElement)) {
        ancs.push(rel);
        rel = rel?.parentElement ?? null;
        if (!rel?.isConnected) continue;
      }
      for (const a of new Set(
        [...ancs, document.body, document.getElementById("__next"), hr].filter(
          Boolean
        )
      )) {
        if (
          !(
            a instanceof HTMLElement &&
            a.isConnected &&
            CSS.supports("scrollbar-gutter", "auto")
          )
        )
          continue;
        a.style.setProperty(`scrollbar-gutter`, "auto");
      }
    }
    document.getElementById("homeRoot"), document.getElementById("__next");
  }, []);
  useEffect(() => {
    (async () => {
      const fts = [
        {
          tgs: ["#mainQuote"],
          f: `Tangerine`,
          rules: [
            `font-family: "tangerinebold";
            src: url("/fonts/tangerine/tangerine-bold-webfont.woff2") format("woff2"),
              url("/fonts/tangerine/tangerine-bold-webfont.woff") format("woff");
            font-weight: normal;
            font-style: normal;`,
            `font-family: "tangerineregular";
            src: url("/fonts/tangerine/tangerine-regular-webfont.woff2") format("woff2"),
              url("/fonts/tangerine/tangerine-regular-webfont.woff") format("woff");
            font-weight: normal;
            font-style: normal;`,
          ],
        },
      ];
      for (const { tgs, f, rules } of fts) {
        try {
          await document.fonts.load(`1em ${f}`);
          if (!document.fonts.check(`1em ${f}`))
            throw new Error(`Check failed`);
          for (const ss of Array.from(document.styleSheets)) {
            if (
              !Array.from(ss.cssRules).some(r => /font\-face/g.test(r.cssText))
            )
              continue;
            for (const r of rules) ss.insertRule(`@font-face { ${r} }`);
          }
          for (const t of tgs) {
            const q = document.querySelector(t);
            if (!(q instanceof HTMLElement)) continue;
            q.style.fontFamily = f;
          }
        } catch (e) {
          console.error(
            `Error attempting to load fontface ${f} : ${(e as Error).name} — ${
              (e as Error).message
            }`
          );
        }
      }
    })();
  }, []);
  useEffect(() => {
    const mq = `moving-quote`,
      b = document.body;
    if (b.getAttribute(`data-${mq}`) === "true") return;
    setTimeout(() => {
      const q = document.getElementById(`mainQuote`);
      if (q) {
        q.style.opacity = "0.8";
        const tf = getComputedStyle(q).transform;
        // console.log(tf);
        q.style.transform = tf.replace(/\-[0-9]+(?:\.[0-9]+)?.*/g, "0");
      }
      b.removeAttribute(`data-${mq}`);
    }, 1000);
    b.setAttribute(`data-${mq}`, "true");
  }, []);
  useEffect(() => {
    const b = document.body,
      chkImg = "checking-image";
    if (b.getAttribute(`data-${chkImg}`) === "true") return;
    setTimeout(() => {
      try {
        const abg = document.getElementById("anhangaBg");
        if (!abg?.parentElement) return;
        if (abg.dataset.errored !== "true") return;
        const img = document.createElement("img");
        for (const attr of [
          ["id", "anhangaBg"],
          ["loading", "eager"],
          ["decoding", "async"],
          ["alt", "Deus Anhanga"],
          ["src", `${location.origin}/img/dall-e-anhanga.jpeg`],
          ["class", s.anhangaBg],
          ["data-fallback", "true"],
        ])
          img.setAttribute(attr[0], attr[1]);
        abg.parentElement.replaceChild(img, abg);
      } catch (e) {
        console.warn(`Failed to replace background image`);
      }
    }, 200);
    b.setAttribute(`data-${chkImg}`, "true");
  }, []);
  return <span className={`watcher`} style={{ display: "none" }}></span>;
}
