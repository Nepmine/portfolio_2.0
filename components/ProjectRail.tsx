"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { archiveProjects, eraLabels, eras, type Era } from "@/lib/projects";

type Filter = "all" | Era;

/**
 * The archive: everything the featured row does not already show, on a rail
 * you can drag, scroll, or walk with the arrow keys.
 *
 * Lighting here is fixed, not pointer-driven — the highlight on a hovered card
 * comes from the upper right, the same direction as the hero's warm source and
 * every shadow on the page.
 */
export default function ProjectRail() {
  const [filter, setFilter] = useState<Filter>("all");
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const shown = archiveProjects.filter((p) => filter === "all" || p.era === filter);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 1 ? 1 : el.scrollLeft / max);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max <= 1 || el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter, measure]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  // Drag to scroll — pointer events so it works with mouse, pen and touch.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling is better
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const counts: Record<Filter, number> = {
    all: archiveProjects.length,
    mahavi: archiveProjects.filter((p) => p.era === "mahavi").length,
    bridgenext: archiveProjects.filter((p) => p.era === "bridgenext").length,
    college: archiveProjects.filter((p) => p.era === "college").length,
  };

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter projects by where they were built">
        {(["all", ...eras] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className="chip"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "Everything" : eraLabels[f]}
            <span className="count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="rail-wrap">
        <div
          className={`rail${dragging ? " dragging" : ""}`}
          ref={railRef}
          onScroll={measure}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Project cards, scroll sideways"
        >
          {shown.map((p, i) => (
            <article
              className="card glass edge-lit"
              data-card
              key={p.slug}
              // Cards enter in sequence when a filter changes. Capped so a wide
              // rail never holds the last card back by a visible amount.
              style={{ animationDelay: `${Math.min(i, 6) * 55}ms` }}
            >
              <div className="card-top">
                <div>
                  <h3>{p.title}</h3>
                  <div className="card-kind">{p.kind}</div>
                </div>
                <div className="card-era">{eraLabels[p.era]}</div>
              </div>

              <p className="card-summary">{p.summary}</p>
              <p className="card-desc">{p.description}</p>

              {p.highlights ? (
                <ul>
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}

              <div className="card-foot">
                <div className="tags">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                {p.link ? (
                  <a
                    className="card-link"
                    href={p.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Visit {p.link.label}
                    <ExternalLink />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="rail-controls">
          <button
            className="arrow"
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous projects"
          >
            <Chevron dir="left" />
          </button>
          <button
            className="arrow"
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next projects"
          >
            <Chevron dir="right" />
          </button>
          <div className="progress" aria-hidden="true">
            <i style={{ width: `${Math.max(8, progress * 100)}%` }} />
          </div>
          <span className="rail-hint">Drag, scroll or use arrow keys</span>
        </div>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLink() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 5h5v5M19 5l-8 8M18 14v4a1.8 1.8 0 0 1-1.8 1.8H6A1.8 1.8 0 0 1 4.2 18V7.8A1.8 1.8 0 0 1 6 6h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
