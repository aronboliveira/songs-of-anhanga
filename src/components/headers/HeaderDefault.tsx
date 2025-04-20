"use client";
import { useRef, useEffect, useCallback } from "react";
import LogoutButton from "../buttons/LogoutButton";
import { HTMLHeader, nlHeader, rMouseEvent } from "src/lib/declarations/types";
export default function HeaderDefault({
  isLoggedIn,
}: {
  isLoggedIn?: boolean;
}): JSX.Element {
  const r = useRef<nlHeader>(null),
    sp = useRef<number>(0),
    applyTranslation = useCallback(
      (tr: string, tl: string) => {
        if (!r.current?.isConnected) return;
        if (
          !tr ||
          tr.split(/,\s+[a-z]/).every(r => /transform|matrix/g.test(r))
        )
          r.current.style.transform = tl;
        else r.current.style.transform += `, ${tl}`;
      },
      [r]
    );
  useEffect(() => {
    if (!r.current) return;
    const hd = r.current,
      tt = `tracking-translate`;
    if (hd.getAttribute(`data-${tt}`) === "true") return;
    sp.current = scrollY;
    setInterval(() => {
      try {
        r.current ??= document.querySelector("header") as HTMLHeader;
        if (!r.current?.isConnected) return;
        if (r.current.getAttribute("data-pointer-stuck") === "true") return;
        const cs = getComputedStyle(r.current),
          ht = Math.ceil(parseFloat(cs.height.replace("px", ""))),
          tr = cs.transform;
        let tl = "";
        if (Math.abs(scrollY - sp.current) >= 80) tl = `translateY(0)`;
        else tl = `translateY(-${ht}px)`;
        applyTranslation(tr, tl);
        sp.current = scrollY;
      } catch (e) {}
    }, 3000);
    hd.setAttribute(`data-${tt}`, "true");
  }, [r, applyTranslation]);
  useEffect(() => {
    const handler = (ev: rMouseEvent) => {
      try {
        r.current ??= document.querySelector("header") as HTMLHeader;
        if (!r.current?.isConnected) return;
        const ps = `pointer-stuck`;
        if (
          ev.clientY > r.current.clientHeight &&
          r.current.hasAttribute(`data-${ps}`)
        ) {
          r.current.removeAttribute(`data-${ps}`);
        } else if (ev.clientY <= r.current.clientHeight) {
          r.current.setAttribute(`data-${ps}`, "true");
          applyTranslation(
            getComputedStyle(r.current).transition,
            "translateY(0)"
          );
        }
      } catch (e) {}
    };
    document.addEventListener("pointermove", handler);
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener(`pointermove`, handler);
      document.removeEventListener("click", handler);
    };
  }, [r]);
  return (
    <header className="site-header" ref={r}>
      <nav className="main-nav">
        <div className="nav-left">
          <a href="/home" className="nav-logo">
            Folklore RPG
          </a>
          <a href="#story" className="nav-link">
            Story
          </a>
          <a href="#characters" className="nav-link">
            Characters
          </a>
          <a href="#world" className="nav-link">
            World
          </a>
        </div>
        <div className="nav-right">
          {isLoggedIn && <LogoutButton />}
          <a href="/login" className="nav-button">
            Login
          </a>
          <a href="/register" className="nav-button">
            Register
          </a>
        </div>
      </nav>
    </header>
  );
}
