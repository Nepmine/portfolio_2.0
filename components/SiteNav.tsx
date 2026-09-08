"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#archive", label: "Archive" },
  { href: "#craft", label: "Craft" },
  { href: "#path", label: "Path" },
  { href: "#off", label: "Travel" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLSpanElement>(null);

  // Scroll state and the reading-progress bar share one rAF-throttled listener
  // so the nav costs a single layout read per frame rather than three.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight whichever section owns the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // The sheet is fixed over the page; leaving the body scrollable behind it
  // lets a touch drag scroll the content under an open menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="shell nav-inner">
        <a className="mark" href="#top" onClick={() => setOpen(false)}>
          <span className="mark-dot" aria-hidden="true" />
          Suraj Ghimire
        </a>

        <nav className="nav-links" aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={active === l.href ? "true" : undefined}>
              {l.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
          <i />
        </button>
      </div>

      <span className="nav-progress" ref={barRef} aria-hidden="true" />

      {open ? (
        <div className="nav-sheet glass">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </div>
      ) : null}
    </header>
  );
}
