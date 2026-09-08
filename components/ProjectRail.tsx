"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { archiveProjects, eraBlurbs, eraLabels, eras, type Era } from "@/lib/projects";

type Filter = "all" | Era;

/**
 * The archive: everything the featured row does not already show.
 *
 * Cards are closed by default. A card carries a title, what it is, one line,
 * and its stack — the long description sits behind a toggle, because fourteen
 * paragraphs stacked side by side is a wall, not a portfolio. Everything is
 * still one click away.
 *
 * Lighting is fixed rather than pointer-driven: the highlight on a hovered card
 * comes from the upper right, same as the hero's warm source and every shadow
 * on the page.
 */
export default function ProjectRail() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
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

  const changeFilter = (f: Filter) => {
    setFilter(f);
    // An open card from the previous filter would otherwise stay expanded
    // behind the new set.
    setOpen(null);
  };

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
    // Let the arrow keys reach a focused toggle instead of stealing them.
    if ((e.target as HTMLElement).closest("button")) return;
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
            onClick={() => changeFilter(f)}
          >
            {f === "all" ? "Everything" : eraLabels[f]}
            <span className="count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Choosing an era should explain itself, not just filter silently. */}
      <p className="filter-note" aria-live="polite">
        {filter === "all"
          ? "Three eras, newest first. Every card opens."
          : eraBlurbs[filter]}
      </p>

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
          {shown.map((p, i) => {
            const isOpen = open === p.slug;
            return (
              <article
                className={`card glass edge-lit${isOpen ? " open" : ""}`}
                data-card
                key={p.slug}
                // Cards enter in sequence when a filter changes. Capped so a
                // wide rail never holds the last card back by a visible amount.
                style={{ animationDelay: `${Math.min(i, 6) * 55}ms` }}
              >
                <button
                  type="button"
                  className="card-head"
                  aria-expanded={isOpen}
                  aria-controls={`detail-${p.slug}`}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                >
                  <span className="card-head-top">
                    <span className="card-era">{eraLabels[p.era]}</span>
                    <span className="card-toggle" aria-hidden="true">
                      <Plus />
                    </span>
                  </span>
                  <span className="card-title">{p.title}</span>
                  <span className="card-kind">{p.kind}</span>
                  <span className="card-summary">{p.summary}</span>
                </button>

                <div
                  className="card-detail"
                  id={`detail-${p.slug}`}
                  // `hidden` would kill the height transition; the CSS grid
                  // collapse handles the visual, this handles the semantics.
                  aria-hidden={!isOpen}
                >
                  <div className="card-detail-inner">
                    <p className="card-desc">{p.description}</p>
                    {p.highlights ? (
                      <ul>
                        {p.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

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
                      // Hidden from the tab order while collapsed would be
                      // wrong — the link is always visible, so it stays live.
                    >
                      Visit {p.link.label}
                      <ExternalLink />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
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
          <span className="rail-hint">Drag, scroll, or use the arrow keys</span>
        </div>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14" className="plus-bar" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
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
