"use client";
import { useEffect } from "react";
export default function LandingWatcher(): JSX.Element {
  useEffect(() => {
    if (!document?.body) return;
    document.body.style.backgroundImage = "none";
  }, []);
  useEffect(() => {
    let acc = 0,
      timer = 500;
    const i = setInterval(() => {
      const bg = document.getElementById(`anhangaBg`);
      if (!(bg instanceof HTMLElement)) return;
      const op = getComputedStyle(bg).opacity,
        parsed = parseFloat(op);
      console.log([op, parsed]);
      if (op === "0.5" || !Number.isFinite(parsed) || parsed >= 0.5) return;
      if (acc === 0) bg.style.mixBlendMode = "luminosity";
      acc += 0.1;
      if (acc === 0.5) bg.style.mixBlendMode = "normal";
      bg.style.opacity = `${acc}`;
    }, timer);
    setTimeout(() => clearInterval(i), timer * 6);
  }, []);
  return <span className={`watcher`} style={{ display: "none" }}></span>;
}
