"use client";
import { useEffect } from "react";
import { nullishEl } from "src/lib/declarations/types";
export default function LandingWatcher(): JSX.Element {
  useEffect(() => {
    const b = document.body;
    if (!b) return;
    const bp = "background-painting";
    if (b.getAttribute(`data-${bp}`) === "true") return;
    const tr = "background 1s ease-in-out";
    b.style.backgroundImage = "none";
    b.setAttribute(`data-${bp}`, "true");
    setTimeout(() => {
      b.style.transition = tr;
      b.style.background = "radial-gradient(at 50% 0%, white 0%, black 100%)";
      setTimeout(() => {
        requestAnimationFrame(() => {
          b.style.background =
            "radial-gradient(at 50% -200%, white 0%, black 100%)";
          b.removeAttribute(`data-${bp}`);
        });
      }, 1000);
    }, 100);
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
  return <span className={`watcher`} style={{ display: "none" }}></span>;
}
